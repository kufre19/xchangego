{{-- @can('faq_question_show')
    <a class="btn btn-sm btn-outline-primary" href="{{ route('admin.knowledge.faq-questions.show', $row->id) }}">
        {{ trans('View') }}
    </a>
@endcan --}}

@can('faq_question_edit')
    <a class="btn btn-sm btn-outline-info" href="{{ route('admin.knowledge.faq-questions.edit', $row->id) }}">
        {{ trans('Edit') }}
    </a>
@endcan

@can('faq_question_delete')
    <form action="{{ route('admin.knowledge.faq-questions.destroy', $row->id) }}" method="POST"
        onsubmit="return confirm('{{ trans('global.areYouSure') }}');" style="display: inline-block;">
        <input type="hidden" name="_method" value="DELETE">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <input type="submit" class="btn btn-sm btn-outline-danger" value="{{ trans('Delete') }}">
    </form>
@endcan
