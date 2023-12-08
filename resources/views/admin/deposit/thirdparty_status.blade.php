@if ($row->status == 0)
    <span class="badge bg-warning">{{ __('Pending') }}</span>
@elseif($row->status == 1)
    <span class="badge bg-success">{{ __('Successful') }}</span>
@elseif($row->status == 2)
    <span class="badge bg-danger">{{ __('Failed') }}</span>
@endif
