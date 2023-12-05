@if ($row->dev == 0)
    <a href="{{ route('admin.eco.blockchain.wallet.index', $row->chain) }}" class="btn btn-outline-success btn-sm">
        <i class="bi bi-wallet"></i>{{ __('Master Wallet') }}
    </a>
    @if (!in_array($row->chain, ['BTC', 'BCH', 'LTC', 'DOGE', 'BNB']))
        <a href="{{ route('admin.eco.blockchain.tokens.index', $row->chain) }}" class="btn btn-outline-primary btn-sm">
            <i class="bi bi-coin"></i>{{ __('Tokens') }}
        </a>
    @endif
    @if (!in_array($row->chain, ['KLAY']))
        <a href="{{ route('admin.eco.blockchain.mainnet.tokens.index', $row->chain) }}"
            class="btn btn-outline-warning btn-sm">
            <i class="bi bi-currency-bitcoin"></i>{{ __('Native Tokens') }}
        </a>
    @endif

    @if (in_array($row->chain, ['BTC', 'ADA', 'LTC', 'DOGE']))
        <a href="{{ route('admin.eco.blockchain.utxo.index', $row->chain) }}" class="btn btn-outline-danger btn-sm">
            UTXO
        </a>
    @else
        <a href="{{ route('admin.eco.blockchain.fees.index', $row->chain) }}" class="btn btn-outline-danger btn-sm">
            {{ __('Fees') }}
        </a>
    @endif
@elseif ($row->dev == 2)
    <a href="{{ route('admin.eco.blockchain.wallet.index', $row->chain) }}" class="btn btn-outline-primary btn-sm">
        <i class="bi bi-wallet2"></i>{{ __('Wallets') }}
    </a>
@endif
