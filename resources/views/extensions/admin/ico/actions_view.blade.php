@if ($row->status == 0)
    <div class="mb-1">
        <button class="btn btn-sm btn-success" data-modal-toggle="pay"
            onclick="$('#pay').find('input[name=id]').val('{{ $row->id }}');$('#pay').find('input[name=rec_wallet]').val('{{ $row->rec_wallet }}');">
            {{ __('Pay') }}
        </button>
    </div>
    @if (getExt(10) == 1)
        @php
            $tokens = \App\Models\Eco\EcoTokens::get();
        @endphp
        @if ($tokens !== null)
            @if ($tokens->contains('symbol', $row->ico->symbol))
                <button class="mb-1 btn btn-sm btn-success" data-modal-toggle="payledger"
                    onclick="$('#payledger').find('input[name=id]').val('{{ $row->id }}');
                    $('#payledger').find('input[name=rec_wallet]').val('{{ $row->rec_wallet }}');
                    $('#payledger').find('input[name=amount]').val('{{ $row->amount }}');">
                    {{ __('Pay By Ledger') }}
                </button>
            @endif
        @endif
    @endif
@endif
