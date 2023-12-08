<a href="{{ route('admin.mailwiz.templates.edit', $row->id) }}" class="btn btn-outline-primary btn-icon btn-sm"
    data-bs-toggle="tooltip" title="Edit Template">
    <i class="bi bi-pencil-square"></i>
</a>

<button class="btn btn-outline-warning btn-icon btn-sm" data-modal-toggle="renameTemplate"
    title="{{ __('Rename Template') }}" onclick="setRenameTemplateData({{ $row->id }}, '{{ $row->name }}');">
    <i class="bi bi-pencil"></i>
</button>

<form action="{{ route('admin.mailwiz.templates.destroy', $row->id) }}" method="POST" class="inline-block">
    @csrf
    @method('DELETE')
    <button type="submit" class="btn btn-outline-danger btn-icon btn-sm" data-bs-toggle="tooltip" title="Delete">
        <i class="bi bi-trash"></i>
    </button>
</form>
