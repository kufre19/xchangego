<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateICORequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('ico_create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            // General info
            'name' => 'required|max:80',
            'symbol' => 'required|max:10',
            'decimals' => 'required|numeric',
            'network_symbol' => 'required|max:10',
            'chain' => 'required|max:10',
            'address' => 'required',
            'image' => 'mimes:jpeg,jpg,png,svg',

            // Liquidity and supply
            'liquidity' => 'required|numeric',
            'liquidity_supply' => 'required|numeric',
            'total_supply' => 'required|numeric',

            // Lockup
            'lockup' => 'required|numeric',

            // Presale
            'presale_address' => 'required',
            'presale_supply' => 'required|numeric',
            'initial_cap' => 'required|numeric',
            'soft_price' => 'required|numeric',
            'soft_cap' => 'required|numeric',
            'soft_raised' => 'required|numeric',

            // Owner and client
            'owner_max' => 'required|numeric',
            'owner_recieved' => 'required|numeric',
            'client_min' => 'required|numeric',
            'client_max' => 'required|numeric',
            'rate' => 'required|numeric',
            'contributors' => 'required|numeric',

            // Description
            'desc' => 'required',

            // Type, stage, and status
            'type' => 'required',
            'stage' => 'required',
            'status' => 'required',

            'hard_price' => 'required_if:type,==,2',
            'hard_cap' => 'required_if:type,==,2',
            'hard_raised' => 'required_if:type,==,2',
        ];
    }

    public function messages()
    {
        return [
            // General info
            'name.required' => 'The name field is required.',
            'name.max' => 'The name may not be greater than :max characters.',
            'symbol.required' => 'The symbol field is required.',
            'symbol.max' => 'The symbol may not be greater than :max characters.',
            'decimals.required' => 'The decimals field is required.',
            'decimals.numeric' => 'The decimals field must be a number.',
            'network_symbol.required' => 'The network symbol field is required.',
            'network_symbol.max' => 'The network symbol may not be greater than :max characters.',
            'chain.required' => 'The chain field is required.',
            'chain.max' => 'The chain may not be greater than :max characters.',
            'address.required' => 'The address field is required.',
            'image.mimes' => 'The image must be a file of type: jpeg, jpg, png, svg.',

            // Liquidity and supply
            'liquidity.required' => 'The liquidity field is required.',
            'liquidity.numeric' => 'The liquidity field must be a number.',
            'liquidity_supply.required' => 'The liquidity supply field is required.',
            'liquidity_supply.numeric' => 'The liquidity supply field must be a number.',
            'total_supply.required' => 'The total supply field is required.',
            'total_supply.numeric' => 'The total supply field must be a number.',

            // Lockup
            'lockup.required' => 'The lockup field is required.',
            'lockup.numeric' => 'The lockup field must be a number.',

            // Presale
            'presale_address.required' => 'The presale address field is required.',
            'presale_supply.required' => 'The presale supply field is required.',
            'presale_supply.numeric' => 'The presale supply field must be a number.',
            'initial_cap.required' => 'The initial cap field is required.',
            'initial_cap.numeric' => 'The initial cap field must be a number.',
            'soft_price.required' => 'The soft price field is required.',
            'soft_price.numeric' => 'The soft price field must be a number.',
            'soft_cap.required' => 'The soft cap field is required.',
            'soft_cap.numeric' => 'The soft cap field must be a number.',
            'soft_raised.required' => 'The soft raised field is required.',
            'soft_raised.numeric' => 'The soft raised field must be a number.',
            'hard_price.numeric' => 'The hard price field must be a number.',
            'hard_cap.numeric' => 'The hard cap field must be a number.',
            'hard_raised.numeric' => 'The hard raised field must be a number.',

            // Owner and client
            'owner_max.required' => 'The owner max field is required.',
            'owner_max.numeric' => 'The owner max field must be a number.',
            'owner_recieved.required' => 'The owner received field is required.',
            'owner_recieved.numeric' => 'The owner received field must be a number.',
            'client_min.required' => 'The client min field is required.',
            'client_min.numeric' => 'The client min field must be a number.',
            'client_max.required' => 'The client max field is required.',
            'client_max.numeric' => 'The client max field must be a number.',
            'rate.required' => 'The rate field is required.',
            'rate.numeric' => 'The rate field must be a number.',
            'contributors.required' => 'The contributors field is required.',
            'contributors.numeric' => 'The contributors field must be a number.',

            // Description
            'desc.required' => 'The description field is required.',

            // Type, stage, and status
            'type.required' => 'The type option is required.',
            'stage.required' => 'The stage option is required.',
            'status.required' => 'The status option is required.',
        ];
    }
}
