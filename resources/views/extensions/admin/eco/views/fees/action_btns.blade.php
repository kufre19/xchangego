<a href="javascript:void(0)"
    onclick="$('#withdrawFunds').find('input[name=id]').val('{{ $row->id }}'); $('#withdrawFunds').find('input[name=amount]').attr('max', '{{ $row->balance }}').attr('placeholder', '{{ __('Enter amount (Max: ') }}{{ $row->balance }})');"
    data-modal-toggle="withdrawFunds" class='btn btn-outline-primary btn-sm'>
    {{ __('Withdraw') }}
</a>
