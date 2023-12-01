<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;

class NewsController extends Controller
{
    /**
     * Fetch the latest crypto news.
     *
     * @return array An array of news items or an error message with the status code.
     *
     * @api
     * @description Fetch the latest news in English.
     */
    public function fetch()
    {
        $client = new Client();
        $response = $client->get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');

        if ($response->getStatusCode() == 200) {
            $news = json_decode($response->getBody(), true);
            return $news["Data"];
        } else {
            return [
                'type' => 'error',
                'message' => "Fetch Error :-S", ['status_code' => $response->getStatusCode()]
            ];
        }
    }
}
