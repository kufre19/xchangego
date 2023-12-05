<div class="space-y-1">
    <div>
        @if ($row->actions == 1 || $row->address == null)
            @if (in_array($this->chain, ['TRON']))
                <a data-modal-toggle="addSmartContractAddress" href="javascript:void(0)"
                    onclick="$('#addSmartContractAddress').find('input[name=id]').val('{{ $row->id }}');"
                    class="btn btn-outline-success btn-sm">
                    {{ __('Add Token Contract') }}
                </a>
            @else
                <a href="{{ route('admin.eco.blockchain.tokens.fetch.contract', [$this->chain, $row->id]) }}"
                    class="btn btn-outline-success btn-sm">
                    {{ __('Fetch Address') }}
                </a>
            @endif
        @endif
        @if ($row->actions == 2)
            <a data-modal-toggle="tokenRegister" href="javascript:void(0)"
                onclick="$('#tokenRegister').find('input[name=id]').val('{{ $row->id }}');"
                class="btn btn-outline-success btn-sm">
                {{ __('Register') }}
            </a>
        @elseif ($row->actions == 3)
            <a href="{{ route('admin.eco.blockchain.tokens.sync', [$this->chain, $row->id]) }}"
                class="btn btn-outline-success btn-sm">
                {{ __('Sync') }}
            </a>
        @elseif ($row->actions == 4 && $this->chain == 'ETH')
            <button class="btn btn-outline-warning btn-sm"
                onclick="addTokenFunction('{{ $row->symbol }}','{{ $row->address }}','{{ $row->chain }}','{{ getImage('assets/images/cryptoCurrency/' . strtolower($row->symbol) . '.png') }}')">
                <i class="mr-1 bi bi-plus-lg"></i> {{ __('Add To Metamask') }}
            </button>
        @endif
    </div>
    @if ($row->actions == 4)
        <div class="mb-1">
            <button data-modal-toggle="editWithdraw"
                onclick="openEditWithdrawModal({{ $row->id }}, {{ $row->withdraw_min ?? 0 }}, {{ $row->withdraw_max ?? 0 }}, {{ $row->withdraw_fee ?? 0 }})"
                class="btn btn-outline-success btn-sm">
                <i class="bi bi-gear mr-2"></i> {{ __('Withdraw Settings') }}
            </button>
        </div>
        @if (!isset($row->fees_account->account_id))
            <div>
                <a data-modal-toggle="createFeesAccount"
                    onclick="$('#createFeesAccount').find('input[name=symbol]').val('{{ $row->symbol }}');"
                    class="btn btn-outline-warning btn-sm">
                    <i class="mr-1 bi bi-gear"></i> {{ __('Create Fees Account') }}
                </a>
            </div>
        @endif

        <div>
            @if (!file_exists('assets/images/cryptoCurrency/' . strtolower($row->symbol) . '.png'))
                <a data-modal-toggle="addIcon"
                    onclick="$('#addIcon').find('input[name=symbol]').val('{{ $row->symbol }}');"
                    class="btn btn-outline-info btn-sm">
                    <i class="mr-1 bi bi-upload"></i> {{ __('Add Icon') }}
                </a>
            @else
                <a data-modal-toggle="addIcon"
                    onclick="$('#addIcon').find('input[name=symbol]').val('{{ $row->symbol }}');"
                    class="btn btn-outline-info btn-sm">
                    <i class="mr-1 bi bi-upload"></i> {{ __('Edit Icon') }}
                </a>
            @endif
        </div>
        <div>
            <a href="{{ route('admin.eco.blockchain.addresses.index', [$row->chain, $row->symbol . $row->postfix]) }}"
                class="btn btn-outline-primary btn-sm">
                {{ __('Addresses') }}
            </a>
        </div>
        <div>
            <a href="{{ route('admin.eco.blockchain.withdrawal.index', [$row->chain, $row->symbol . $row->postfix]) }}"
                class="btn btn-outline-danger btn-sm">
                {{ __('Withdrawals') }}
            </a>
        </div>
    @endif
</div>
