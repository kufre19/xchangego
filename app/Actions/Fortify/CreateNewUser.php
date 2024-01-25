<?php

namespace App\Actions\Fortify;

use App\Models\AdminNotification;
use App\Models\MLM\MLM;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Jetstream\Jetstream;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array  $input
     * @return \App\Models\User
     */
    public function create(array $input)
    {
        $validationRules = [
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'firstname' => ['required', 'string', 'max:60'],
            'lastname' => ['required', 'string', 'max:60'],
            'username' => ['required', 'string', 'alpha_num', 'unique:users', 'min:6'],
            'password' => [
                'required',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised()
            ],
            'terms' => Jetstream::hasTermsAndPrivacyPolicyFeature() ? ['required', 'accepted'] : '',
        ];

        $plat = getPlatforms();
        if ($plat->system->phone == 1) {
            $validationRules['phone'] = ['required', 'string', 'max:255'];
        }

        $messages = [
            'email.required' => 'Email is required.',
            'email.string' => 'Email must be a string.',
            'email.email' => 'Email must be a valid email address.',
            'email.max' => 'Email must not be longer than 255 characters.',
            'email.unique' => 'Email is already in use.',

            'firstname.required' => 'First name is required.',
            'firstname.string' => 'First name must be a string.',
            'firstname.max' => 'First name must not be longer than 60 characters.',

            'lastname.required' => 'Last name is required.',
            'lastname.string' => 'Last name must be a string.',
            'lastname.max' => 'Last name must not be longer than 60 characters.',

            'username.required' => 'Username is required.',
            'username.string' => 'Username must be a string.',
            'username.alpha_num' => 'Username must be alphanumeric.',
            'username.unique' => 'Username is already in use.',
            'username.min' => 'Username must be at least 6 characters.',

            'password.required' => 'Password is required.',
            'password.min' => 'The password must be at least 8 characters long.',
            'password.letters' => 'The password must contain at least one letter.',
            'password.mixed_case' => 'The password must contain both uppercase and lowercase letters.',
            'password.numbers' => 'The password must contain at least one number.',
            'password.symbols' => 'The password must contain at least one symbol.',
            'password.uncompromised' => 'The password has been compromised and should not be used.',

            'terms.required' => 'Terms and conditions must be accepted.',
            'terms.accepted' => 'You must accept the terms and conditions.',

            'phone.required' => 'Phone number is required.',
            'phone.string' => 'Phone number must be a string.',
            'phone.max' => 'Phone number must not be longer than 255 characters.',
        ];

        Validator::make($input, $validationRules, $messages)->validateWithBag('register');


        $referBy = session()->get('reference');
        if ($referBy) {
            $referUser = User::where('username', $referBy)->first();
        } else {
            $referUser = null;
        }

        if (isset($input['phone'])) {
            $countryName = $input['country'];
            $countryPhonePrefixes = getCountryPhonePrefixes();
            if (array_key_exists($countryName, $countryPhonePrefixes)) {
                $countryCode = $countryPhonePrefixes[$countryName];
            } else {
                $countryCode = '';
            }
            $phone = $countryCode . $input['phone'];
            $country = $countryName;
        } else {
            $country = null;
            $phone = null;
        }

        if (getExt(3) == 1) {
            $plat_mlm = getPlatform('mlm');
            if ($plat_mlm->type == 'binary') {
                $newmlm = new MLM();
                $newmlm->username = $input['username'];
                $newmlm->save();

                if ($referUser != null) {
                    placeInBinary($input['username'], $referBy);
                }
            } else {
                $newmlm = new MLM();
                $newmlm->username = $input['username'];
                $newmlm->save();
            }
        }

        $user = User::create([
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
            'current_password' => $input['password'],
            'name' => $input['firstname'] . ' ' . $input['lastname'],
            'firstname' => $input['firstname'],
            'lastname' => $input['lastname'],
            'username' => $input['username'],
            'phone' => $phone ? $phone : '',
            'country' => $country ? $country : '',
            'ref_by' => $referUser ? $referUser->id : null,
            'status' => 1,
            'role_id' => 2,
        ]);

        $adminNotification = new AdminNotification();
        $adminNotification->user_id = $user->id;
        $adminNotification->title = 'New member registered';
        $adminNotification->click_url = route('admin.users.detail', $user->id);
        $adminNotification->save();

        return $user;
    }
}
