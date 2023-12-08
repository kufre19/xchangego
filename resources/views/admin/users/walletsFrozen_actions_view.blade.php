<a data-bs-toggle="tooltip" data-bs-placement="top" title="{{ __('Add/Subtract Balance') }}"
    class="btn btn-icon btn-sm btn-success" data-modal-toggle="addSubModalFrozen" data-symbol="{{ $row->symbol }}"
    onclick="$('#addSubModalFrozen').find('input[name=symbol]').val($(this).data('symbol'));
             $('#addSubModalFrozen').find('#input-symbol-frozen').text($(this).data('symbol'));">
    <i class="bi bi-cash"></i>
</a>
