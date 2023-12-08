<a href="{{ route('admin.investment.plans.edit', $row->id) }}" class="btn btn-sm btn-outline-warning btn-icon">
    <i class="bi bi-pencil-square"></i>
</a>

<form action="{{ route('admin.investment.plans.destroy', $row->id) }}" method="POST" class="inline-block">
    @csrf
    @method('DELETE')
    <button type="submit" class="btn btn-sm btn-outline-danger btn-icon">
        <i class="bi bi-trash"></i>
    </button>
</form>
