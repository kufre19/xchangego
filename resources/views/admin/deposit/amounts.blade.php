<div>{{ __('Amount') }}: {{ getAmount($row->amount) . ' ' . __($this->gen->cur_text) }}</div>
<div>{{ __('Charge') }}: {{ getAmount($row->charge) . ' ' . __($this->gen->cur_text) }}</div>
<div>{{ __('After Charge') }}:
    {{ (getPlatform('wallet')->deposit_fees_method == 'subtracted' ? getAmount($row->amount - $row->charge) : getAmount($row->amount + $row->charge)) . __($this->gen->cur_text) }}
</div>
<div>{{ __('Rate') }}: {{ getAmount($row->rate) . ' ' . __($row->method_currency) }}</div>
<div>{{ __('Payable') }}: {{ getAmount($row->final_amo) . ' ' . __($row->method_currency) }}</div>
