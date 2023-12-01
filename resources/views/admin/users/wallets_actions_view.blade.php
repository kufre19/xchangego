<a data-bs-toggle="tooltip" data-bs-placement="top" title="{{ __('Add/Subtract Balance') }}"
    data-address="{{ $row->address }}" data-symbol="{{ $row->symbol }}" class="btn btn-icon btn-success btn-sm"
    data-modal-toggle="addSubModal"
    onclick="$('#addSubModal').find('input[name=address]').val($(this).data('address'));
             $('#addSubModal').find('input[name=symbol]').val($(this).data('symbol'));
             $('#addSubModal').find('#input-symbol').text($(this).data('symbol'));">
    <i class="bi bi-cash"></i>
</a>
