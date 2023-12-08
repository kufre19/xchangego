<?php

namespace App\Http\Controllers\Providers;

use ccxt\ArgumentsRequired;
use \ccxt\bitget;

class ExtendedBitget extends bitget
{
    public function fetch_symbol_leverage(string $symbol)
    {
        /**
         * Get the leverage information for a particular symbol
         * @param {string} $symbol Unified symbol of the market to fetch leverage for
         * @return {array} Leverage information
         */
        $request = array(
            'symbol' => $symbol,
        );
        $response = $this->publicMixGetMarketSymbolLeverage($request);

        // Process the response and return the relevant data
        // Adapt the code based on the actual structure of the API response

        // For example, assuming the leverage information is returned in the 'data' field:
        $data = $this->safe_value($response, 'data', array());
        return $data;
    }

    public function withdraw_v2(string $code, $amount, $address, $tag = null, $params = array())
    {
        /**
         * make a withdrawal
         * @param {string} $code unified $currency $code
         * @param {float} $amount the $amount to withdraw
         * @param {string} $address the $address to withdraw to
         * @param {string|null} $tag
         * @param {array} $params extra parameters specific to the bitget api endpoint
         * @param {string} $params->chain the $chain to withdraw to
         * @return {array} a ~@link https://docs.ccxt.com/#/?id=transaction-structure transaction structure~
         */
        $this->check_address($address);
        $chain = $this->safe_string($params, 'chain');
        if ($chain === 'MATIC') {
            $chain = 'POLYGON';
        }
        if ($chain === null) {
            throw new ArgumentsRequired($this->id . ' withdraw() requires a $chain parameter');
        }
        $this->load_markets();
        $currency = $this->currency($code);
        $request = array(
            'coin' => $currency['code'],
            'address' => $address,
            'chain' => $chain,
            'amount' => $amount,
        );
        if ($tag !== null) {
            $request['tag'] = $tag;
        }
        $response = $this->privateSpotPostWalletWithdrawalV2(array_merge($request, $params));
        //
        //     {
        //         "code" => "00000",
        //         "msg" => "success",
        //         "data" => "888291686266343424"
        //     }
        //
        $result = array(
            'id' => $this->safe_string($response, 'data'),
            'info' => $response,
            'txid' => null,
            'timestamp' => null,
            'datetime' => null,
            'network' => null,
            'addressFrom' => null,
            'address' => null,
            'addressTo' => null,
            'amount' => null,
            'type' => 'withdrawal',
            'currency' => null,
            'status' => null,
            'updated' => null,
            'tagFrom' => null,
            'tag' => null,
            'tagTo' => null,
            'comment' => null,
            'fee' => null,
        );
        $withdrawOptions = $this->safe_value($this->options, 'withdraw', array());
        $fillResponseFromRequest = $this->safe_value($withdrawOptions, 'fillResponseFromRequest', true);
        if ($fillResponseFromRequest) {
            $result['currency'] = $code;
            $result['timestamp'] = $this->milliseconds();
            $result['datetime'] = $this->iso8601($this->milliseconds());
            $result['amount'] = $amount;
            $result['tag'] = $tag;
            $result['address'] = $address;
            $result['addressTo'] = $address;
            $result['network'] = $chain;
        }
        return $result;
    }
}
