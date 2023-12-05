@if ($row->activation_trx == null)
    <a href="{{ route('admin.eco.blockchain.addresses.activate', [$this->chain, $this->symbol, $row->id]) }}"
        class='btn btn-outline-primary btn-sm'>
        {{ __('Activate') }}
    </a>
@else
    <a href="{{ route('admin.eco.blockchain.addresses.verify', [$this->chain, $this->symbol, $row->id]) }}"
        class='btn btn-outline-success btn-sm'>
        {{ __('Check') }}
    </a>
@endif
