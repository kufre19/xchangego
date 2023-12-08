@if ($order->moderation_status !== 'open')
    @if ($order->status == 'open')
        <span class="badge bg-secondary">{{ __('Open') }}</span>
    @elseif ($order->status == 'paid')
        <span class="badge bg-primary">{{ __('Paid') }}</span>
    @elseif ($order->status == 'completed')
        <span class="badge bg-success">{{ __('Completed') }}</span>
    @elseif ($order->status == 'cancelled')
        <span class="badge bg-danger">{{ __('Cancelled') }}</span>
    @endif
@else
    <span class="badge bg-warning">{{ __('Under Moderation') }}</span>
@endif
