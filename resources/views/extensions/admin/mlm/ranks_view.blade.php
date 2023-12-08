<div>
    {{ __('Directs Required') }}:
    <span class="text-success">{{ $row->direct_required }}</span> {{ __('Referral') }}
</div>
<div>
    {{ __('Deposits Required') }}:
    <span class="text-success">{{ $row->deposits_required }}</span>
    {{ $this->plat['membership_deposit_currency'] ?? 'USDT' }}
</div>
<div>
    BV {{ __('Required') }} :
    <span class="text-success">{{ $row->bv_required }}</span> BV
</div>
<div>
    {{ __('Withdraw Percentage') }}:
    <span class="text-success">{{ $row->margin }}</span> %
</div>
