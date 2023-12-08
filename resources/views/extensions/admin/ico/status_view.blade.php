@if ($row->status == 0)
    <span class="badge bg-light-warning">{{ __('Upcoming') }}</span>
@elseif ($row->status == 1)
    @if ($row->stage == 0)
        <span class="badge bg-light-success">{{ __('Soft Cap Started') }}</span>
    @elseif($row->stage == 1)
        <span class="badge bg-light-success">{{ __('Soft Cap Ended') }}</span>
    @elseif($row->stage == 2)
        <span class="badge bg-light-success">{{ __('Hard Cap Started') }}</span>
    @endif
@elseif ($row->status == 2)
    <span class="badge bg-light-danger">{{ __('Sale Ended') }}</span>
@elseif ($row->status == 3)
    <span class="badge bg-light-secondary">{{ __('Canceled') }}</span>
@endif
