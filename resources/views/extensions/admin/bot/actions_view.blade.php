@if (!in_array($row->status, [1, 3]))
    <button onclick="$('#botSet').find('input[name=bot_id]').val({{ $row->id }});"
        class="btn btn-outline-info btn-sm" data-modal-toggle="botSet">{{ __('Adjust') }}</button>
    <button
        onclick="$('#botRefund').find('input[name=bot_id]').val({{ $row->id }});$('#botRefund').find('input[name=amount]').val('{{ $row->amount . ' ' . $row->pair }}');"
        class="btn btn-outline-danger btn-sm" data-modal-toggle="botRefund">{{ __('Refund') }}</button>
@endif
