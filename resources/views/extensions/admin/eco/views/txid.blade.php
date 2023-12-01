@php
    $chains = [
        'ETH' => 'https://etherscan.io/tx/',
        'BSC' => 'https://bscscan.com/tx/',
        'TRON' => 'https://tronscan.org/#/transaction/',
        'MATIC' => 'https://polygonscan.com/tx/',
        'KLAY' => 'https://scope.klaytn.com/tx/',
        'CELO' => 'https://celoscan.io/tx/',
        'SOL' => 'https://solscan.io/tx/',
    ];
@endphp

@if (getNativeNetwork() == 'testnet' && getenv('TESTNET_TYPE') == 'ethereum-sepolia')
    <a target="_blank" class="badge bg-dark"
        href="https://sepolia.etherscan.io/tx/{{ $row->txid }}">{{ cut_char($row->txid, 15) }}</a>
@elseif($row->wallet_admin)
    @foreach ($chains as $chain => $url)
        @if ($row->chain == $chain)
            <a target="_blank" class="badge bg-dark"
                href="{{ $url }}{{ $row->txid }}">{{ cut_char($row->txid, 15) }}</a>
        @endif
    @endforeach
@else
    <span class="badge bg-dark"> {{ cut_char($row->txid, 15) }}</span>
@endif
