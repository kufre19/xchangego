@if ($row->status == 0)
    <span class="badge bg-info">{{ __('Pending') }}</span>
@elseif ($row->status == 1 || $row->status == 2)
    @if ($row->result == 1)
        <span class="badge bg-success">+ {{ getamount($row->profit) }}</span>
    @elseif ($row->result == 2)
        <span class="badge bg-danger">- {{ getamount($row->profit) }}</span>
    @elseif ($row->result == 3)
        <span class="badge bg-warning">0</span>
    @endif
@elseif ($row->status == 3)
    <span class="badge bg-danger">{{ __('Refunded') }}</span>
@endif
