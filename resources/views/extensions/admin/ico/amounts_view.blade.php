<div> {{ __('Amount') }}: <span class="fw-bold">{{ getAmount($row->amount) }}
        {{ $row->ico->symbol }}</span>
</div>
<div> {{ __('To Recieve') }}: <span class="fw-bold">{{ getAmount($row->amount - $row->recieved) }}
        {{ $row->ico->symbol }}</span>
</div>
<div> {{ __('Recieved') }}: <span class="fw-bold">
        @if ($row->status == 0)
            <span class="badge bg-warning">{{ __('Pending') }}</span>
        @else
            {{ getAmount($row->recieved) }}
            {{ $row->ico->symbol }}
        @endif
    </span>
</div>
<div> {{ __('Cost') }}: <span class="fw-bold">
        {{ getAmount($row->cost) }}
        {{ $row->network_symbol }}
</div>
