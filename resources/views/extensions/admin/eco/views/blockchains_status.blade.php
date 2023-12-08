@if ($row->dev == 0)
    @if ($row->status == 1)
        <span class="badge bg-success">{{ __('Active') }}</span>
    @elseif($row->status == 0)
        <span class="badge bg-danger">{{ __('Disabled') }}</span>
    @endif
@elseif ($row->dev == 1)
    <span class="badge bg-secondary">{{ __('In Development') }}</span>
@else
    <span class="badge bg-warning">{{ __('Coming Soon') }}</span>
@endif
