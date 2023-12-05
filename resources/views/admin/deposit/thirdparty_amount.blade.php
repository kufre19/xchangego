<div>{{ __('Amount') }}: {{ getAmount($row->amount) . ' ' . $row->symbol }}</div>
<div>{{ __('Fee') }}: {{ getAmount($row->fee) . ' ' . $row->symbol }}</div>
<div>{{ __('After Charge') }}:
    {{ (getPlatform('wallet')->deposit_fees_method == 'subtracted' ? getAmount($row->amount - $row->fee) : getAmount($row->amount + $row->fee)) . ' ' . $row->symbol }}
</div>
