<a data-bs-toggle="tooltip" data-bs-placement="top" title="{{ __('Edit Transaction Status') }}"
    data-transaction-id="{{ $row->id }}" data-current-status="{{ $row->status }}" class="btn btn-icon btn-primary btn-sm"
    data-modal-toggle="updateStatusModal"

    onclick="openStatusModal($(this).data('transaction-id'), $(this).data('current-status'));">
    <i class="bi bi-pencil-square"></i>
</a>

