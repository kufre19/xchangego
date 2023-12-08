@extends('layouts.admin')

@section('page-style')
    <style>
    </style>
@endsection




@section('content')
    <div class="row">
        <div class="lg:col-span-7 md:col-span-6 xs:col-span-12 col-12">
            <div class="card">
                <div class="card-header">
                    <h4>{{ __('Transaction History') }}</h4>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">{{ __('Trade') }}</th>
                                <th scope="col">{{ __('Pricing') }}</th>
                                <th scope="col">{{ __('Order') }}</th>
                                <th scope="col">{{ __('Status') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($orders as $order)
                                <tr>
                                    <td data-label="{{ __('Trade') }}" class="text-uppercase">
                                        <div> {{ __('Pair') }}: <span
                                                class="fw-bold text-info">{{ $order->symbol }}</span></div>
                                        <div> {{ __('ID') }}: <span
                                                class="fw-bold text-info">{{ $order->order_id }}</span></div>
                                    </td>
                                    <td data-label="{{ __('Pricing') }}">
                                        <div> {{ __('Price') }}: <span
                                                class="fw-bold text-warning">{{ getAmount($order->price) }}
                                                {{ $order->pair }}</span></div>
                                        <div> {{ __('Amount') }}: <span
                                                class="fw-bold text-warning">{{ getAmount($order->amount) }}
                                                {{ getPair($order->symbol)[0] }}</span></div>
                                        <div> {{ __('Cost') }}: <span
                                                class="fw-bold text-warning">{{ getAmount($order->cost) }}
                                                {{ getPair($order->symbol)[1] }}</span></div>
                                        <div> {{ __('Fees') }}: <span
                                                class="fw-bold text-danger">{{ ttz($order->fee) }}
                                                {{ getPair($order->symbol)[1] }}</span></div>
                                    </td>
                                    <td data-label="{{ __('Order') }}">
                                        <div>{{ __('Type') }}:
                                            @if ($order->side == 'buy')
                                                <span class="fw-bold text-success">{{ __('Buy') }}
                                                @else
                                                    <span class="fw-bold text-danger">{{ __('Sell') }}
                                            @endif
                                            </span>
                                        </div>
                                        <div> {{ __('Filled') }}: <span
                                                class="fw-bold text-info">{{ ttz($order->filled) }}
                                                {{ getPair($order->symbol)[0] }}</span></div>
                                        <div> {{ __('Remaining') }}: <span
                                                class="fw-bold text-danger">{{ ttz($order->remaining) }}
                                                {{ getPair($order->symbol)[0] }}</span></div>
                                    </td>
                                    <td data-label="{{ __('Status') }}">
                                        @if ($order->status == 'closed')
                                            <span class="badge bg-success">{{ __('Filled') }}</span>
                                        @elseif($order->status == 'open')
                                            <span class="badge bg-primary">{{ __('Live') }}</span>
                                        @elseif($order->status == 'canceled')
                                            <span class="badge bg-danger">{{ __('Canceled') }}</span>
                                        @endif
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td class="text-muted text-center" colspan="100%">{{ __($empty_message) }}</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-0">{{ paginateLinks($orders) }}</div>
        </div>
        <div class="lg:col-span-5 md:col-span-6 xs:col-span-12 col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Swap</h4>
                </div>
                <div id="form">
                    <div class="card-body">
                        <div class="flex justify-between items-center rounded shadow darked">
                            <button class="btn btn-flat-info dropdown-toggle ml-1 w-50 flex justify-between items-center"
                                type="button" id="from_token_select">
                                <img class="token_image hidden" height="36px" width="36px" id="from_token_img">
                                <span id="from_token_text">{{ __('Select Coin') }}</span>
                            </button>
                            <div class="swapbox_select w-50 m-1">
                                <input class="number form-control" placeholder="amount" id="from_amount">
                            </div>
                        </div>
                        <div class="flex justify-between items-center my-1 rounded shadow darked">
                            <button class="btn btn-flat-info dropdown-toggle ml-1 w-50 flex justify-between items-center"
                                type="button" id="to_token_select">
                                <img class="token_image hidden" height="36px" width="36px" id="to_token_img">
                                <span id="to_token_text">{{ __('Select Coin') }}</span>
                            </button>
                            <div class="swapbox_select w-50 m-1">
                                <input class="number form-control" placeholder="calculating.." id="to_amount" disabled>
                            </div>
                        </div>
                        <div class="rounded shadow p-1 darked">{{ __('Estimated Gas') }}: <span class="text-warning"
                                id="gas_estimate"></span></div>
                    </div>
                    <div class="card-footer">
                        <button disabled class="btn btn-primary w-full" id="swap_button">
                            {{ __('Connecting') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="token_modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ __('Select token') }}</h5>
                    <button id="modal_close" type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body modal-swap" id="myDropdown">
                    <input type="text" class="form-control" placeholder="Search.." id="myInput"
                        onkeyup="filterFunction()" autocomplete="off">
                    <div id="token_list" style="max-height:600px;overflow-y:auto;"></div>
                </div>
            </div>
        </div>
    </div>
@endsection



@section('page-script')
    <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
    <script src="https://unpkg.com/moralis/dist/moralis.js"></script>
    <script>
        const serverUrl = "{{ getGen()->moralis_server_url }}";
        const appId = "{{ getGen()->moralis_app_id }}";
        let currentTrade = {};
        let currentSelectSide;
        let tokens;

        async function init() {
            await Moralis.start({
                serverUrl,
                appId
            });
            await Moralis.enableWeb3();
            await listAvailableTokens();
            currentUser = Moralis.User.current();
            if (currentUser) {
                document.getElementById("swap_button").disabled = false;
                document.getElementById("swap_button").innerText = 'Swap';
            } else {
                document.getElementById("swap_button").innerText = 'Connect Wallet First';
            }
        }
        const customTokens = {
            "0x15D57CE57AB752a069fB6Fc76fF431812fD3aDA3": {
                address: "0x15D57CE57AB752a069fB6Fc76fF431812fD3aDA3",
                decimals: 16,
                logoURI: "https://bscscan.com/token/images/newocoin_32.png",
                name: "NEWO Coin",
                symbol: "NEWO",
            },
        };
        async function listAvailableTokens() {
            const result = await Moralis.Plugins.oneInch.getSupportedTokens({
                chain: "bsc", // The blockchain you want to use (eth/bsc/polygon)
            });
            let parent = document.getElementById("token_list");

            for (const address in customTokens) {
                let token = customTokens[address];
                let div = document.createElement("div");
                div.setAttribute("data-address", address);
                div.className = "token_row";
                let html = `
        <a class="dropdown-item" ><img class="token_list_img mr-1" height="36px" width="36px" src="${token.logoURI}"  loading="lazy">
        <span class="token_list_text">${token.symbol}</span></a>
        `;
                div.innerHTML = html;
                div.onclick = () => {
                    selectToken(address);
                };
                parent.appendChild(div);
            }

            tokens = result.tokens;
            for (const address in tokens) {
                let token = tokens[address];
                if (token.symbol != 'BTC++') {
                    let div = document.createElement("div");
                    div.setAttribute("data-address", address);
                    div.className = "token_row";
                    let html = `
            <a class="dropdown-item" ><img class="token_list_img mr-1" height="36px" width="36px" src="../../assets/images/cryptoCurrency/${token.symbol}.png"  loading="lazy">
            <span class="token_list_text">${token.symbol}</span></a>
            `;
                    div.innerHTML = html;
                    div.onclick = () => {
                        selectToken(address);
                    };
                    parent.appendChild(div);
                }
            }
        }

        function filterFunction() {
            var input, filter, a, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            div = document.getElementById("myDropdown");
            a = div.getElementsByTagName("a");
            for (i = 0; i < a.length; i++) {
                txtValue = a[i].textContent || a[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    a[i].style.display = "";
                } else {
                    a[i].style.display = "none";
                }
            }
        }

        function selectToken(address) {
            closeModal();
            console.log(tokens);
            currentTrade[currentSelectSide] = tokens[address];
            console.log(currentTrade);
            renderInterface();
            getQuote();
        }

        function renderInterface() {
            if (currentTrade.from) {
                document.getElementById("from_token_img").src = currentTrade.from.logoURI;
                document.getElementById("from_token_img").classList.remove("hidden");
                document.getElementById("from_token_text").innerHTML = currentTrade.from.symbol;
            }
            if (currentTrade.to) {
                document.getElementById("to_token_img").src = currentTrade.to.logoURI;
                document.getElementById("to_token_img").classList.remove("hidden");
                document.getElementById("to_token_text").innerHTML = currentTrade.to.symbol;
            }
        }

        function openModal(side) {
            currentSelectSide = side;
            document.getElementById("token_modal").style.display = "block";
        }

        function closeModal() {
            document.getElementById("token_modal").style.display = "none";
        }

        async function getQuote() {
            if (!currentTrade.from || !currentTrade.to || !document.getElementById("from_amount").value) return;

            let amount = Number(document.getElementById("from_amount").value * 10 ** currentTrade.from.decimals);

            const quote = await Moralis.Plugins.oneInch.quote({
                chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
                fromTokenAddress: currentTrade.from.address, // The token you want to swap
                toTokenAddress: currentTrade.to.address, // The token you want to receive
                amount: amount,
            });
            console.log(quote);
            document.getElementById("gas_estimate").innerHTML = quote.estimatedGas;
            document.getElementById("to_amount").value = quote.toTokenAmount / 10 ** quote.toToken.decimals;
        }

        async function trySwap() {
            let address = Moralis.User.current().get("ethAddress");
            let amount = Number(document.getElementById("from_amount").value * 10 ** currentTrade.from.decimals);
            if (currentTrade.from.symbol !== "ETH") {
                const allowance = await Moralis.Plugins.oneInch.hasAllowance({
                    chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
                    fromTokenAddress: currentTrade.from.address, // The token you want to swap
                    fromAddress: address, // Your wallet address
                    amount: amount,
                });
                console.log(allowance);
                if (!allowance) {
                    await Moralis.Plugins.oneInch.approve({
                        chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
                        tokenAddress: currentTrade.from.address, // The token you want to swap
                        fromAddress: address, // Your wallet address
                    });
                }
            }
            try {
                let receipt = await doSwap(address, amount);
                notify('success', 'Swap Completed Successfully')
            } catch (error) {
                notify('warning', 'Swap Failed')
                console.log(error);
            }
        }

        function doSwap(userAddress, amount) {
            return Moralis.Plugins.oneInch.swap({
                chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
                fromTokenAddress: currentTrade.from.address, // The token you want to swap
                toTokenAddress: currentTrade.to.address, // The token you want to receive
                amount: amount,
                fromAddress: userAddress, // Your wallet address
                slippage: 1,
            });
        }

        init();

        document.getElementById("modal_close").onclick = closeModal;
        document.getElementById("from_token_select").onclick = () => {
            openModal("from");
        };
        document.getElementById("to_token_select").onclick = () => {
            openModal("to");
        };
        document.getElementById("from_amount").onblur = getQuote;
        document.getElementById("swap_button").onclick = trySwap;
    </script>
@endsection
