<button data-modal-toggle="editMarket"
    onclick="
        const marketId = '{{ $row->id }}';
        const symbol = '{{ $row->symbol }}';
        const maker = '{{ $row->maker }}';
        const taker = '{{ $row->taker }}';
        const min_amount = '{{ $row->min_amount }}';
        const max_amount = '{{ $row->max_amount }}';
        $('#editMarket').find('input[name=market_id]').val(marketId);
        $('#editMarket').find('input[name=symbol]').val(symbol);
        $('#editMarket').find('input[name=maker]').val(maker);
        $('#editMarket').find('input[name=taker]').val(taker);
        $('#editMarket').find('input[name=min_amount]').val(min_amount);
        $('#editMarket').find('input[name=max_amount]').val(max_amount);
    "
    class="btn btn-outline-info btn-sm">
    <i class="bi bi-pen mr-2"></i> {{ __('Edit') }}
</button>
