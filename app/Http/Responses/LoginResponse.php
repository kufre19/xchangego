<?php

namespace App\Http\Responses;

use App\Models\UserLogin;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{

    public function toResponse($request)
    {
        $user_id = auth()->user()->id;
        try {
            $info = getIpInfo($request);
            $ip =  $info['ip'];
            $userId = $user_id;
            $previousLogin = UserLogin::where('user_id', $userId)->orderBy('created_at', 'desc')->first();

            $exist = UserLogin::where('user_ip', $ip)->first();
            $userLogin = new UserLogin();
            if ($exist) {
                $userLogin->longitude =  $exist->longitude;
                $userLogin->latitude =  $exist->latitude;
                $userLogin->location =  $exist->location;
                $userLogin->country_code = $exist->country_code;
                $userLogin->country =  $exist->country;
            } else {
                $userLogin->longitude =  $info['long'];
                $userLogin->latitude =  $info['lat'];
                $userLogin->location =  $info['city'] . " - " . $info['country'] . " - " . $info['code'];
                $userLogin->country_code = $info['code'];
                $userLogin->country =  $info['country'];
            }

            $userAgent = osBrowser();
            $userLogin->user_id = $userId;
            $userLogin->user_ip =  $ip;

            $userLogin->browser = @$userAgent['browser'];
            $userLogin->os = @$userAgent['os_platform'];
            $userLogin->save();

            // Check if the new login data is significantly different from the previous login data
            if ($previousLogin && ($previousLogin->user_ip != $ip ||
                $previousLogin->country_code != $userLogin->country_code
            )) {
                if ($previousLogin) {
                    notify(auth()->user(), 'USER_LOGIN_NOTIFICATION', [
                        "ip_address" => $ip,
                        "location" => $userLogin->location,
                        "login_time" => $userLogin->created_at
                    ]);
                }
            }
        } catch (\Throwable $th) {
            createAdminNotification($user_id, 'Error while saving user login data: ' . $th->getMessage(), '#');
        }

        if (auth()->user()->role_id != 2) {
            return redirect()->intended(config('fortify.admin'));
        } else {
            return redirect()->intended(config('fortify.home'));
        }
    }
}
