<div>{{ __('Amount') }}: {{ getAmount($row->amount) . ' ' . __($this->gen->cur_text) }}</div>
<div>{{ __('Charge') }}: {{ getAmount($row->charge) . ' ' . __($this->gen->cur_text) }}</div>
<div>{{ __('After Charge') }}: {{ getAmount($row->after_charge) . ' ' . __($this->gen->cur_text) }}</div>
<div>{{ __('Rate') }}: {{ getAmount($row->rate) . ' ' . __($row->currency) }}</div>
<div>{{ __('Payable') }}: {{ getAmount($row->final_amount) . ' ' . __($row->currency) }}</div>
