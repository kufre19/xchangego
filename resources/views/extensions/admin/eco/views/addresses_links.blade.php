@if (in_array($row->chain, ['ETH', 'BSC', 'TRON', 'MATIC', 'KLAY', 'CELO', 'SOL']))
    @if ($row->address != null && getNativeNetwork() == 'mainnet')
        @if ($row->chain == 'ETH')
            <a target="_blank"
                href="https://etherscan.io/address/{{ $row->address }}">{{ cut_char($row->address, 15) }}</a>
        @elseif ($row->chain == 'BSC')
            <a target="_blank"
                href="https://bscscan.com/address/{{ $row->address }}">{{ cut_char($row->address, 15) }}</a>
        @elseif ($row->chain == 'TRON')
            <a target="_blank"
                href="https://tronscan.org/#/address/{{ $row->address }}">{{ cut_char($row->address, 15) }}</a>
        @elseif ($row->chain == 'MATIC')
            <a target="_blank"
                href="https://polygonscan.com/address/{{ $row->address }}">{{ cut_char($row->address, 15) }}</a>
        @elseif ($row->chain == 'KLAY')
            <a target="_blank"
                href="https://scope.klaytn.com/address/{{ $row->address }}">{{ cut_char($row->address, 15) }}</a>
        @elseif ($row->chain == 'CELO')
            <a target="_blank"
                href="https://celoscan.io/address/{{ $row->address }}">{{ cut_char($row->address, 15) }}</a>
        @elseif ($row->chain == 'SOL')
            <a target="_blank"
                href="https://solscan.io/address/{{ $row->address }}">{{ cut_char($row->address, 15) }}</a>
        @endif
    @elseif ($row->address != null && getNativeNetwork() == 'testnet' && getenv('TESTNET_TYPE') == 'ethereum-sepolia')
        <a target="_blank"
            href="https://sepolia.etherscan.io/address/{{ $row->address }}">{{ cut_char($row->address, 15) }}</a>
    @else
        {{ cut_char($row->address, 15) }}
    @endif
@elseif ($row->chain == 'BTC')
    <a target="_blank" class="underline"
        href="https://www.blockchain.com/explorer/addresses/btc/{{ $row->address }}">{{ cut_char($row->address, 15) }}</a>
@endif
