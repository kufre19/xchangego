@if ($row->status == 1)
    <button
        onclick="$('#stakeRefund').find('input[name=staking_id]').val({{ $row->id }});$('#stakeRefund').find('input[name=amount]').val('{{ $row->staked . ' ' . $row->coin->symbol . ' (' . $row->coin->network . ')' }}');"
        class="btn btn-outline-danger btn-sm" data-modal-toggle="stakeRefund">{{ __('Refund') }}</button>
@endif
