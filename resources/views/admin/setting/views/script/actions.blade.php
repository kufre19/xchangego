<button type="button" class="btn btn-icon btn-sm btn-outline-warning" data-modal-toggle="editModal"
    title="{{ __('Edit') }}"
    onclick="$('#editModal').find('.script-title').text('{{ $row->title }}');$('#editModal').find('input[name=title]').val('{{ $row->title }}');
    $('#editModal').find('textarea[name=code]').val(`{{ htmlspecialchars_decode($row->code) }}`);
    $('#editModal').find('input[name=id]').val('{{ $row->id }}');">
    <i class="bi bi-pencil-square"></i>
</button>
