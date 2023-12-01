<?php

namespace App\Http\Controllers\Admin;

use App\Models\GeneralSetting;
use App\Http\Controllers\Controller;
use App\Models\Currencies;
use App\Models\Eco\EcoSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Gate;
use GuzzleHttp\Client;

class GeneralSettingController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('general_settings_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $general = GeneralSetting::first();
        $limits = json_decode($general->limits);
        $p2p = isset($general->p2p) ? json_decode($general->p2p) : null;
        $page_title = 'Settings';
        $notify_settings = json_decode(getNotify()->settings);
        return view('admin.setting.general_setting', compact('page_title', 'general', 'limits', 'notify_settings', 'p2p'));
    }

    public function currencies()
    {
        abort_if(Gate::denies('currencies_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = 'Currencies';
        return view('admin.setting.currencies', compact('page_title'));
    }

    public static function updateExchangeRates()
    {
        // Base currency - you can change it according to your needs
        $baseCurrency = 'USD';

        // Your API key from openexchangerates.org
        $apiKey = env('OPENEXCHANGERATES_APP_ID');

        // Fetch currencies from the database
        $currencies = Currencies::all();

        // Create a Guzzle HTTP client
        $client = new Client();

        // Fetch exchange rates from the API
        $response = $client->get('https://openexchangerates.org/api/latest.json', [
            'query' => [
                'app_id' => $apiKey,
                'base' => $baseCurrency,
            ],
        ]);

        // Decode the JSON response
        $exchangeRates = json_decode($response->getBody(), true);

        // Update the exchange rates in the database
        foreach ($currencies as $currency) {
            if (isset($exchangeRates['rates'][$currency->code])) {
                $currency->rate = $exchangeRates['rates'][$currency->code];
                $currency->save();
            }
        }

        $notify[] = ['success', 'Exchange rates updated successfully.'];
        return back()->withNotify($notify);
    }

    public function update(Request $request)
    {
        $validation_rule = [
            'exchange_fee' => ['numeric'],
            'trx_fee' => ['numeric'],
            'profit' => ['numeric'],
            'practice_balance' => ['numeric'],
            'TATUM_RETRIES' => ['numeric'],
            'TATUM_RETRY_DELAY' => ['numeric'],
        ];

        $validator = Validator::make($request->all(), $validation_rule, []);
        $validator->validate();

        $general_setting = GeneralSetting::first();
        $notification = getNotify();
        $notification->site_name = $request->sitename;
        $notification->save();

        $request->merge(['force_ssl' => isset($request->force_ssl) ? 1 : 0]);
        $request->merge(['registration' => isset($request->registration) ? 1 : 0]);
        $request->merge(['APP_DEBUG' => isset($request->APP_DEBUG) ? 'true' : 'false']);


        if ($request->has('sitename')) {
            $general_setting->sitename = $request->sitename;
            changeEnv('APP_NAME', '"' . $request->input('sitename', null) . '"');
        }
        if ($request->has('cur_text')) {
            $general_setting->cur_text = $request->cur_text;
        }
        if ($request->has('cur_sym')) {
            $general_setting->cur_sym = $request->cur_sym;
        }
        if ($request->has('force_ssl')) {
            $general_setting->force_ssl = $request->force_ssl;
        }
        if ($request->has('practice_balance')) {
            $general_setting->practice_balance = $request->practice_balance;
        }
        if ($request->has('practice_wallet')) {
            $general_setting->practice_wallet = $request->practice_wallet;
        }
        if ($request->has('registration')) {
            $general_setting->registration = $request->registration;
        }
        if ($request->has('profit')) {
            $general_setting->profit = $request->profit;
        }
        if ($request->has('exchange_fee')) {
            $general_setting->exchange_fee = $request->exchange_fee;
        }
        if ($request->has('trx_fee')) {
            $general_setting->trx_fee = $request->trx_fee;
        }
        if ($request->has('cors')) {
            $general_setting->cors = $request->cors;
        }
        if ($request->has('tinymce')) {
            $general_setting->tinymce = $request->tinymce;
        }
        if ($request->has('limits')) {
            $general_setting->limits = json_encode($request->only([
                'min_amount',
                'max_amount',
                'min_time_sec',
                'max_time_sec',
                'min_time_min',
                'max_time_min',
                'min_time_hour',
                'max_time_hour',
            ]));
        }
        if ($request->has('provider_withdraw_fee')) {
            $general_setting->provider_withdraw_fee = $request->provider_withdraw_fee;
        }

        if ($request->has('APP_DEBUG')) {
            changeEnv('APP_DEBUG', $request->input('APP_DEBUG', null));
        }

        // if ($request->has('RENDER_TOKEN')) {
        //     changeEnv('RENDER_TOKEN', $request->input('RENDER_TOKEN', null));
        // }

        if ($request->has('VUE_APP_I18N_LOCALE')) {
            changeEnv('VUE_APP_I18N_LOCALE', $request->input('VUE_APP_I18N_LOCALE', null));
        }
        if ($request->has('VUE_APP_I18N_FALLBACK_LOCALE')) {
            changeEnv('VUE_APP_I18N_FALLBACK_LOCALE', $request->input('VUE_APP_I18N_FALLBACK_LOCALE', null));
        }
        if ($request->has('VUE_APP_WALLET_CONNECT_PROJECT_ID')) {
            changeEnv('VUE_APP_WALLET_CONNECT_PROJECT_ID', $request->input('VUE_APP_WALLET_CONNECT_PROJECT_ID', null));
        }

        if (getExt(10) == 1) {
            if ($request->has('TATUM_API_URL')) {
                changeEnv('TATUM_API_URL', '"' . $request->input('TATUM_API_URL', null) . '"');
            }
            if ($request->has('TATUM_API_KEY')) {
                changeEnv('TATUM_API_KEY', '"' . $request->input('TATUM_API_KEY', null) . '"');
            }
            if ($request->has('TATUM_TESTNET_API_URL')) {
                changeEnv('TATUM_TESTNET_API_URL', '"' . $request->input('TATUM_TESTNET_API_URL', null) . '"');
            }
            $native_settings = EcoSettings::first();
            if ($request->has('NETWORK')) {
                changeEnv('NETWORK', '"' . $request->input('NETWORK', null) . '"');
                $native_settings->network = $request->input('NETWORK');
            }
            $native_settings->save();
            if ($request->has('TESTNET_TYPE')) {
                changeEnv('TESTNET_TYPE', '"' . $request->input('TESTNET_TYPE', null) . '"');
            }
            if ($request->has('TATUM_RETRIES')) {
                changeEnv('TATUM_RETRIES', '"' . $request->input('TATUM_RETRIES', null) . '"');
            }
            if ($request->has('TATUM_RETRY_DELAY')) {
                changeEnv('TATUM_RETRY_DELAY', '"' . $request->input('TATUM_RETRY_DELAY', null) . '"');
            }
        }

        if ($request->has('PUSHER_APP_ID')) {
            changeEnv('PUSHER_APP_ID', '"' . $request->input('PUSHER_APP_ID', null) . '"');
            changeEnv('BROADCAST_DRIVER', 'pusher');
        }
        if ($request->has('PUSHER_APP_KEY')) {
            changeEnv('PUSHER_APP_KEY', '"' . $request->input('PUSHER_APP_KEY', null) . '"');
        }

        if ($request->has('PUSHER_APP_SECRET')) {
            changeEnv('PUSHER_APP_SECRET', '"' . $request->input('PUSHER_APP_SECRET', null) . '"');
        }

        if ($request->has('PUSHER_APP_CLUSTER')) {
            changeEnv('PUSHER_APP_CLUSTER', '"' . $request->input('PUSHER_APP_CLUSTER', null) . '"');
        }

        if (getExt(8) == 1) {
            $general_setting->p2p = json_encode([
                'network_fee' => $request->p2p_network_fee,
                'application_wallet' => $request->p2p_application_wallet,
                'application_balance' => $request->p2p_application_balance,
            ]);
        }

        if ($request->has('OPENEXCHANGERATES_APP_ID')) {
            changeEnv('OPENEXCHANGERATES_APP_ID', '"' . $request->input('OPENEXCHANGERATES_APP_ID', null) . '"');
        }

        $general_setting->save();
        $general_setting->clearCache();
        Artisan::call('optimize:clear');
        $notify[] = ['success', 'General Setting has been updated.'];
        return back()->withNotify($notify);
    }

    public function currency_update(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'rate' => 'numeric',
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
            $cur = Currencies::where('id', $request->id)->first();
            $cur->rate = $request->rate;
            $cur->save();
            $notify[] = ['success', 'Currency Rate has been updated.'];
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

    public function logoIcon()
    {
        abort_if(Gate::denies('logo_show'), Response::HTTP_FORBIDDEN, '403 Forbidden');
        $page_title = 'Logo & Icon';
        return view('admin.setting.logo_icon', compact('page_title'));
    }

    public function logoIconUpdate(Request $request)
    {
        $request->validate([
            'logo' => 'image|mimes:jpg,jpeg,png,svg',
            'logo-dark' => 'image|mimes:jpg,jpeg,png,svg',
            'icon' => 'image|mimes:png',
            'icon-dark' => 'image|mimes:png',
            'favicon' => 'image|mimes:png',
        ]);
        $path = imagePath()['logoIcon']['path'];
        if ($request->hasFile('logo')) {
            try {
                $size = imagePath()['logoIcon']['size'];
                uploadImg($request->logo, $path, $size, null, '/logo.png');
            } catch (\Exception $exp) {
                $notify[] = ['error', $exp];
                return back()->withNotify($notify);
            }
        }
        if ($request->hasFile('logo_dark')) {
            try {
                $size = imagePath()['logoIcon']['size'];
                uploadImg($request->logo_dark, $path, $size, null, '/logo-dark.png');
            } catch (\Exception $exp) {
                $notify[] = ['error', 'Dark Logo could not be uploaded.'];
                return back()->withNotify($notify);
            }
        }
        if ($request->hasFile('icon')) {
            try {
                $size = imagePath()['icon']['size'];
                uploadImg($request->icon, $path, $size, null, '/icon.png');
            } catch (\Exception $exp) {
                $notify[] = ['error', 'Icon could not be uploaded.'];
                return back()->withNotify($notify);
            }
        }

        if ($request->hasFile('icon_dark')) {
            try {
                $size = imagePath()['icon']['size'];
                uploadImg($request->icon_dark, $path, $size, null, '/icon-dark.png');
            } catch (\Exception $exp) {
                $notify[] = ['error', 'Dark Icon could not be uploaded.'];
                return back()->withNotify($notify);
            }
        }

        if ($request->hasFile('favicon')) {
            try {
                $size = imagePath()['favicon']['size'];
                uploadImg($request->favicon, $path, $size, null, '/favicon.png');
            } catch (\Exception $exp) {
                $notify[] = ['error', 'Favicon could not be uploaded.'];
                return back()->withNotify($notify);
            }
        }

        $notify[] = ['success', 'Logo Icons has been updated.'];
        return back()->withNotify($notify);
    }

    public function currency_activate(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'id' => 'required|integer'
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
            $currency = Currencies::where('id', $request->id)->first();
            if ($currency->status != 1) {
                $active = Currencies::where('status', 1)->first();
                $active->status = 0;
                $active->save();
            }
            $currency->status = 1;
            $currency->save();
            $notify[] = ['success', $currency->name . ' has been activated'];
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

    public function create_cors()
    {
        $apiToken = env('RENDER_TOKEN');
        if (empty($apiToken)) {
            return responseJson('error', 'Please set the RENDER_TOKEN environment variable.');
        }

        $client = new Client([
            'headers' => [
                'Authorization' => 'Bearer ' . $apiToken,
                'Content-Type' => 'application/json',
            ],
        ]);

        // Get the ownerId
        try {
            $response = $client->request('GET', 'https://api.render.com/v1/owners', [
                'headers' => [
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json',
                ],
            ]);

            $responseData = json_decode($response->getBody(), true);
            if (count($responseData) > 0) {
                $ownerId = $responseData[0]['owner']['id'];
            } else {
                return 'No owners found. Please ensure you have at least one owner in your Render account.';
            }
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            return 'An error occurred while retrieving the ownerId: ' . $e->getResponse()->getBody();
        }

        $payload = [
            "autoDeploy" => "yes",
            "serviceDetails" => [
                "pullRequestPreviewsEnabled" => "no",
                "plan" => "starter",
                "region" => "oregon",
                "env" => "node",
                "envSpecificDetails" => [
                    "buildCommand" => "yarn",
                    "startCommand" => "node server.js",
                ]
            ],
            "type" => "web_service",
            "name" => "cors-anywhere-" . getTrx(),
            "ownerId" => $ownerId,
            "repo" => "https://github.com/Rob--W/cors-anywhere",
            "branch" => "master"
        ];

        try {
            $response = $client->request('POST', 'https://api.render.com/v1/services', [
                'body' => json_encode($payload),
                'headers' => [
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json',
                ],
            ]);

            $responseData = json_decode($response->getBody(), true);
            $webServiceUrl = $responseData['dashboardUrl'];

            return $webServiceUrl;
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            // Handle error scenarios
            return 'An error occurred while creating the web service: ' . $e->getResponse()->getBody();
        }
    }
}
