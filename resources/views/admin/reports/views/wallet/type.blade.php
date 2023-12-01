<span class="fw-bold fs-5">
    @if ($row->type == 1)
        {{ __('Deposit') }}
    @elseif($row->type == 2)
        {{ __('Withdraw') }}
    @elseif($row->type == 3)
        {{ __('Trading To Funding Transfer') }}
    @elseif($row->type == 4)
        {{ __('Funding To Trading Transfer') }}
    @elseif($row->type == 5)
        {{ __('Main To Trading Transfer') }}
    @elseif($row->type == 6)
        {{ __('Main To Funding Transfer') }}
    @endif
</span>
