@if ($row->status == 0)
    <span class="badge bg-info">{{ __('Pending') }}</span>
@elseif ($row->status == 1)
    <span class="badge bg-success">{{ __('Completed') }}</span>
@elseif ($row->status == 2)
    <span class="badge bg-primary">{{ __('Adjusted') }}</span>
@elseif ($row->status == 3)
    <span class="badge bg-danger">{{ __('Refunded') }}</span>
@endif
