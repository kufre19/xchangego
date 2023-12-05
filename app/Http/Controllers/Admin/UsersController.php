<?php

namespace App\Http\Controllers\Admin;

use App\Models\Deposit;
use App\Http\Controllers\Controller;
use App\Models\Binance\BinanceCurrencies;
use App\Models\CoinbaseCurrencies;
use App\Models\Kucoin\KucoinCurrencies;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Withdrawal;
use App\Models\TradeLog;
use App\Models\PracticeLog;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Throwable;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class UsersController extends Controller
{
    public $api;
    public $provider;
    public function __construct()
    {
        $thirdparty = getProvider();
        if ($thirdparty != null) {
            $exchange_class = "\\ccxt\\$thirdparty->title";
            if ($thirdparty->title == 'kucoin') {
                $this->api = new $exchange_class(array(
                    'apiKey' => $thirdparty->api,
                    'secret' => $thirdparty->secret,
                    'password' => $thirdparty->password,
                    'options' => array(
                        'versions' => array(
                            'public' => array(
                                'GET' => array(
                                    'currencies/{currency}' => 'v2',
                                ),
                            ),
                        ),
                    ),
                    //'verbose'=> true
                ));
            } else if ($thirdparty->title == 'binance' || $thirdparty->title == 'binanceus') {
                $this->api = new $exchange_class(array(
                    'apiKey' => $thirdparty->api,
                    'secret' => $thirdparty->secret,
                    'password' => $thirdparty->password,
                    'options' => array(
                        'adjustForTimeDifference' => true,
                        'recvWindow' => 30000,
                    ),
                ));
            } else {
                $this->api = new $exchange_class(array(
                    'apiKey' => $thirdparty->api,
                    'secret' => $thirdparty->secret,
                    'password' => $thirdparty->password,
                ));
            }
            $this->provider = $thirdparty->title;
        } else {
            $this->provider = 'funding';
        }
    }
    public function allUsers()
    {
        abort_if(Gate::denies('user_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = 'Manage Users';
        $type = 'all';
        return view('admin.users.list', compact('page_title', 'type'));
    }

    public function detail($id)
    {
        if (Gate::denies('user_edit')) {
            return response()->json(['error' => 'Forbidden'], Response::HTTP_FORBIDDEN);
        }
        $user = User::with('kyc_application')->findOrFail($id);
        $totalDeposit = Deposit::where('user_id', $user->id)
            ->where('status', 1)
            ->sum('amount');
        $totalWithdraw = Withdrawal::where('user_id', $user->id)
            ->where('status', 1)
            ->sum('amount');
        $totalTransaction = Transaction::where('user_id', $user->id)->count();
        $tradeLog = [
            'traded' => TradeLog::where('user_id', $user->id)->count(),
            'wining' => TradeLog::where('user_id', $user->id)
                ->where('result', 1)
                ->where('status', 1)
                ->count(),
            'losing' => TradeLog::where('user_id', $user->id)
                ->where('result', 2)
                ->where('status', 1)
                ->count(),
            'draw' => TradeLog::where('user_id', $user->id)
                ->where('result', 3)
                ->where('status', 1)
                ->count()
        ];
        $practiceLogCount = PracticeLog::where('user_id', $user->id)->count();
        $refer_by = User::where('id', $user->ref_by)->first();
        $wallets = Wallet::where('user_id', $user->id)->get();
        $wallet_type = (getProvider() != null) ? 'trading' : 'funding';
        return view('admin.users.detail', [
            'user' => $user,
            'totalDeposit' => $totalDeposit,
            'totalWithdraw' => $totalWithdraw,
            'totalTransaction' => $totalTransaction,
            'wallets' => $wallets,
            'tradeLog' => $tradeLog,
            'practiceLogCount' => $practiceLogCount,
            'refer_by' => $refer_by,
            'wallet_type' => $wallet_type
        ]);
    }

    public function wallet_create(Request $request)
    {
        $request->merge([
            'user_id' => $request->user_id,
            'symbol' => $request->symbol,
            'type' => $request->type,
        ]);

        if ($request->type === 'primary') {
            $ecoController = new \App\Http\Controllers\Extensions\Eco\WalletController();
            return $ecoController->store($request);
        } else {
            $walletController = new \App\Http\Controllers\WalletController();
            return $walletController->store($request);
        }
    }

    public function fetchWallets($id)
    {
        $user = User::find($id);

        // Get the currencies based on the provider
        if ($this->provider == 'coinbasepro') {
            $currencies = (new CoinbaseCurrencies())->getEnabled();
        } elseif ($this->provider == 'kucoin') {
            $currencies = (new KucoinCurrencies())->getEnabled();
        } elseif ($this->provider == 'binance' || $this->provider == 'binanceus') {
            $currencies = (new BinanceCurrencies())->getEnabled();
        } else {
            return response()->json([
                'error' => 'Invalid provider',
                'currencies' => [],
            ]);
        }

        // Get the wallets based on the provider
        if (Wallet::where('provider', '!=', 'local')->where('user_id', $user->id)->exists()) {
            $all_wallets = (new Wallet)->getCached($user->id);
            $wallets['trading'] = $all_wallets->where('provider', $this->provider);
            $wallets['funding'] = $all_wallets->where('provider', 'funding');
        } else {
            $wallets['trading'] = collect();
            $wallets['funding'] = collect();
        }

        // Merge wallet data into currency data
        $currenciesWithWallets = $currencies->map(function ($currency) use ($wallets) {
            foreach (['trading', 'funding'] as $walletType) {
                $currencyWallet = $wallets[$walletType]->where('symbol', $currency->symbol)->first();
                if ($currencyWallet) {
                    $currency->{$walletType . 'Wallet'} = $currencyWallet;
                }
            }
            return $currency;
        });

        $filteredCurrencies = [
            'funding' => [],
            'trading' => [],
        ];

        foreach ($currenciesWithWallets as $currency) {
            if (!isset($currency->fundingWallet)) {
                $filteredCurrencies['funding'][] = $currency->symbol;
            }

            if (!isset($currency->tradingWallet)) {
                $filteredCurrencies['trading'][] = $currency->symbol;
            }
        }

        return response()->json($filteredCurrencies);
    }

    public function fetchEcoWallets($id, \App\Http\Controllers\Extensions\Eco\WalletController $ecoController)
    {

        $response = $ecoController->index($id);

        $currencies = $response->getData()->currencies;

        // Filter out currencies that have a wallet with an id
        $filteredCurrencies = array_filter($currencies, function ($currency) {
            return !isset($currency->wallet);
        });

        // Reset array indices
        $filteredCurrencies = array_values($filteredCurrencies);

        // Extract only the symbols
        $symbols = array_map(function ($currency) {
            return $currency->symbol;
        }, $filteredCurrencies);

        return response()->json($symbols);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $rules = [
            'firstname' => 'required|max:60',
            'lastname' => 'required|max:60',
            'address' => 'max:160',
            'city' => 'max:60',
            'state' => 'max:60',
            'zip' => 'max:60',
            'country' => 'max:60',
            'phone' => 'max:60',
        ];

        if ($request->email !== $user->email) {
            $rules['email'] = 'required|email|max:160|unique:users,email,' . $user->id;
        }

        if (!empty($request->password)) {
            $rules['password'] = [
                'nullable',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised()
            ];
        }

        $request->validate($rules, [
            'firstname.required' => 'The first name field is required.',
            'firstname.max' => 'The first name may not be greater than 60 characters.',
            'lastname.required' => 'The last name field is required.',
            'lastname.max' => 'The last name may not be greater than 60 characters.',
            'email.required' => 'The email field is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.max' => 'The email may not be greater than 160 characters.',
            'email.unique' => 'The email has already been taken.',
            'address.max' => 'The address may not be greater than 160 characters.',
            'city.max' => 'The city may not be greater than 60 characters.',
            'state.max' => 'The state may not be greater than 60 characters.',
            'zip.max' => 'The ZIP code may not be greater than 60 characters.',
            'phone.max' => 'The phone number may not be greater than 60 characters.',
            'country.max' => 'The country may not be greater than 60 characters.',
            'password.min' => 'The password must be at least 8 characters long.',
            'password.letters' => 'The password must contain at least one letter.',
            'password.mixed_case' => 'The password must contain both uppercase and lowercase letters.',
            'password.numbers' => 'The password must contain at least one number.',
            'password.symbols' => 'The password must contain at least one symbol.',
            'password.uncompromised' => 'The password has been compromised and should not be used.',
        ]);



        if ($request->email != $user->email && User::whereEmail($request->email)->whereId('!=', $user->id)->count() > 0) {
            $notify[] = ['error', 'Email already exists.'];
            return back()->withNotify($notify);
        }
        if ($request->mobile != $user->mobile && User::where('mobile', $request->mobile)->whereId('!=', $user->id)->count() > 0) {
            $notify[] = ['error', 'Phone number already exists.'];
            return back()->withNotify($notify);
        }
        $request->merge(['status' => isset($request->status) ? 1 : 0]);
        $request->merge(['email_verified_at' => isset($request->email_verified_at) ? 1 : 0]);

        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        $user->address = $request->address;
        $user->city = $request->city;
        $user->state = $request->state;
        $user->zip = $request->zip;
        $user->country = $request->country;
        if ($request->phone) {
            $user->phone = $request->phone;
        }
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        $notify[] = ['success', 'User detail has been updated'];
        return back()->withNotify($notify);
    }

    public function addSubBalance(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            'amount' => 'required|numeric|gt:0'
        ]);
        if ($validate->fails()) {
            foreach (json_decode($validate->errors()) as $key => $error) {
                $notify[] = ['error', $error[0]];
            }
            return response()->json(
                [
                    'success' => true,
                    'type' => $notify[0][0],
                    'message' => $notify[0][1]
                ]
            );
        }
        try {
            $user = User::findOrFail($id);
            $amount = getAmount($request->amount);
            $wallet = Wallet::where('user_id', $user->id)->where('address', $request->address)->where('symbol', $request->symbol)->first();
            $trx = getTrx();

            if ($request->act) {

                $wallet->balance += $amount;
                $wallet->save();
                $notify[] = ['success', $request->symbol . ' ' . $amount . ' has been added to ' . $user->username . ' balance'];
                if ($user) {
                    $transaction = new Transaction();
                    $transaction->user_id = $user->id;
                    $transaction->amount = $amount;
                    $transaction->post_balance = getAmount($wallet->balance);
                    $transaction->charge = 0;
                    $transaction->trx_type = '+';
                    $transaction->details = 'Added Balance Via Admin';
                    $transaction->trx =  $trx;
                    $transaction->save();
                    $transaction->clearCache();

                    createAdminNotification($user->id, $transaction->details, '#', $amount . ' ' . $request->symbol . ' has been added by ' . auth()->user()->username . ' to ' . $user->username . ' balance');
                    try {
                        notify($user, 'ADMIN_BALANCE_ADD', [
                            'username' => $user->username,
                            'site_name' => getNotify()->site_name,
                            "amount" => $transaction->amount,
                            "currency" => $request->symbol,
                            "trx" => $transaction->trx,
                            "post_balance" => $transaction->post_balance
                        ], ['email']);
                        $notify[] = ['success', 'Client Notified By Email Successfully'];
                    } catch (Throwable $e) {
                        $notify[] = ['warning', 'Mail Not Properly Set'];
                    }
                }
            } else {
                if ($amount > $wallet->balance) {
                    $notify[] = ['error', $user->username . ' has insufficient balance.'];
                    return response()->json(
                        [
                            'success' => true,
                            'type' => $notify[0][0],
                            'message' => $notify[0][1]
                        ]
                    );
                }

                $wallet->balance -= $amount;
                $wallet->save();
                $notify[] = ['success', $request->symbol . ' ' . $amount . ' has been subtracted from ' . $user->username . ' balance'];
                if ($user) {
                    $transaction = new Transaction();
                    $transaction->user_id = $user->id;
                    $transaction->amount = $amount;
                    $transaction->post_balance = getAmount($wallet->balance);
                    $transaction->charge = 0;
                    $transaction->trx_type = '-';
                    $transaction->details = 'Subtract Balance Via Admin';
                    $transaction->trx =  $trx;
                    $transaction->save();
                    $transaction->clearCache();
                    createAdminNotification($user->id, $transaction->details, '#', $amount . ' ' . $request->symbol . ' has been subtracted by ' . auth()->user()->username . ' from ' . $user->username . ' balance');
                    try {
                        notify($user, 'ADMIN_BALANCE_SUBTRACTED', [
                            'username' => $user->username,
                            'site_name' => getNotify()->site_name,
                            "amount" => $transaction->amount,
                            "currency" => $request->symbol,
                            "trx" => $transaction->trx,
                            "post_balance" => $transaction->post_balance
                        ]);
                        $notify[] = ['success', 'Client Notified By Email Successfully'];
                    } catch (Throwable $e) {
                        $notify[] = ['warning', 'Mail Not Properly Set'];
                    }
                }
            }
        } catch (\Throwable $th) {
            return response()->json(
                [
                    'success' => true,
                    'type' => 'error',
                    'message' => $th
                ]
            );
        }

        return response()->json(
            [
                'success' => true,
                'type' => $notify[0][0],
                'message' => $notify[0][1]
            ]
        );
    }

    public function showEmailSingleForm($id)
    {
        abort_if(Gate::denies('user_mailer'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $user = User::findOrFail($id);
        $page_title = 'Send Email To: ' . $user->username;
        return view('admin.users.email_single', compact('page_title', 'user'));
    }

    public function sendEmailSingle(Request $request, $id)
    {
        abort_if(Gate::denies('user_mailer'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $request->validate([
            'message' => 'required|string|max:65000',
            'subject' => 'required|string|max:190',
        ]);

        $user = User::findOrFail($id);
        $subject = $request->subject;
        $message = $request->message;

        notify($user, 'SEND_MAIL', [
            'site_name' => getNotify()->site_name,
            'subject' => $subject,
            'message' => $message,
            'username' => $user->username
        ], ['email']);
        try {
            $notify[] = ['success', $user->username . ' will receive an email shortly.'];
        } catch (Throwable $e) {
            $notify[] = ['warning', 'Mail Not Properly Set'];
        }

        return back()->withNotify($notify);
    }

    public function showEmailAllForm()
    {
        abort_if(Gate::denies('user_mailer'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = 'Send Email To All Users';
        return view('admin.users.email_all', compact('page_title'));
    }

    public function sendEmailAll(Request $request)
    {
        abort_if(Gate::denies('user_mailer'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $request->validate([
            'message' => 'required|string|max:65000',
            'subject' => 'required|string|max:190',
        ]);

        foreach (User::where('status', 1)->cursor() as $user) {
            $subject = $request->subject;
            $message = $request->message;
            try {
                notify($user, 'SEND_MAIL', [
                    'site_name' => getNotify()->site_name,
                    'subject' => $subject,
                    'message' => $message,
                    'username' => $user->username
                ], ['email']);
            } catch (Throwable $e) {
                $notify[] = ['warning', 'Mail Not Properly Set'];
            }
        }

        $notify[] = ['success', 'All users will receive an email shortly.'];
        return back()->withNotify($notify);
    }

    // import view
    public function import()
    {
        $page_title = 'Import Users';
        return view('admin.users.import', compact('page_title'));
    }
    public function importing(Request $request)
    {
        $file = $request->file('file');
        if (auth()->user()->role_id != 1) {
            $response['status'] = 'error';
            $response['message'] = 'You do not have permission to import users';
            return $response;
        }

        $response = [];

        if ($file->getClientOriginalExtension() == 'csv') {
            $csvFile = fopen($file->getPathname(), 'r');

            // Get the CSV headers and check that they match the expected structure
            $headers = fgetcsv($csvFile);
            $expectedHeaders = ['email', 'password', 'name', 'firstname', 'lastname', 'username', 'country', 'zip', 'state', 'city', 'ref_by', 'role_id', 'phone'];

            if ($headers !== $expectedHeaders) {
                $response['status'] = 'error';
                $response['message'] = 'Invalid CSV file structure';
                return $response;
            }

            // Read the CSV data into an array and do something with it
            $rowCount = 0;
            $importedUsers = [];
            while (($row = fgetcsv($csvFile)) !== false) {
                $rowCount++;

                // Do not create a user if it already exists
                $user = User::where('email', $row[0])->orWhere('username', $row[5])->first();
                if ($user) {
                    continue;
                }

                // Create the user
                $createdUser = User::create([
                    'email' => $row[0],
                    'password' => Hash::make($row[1]),
                    'name' => $row[2],
                    'firstname' => $row[3],
                    'lastname' => $row[4],
                    'username' => $row[5],
                    'country' => $row[6],
                    'zip' => $row[7],
                    'state' => $row[8],
                    'city' => $row[9],
                    'ref_by' => $row[10],
                    'role_id' => $row[11],
                    'phone' => $row[12],
                ]);

                $importedUsers[] = [
                    'email' => $createdUser->email,
                    'name' => $createdUser->name,
                    'role' => $createdUser->role->title,
                ];
            }

            fclose($csvFile);
            $response['status'] = 'success';
            $response['message'] = 'CSV import successful';
            $response['users'] = $importedUsers;
        } else {
            $response['success'] = false;
            $response['message'] = 'Invalid file type';
        }

        return $response;
    }




    public function downloadTemplate()
    {
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename=users_template.csv',
        ];

        $templateData = [
            ['email', 'password', 'name', 'firstname', 'lastname', 'username', 'country', 'zip', 'state', 'city', 'ref_by', 'role_id', 'phone'],
        ];

        $stream = fopen('php://temp', 'r+');
        foreach ($templateData as $row) {
            fputcsv($stream, $row);
        }
        rewind($stream);

        $contents = stream_get_contents($stream);

        return response($contents, 200, $headers);
    }
}
