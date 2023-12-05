{{-- @can('tag_show')
    <a class="btn btn-sm btn-outline-primary" href="{{ route('admin.knowledge.tags.show', $row->id) }}">
        {{ trans('global.view') }}
    </a>
@endcan --}}

@can('tag_edit')
    <a class="btn btn-sm btn-outline-info" href="{{ route('admin.knowledge.tags.edit', $row->id) }}">
        {{ trans('Edit') }}
    </a>
@endcan

@can('tag_delete')
    <form action="{{ route('admin.knowledge.tags.destroy', $row->id) }}" method="POST"
        onsubmit="return confirm('{{ trans('Are You Sure') }}');" style="display: inline-block;">
        <input type="hidden" name="_method" value="DELETE">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <input type="submit" class="btn btn-sm btn-outline-danger" value="{{ trans('Delete') }}">
    </form>
@endcan
