@if ($row->moderation_status !== 'open')
    @if ($row->status == 'open')
        <span id="data" class="badge bg-secondary">{{ __('Open') }}</span>
    @elseif ($row->status == 'paid')
        <span id="data" class="badge bg-primary">{{ __('Paid') }}</span>
    @elseif ($row->status == 'completed')
        <span id="data" class="badge bg-success">{{ __('Completed') }}</span>
    @elseif ($row->status == 'cancelled')
        <span id="data" class="badge bg-danger">{{ __('Cancelled') }}</span>
    @endif
@else
    <span id="data" class="badge bg-warning">{{ __('Under Moderation') }}</span>
@endif
