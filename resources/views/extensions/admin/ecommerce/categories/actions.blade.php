@can('category_edit')
    <a class="btn btn-sm btn-outline-info" href="{{ route('admin.ecommerce.category.edit', $row->id) }}">
        {{ trans('Edit') }}
    </a>
@endcan
