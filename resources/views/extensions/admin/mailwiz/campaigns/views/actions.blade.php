<a href="{{ route('admin.mailwiz.campaigns.edit', $row->id) }}" class="btn btn-outline-warning btn-icon btn-sm"
    data-bs-toggle="tooltip" title="Edit">
    <i class="bi bi-pencil"></i>
</a>
<form action="{{ route('admin.mailwiz.campaigns.destroy', $row->id) }}" method="POST" class="inline-block">
    @csrf
    @method('DELETE')
    <button type="submit" class="btn btn-outline-danger btn-icon btn-sm" data-bs-toggle="tooltip" title="Delete">
        <i class="bi bi-trash"></i>
    </button>
</form>
