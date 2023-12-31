<template>
    <div class="row" style="min-height: 40vh">
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div
                class="card card-congratulation-medal"
                style="max-height: 22vh"
            >
                <div class="card-body" v-if="user != null">
                    <h5>
                        {{ $t("Welcome") }} {{ user.firstname }}
                        {{ user.lastname }}
                    </h5>
                    <router-link
                        :to="
                            'trade/' +
                            (plat.trading.first_trade_page
                                ? plat.trading.first_trade_page
                                : 'BTC/USDT')
                        "
                        type="button"
                        class="mt-3 btn btn-primary"
                        >{{ $t("Start Trading") }}</router-link
                    >
                </div>
            </div>

            <div class="card card-transaction">
                <div class="card-header">
                    <h4 class="card-title">{{ $t("Wallets") }}</h4>
                </div>
                <div
                    v-if="wallets != null && wallets.length > 0"
                    class="card-body mb-1"
                    style="max-height: 48vh; overflow-y: auto"
                >
                    <div
                        v-for="(wallet, index) in wallets"
                        :key="index"
                        class="transaction-item"
                    >
                        <div class="d-flex">
                            <div
                                class="avatar bg-light-primary rounded float-start"
                            >
                                <v-lazy-image
                                    class="avatar-content"
                                    :width="40"
                                    :src="
                                        wallet.symbol
                                            ? '/assets/images/cryptoCurrency/' +
                                              wallet.symbol.toLowerCase() +
                                              '.png'
                                            : '/market/notification.png'
                                    "
                                    alt=""
                                ></v-lazy-image>
                            </div>
                            <div class="transaction-percentage">
                                <h6 class="transaction-title">
                                    <span class="text-danger">{{
                                        wallet.symbol
                                    }}</span>
                                </h6>
                                <small
                                    >{{ wallet.balance | toMoney(4) }}
                                    {{ wallet.symbol }}</small
                                >
                            </div>
                        </div>
                        <div class="fw-bolder">
                            <router-link
                                :to="
                                    '/wallets/' +
                                    wallet.type +
                                    '/' +
                                    wallet.symbol +
                                    '/' +
                                    wallet.address
                                "
                                ><button class="btn btn-sm btn-primary">
                                    {{ $t("View") }}
                                </button></router-link
                            >
                        </div>
                    </div>
                </div>
                <div v-else class="card-body">
                    <div class="text-muted text-center" colspan="100%">
                        <img
                            height="128px"
                            width="128px"
                            src="https://assets.staticimg.com/pro/2.0.4/images/empty.svg"
                            alt=""
                        />
                        <p class="">{{ $t("No Wallet Found") }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-8 col-md-6 col-sm-12">
            <template v-if="user.frozen_wallet != null">
                <div class="mb-1">
                    <button
                        class="w-100 btn btn-warning d-flex justify-content-between align-items-center px-5"
                    >
                        <h1 class="text-light">Frozen Wallet</h1>
                        <h1 class="text-light">
                            {{ user.frozen_wallet.balance }}
                            {{ user.frozen_wallet.symbol }}
                        </h1>
                        <i
                            class="bi bi-info-circle"
                            style="font-size: 2rem"
                            v-tooltip
                            :title="user.frozen_wallet.text"
                        ></i>
                    </button>
                </div>
            </template>
            <ul class="nav nav-tabs border" id="pills-tab" role="tablist">
                <li class="nav-item w-50">
                    <a
                        class="nav-link"
                        @click.prevent="setActive('market')"
                        :class="{ active: isActive('market') }"
                        href="#market"
                        >{{ $t("Market Orders") }}</a
                    >
                </li>
                <li class="nav-item w-50">
                    <a
                        class="nav-link"
                        @click.prevent="setActive('limit')"
                        :class="{ active: isActive('limit') }"
                        href="#limit"
                        >{{ $t("Limit Orders") }}</a
                    >
                </li>
            </ul>
            <div class="tab-content" id="pills-graph-tabContent">
                <div
                    class="tab-pane fade"
                    :class="{ 'active show': isActive('market') }"
                    id="market"
                    role="tabpanel"
                >
                    <div
                        class="card"
                        style="
                            font-size: 11px;
                            max-height: 74vh;
                            overflow-y: auto;
                        "
                    >
                        <div class="table-responsive">
                            <table class="table">
                                <thead class="table-dark">
                                    <tr>
                                        <th scope="col">{{ $t("Trade") }}</th>
                                        <th scope="col">{{ $t("Pricing") }}</th>
                                        <th scope="col">{{ $t("Order") }}</th>
                                        <th scope="col">{{ $t("Status") }}</th>
                                    </tr>
                                </thead>
                                <tbody
                                    v-if="
                                        orders.market != null &&
                                        orders.market.length > 0
                                    "
                                    :key="orders.market.symbol"
                                >
                                    <tr
                                        v-for="(order, index) in orders.market"
                                        :key="index"
                                    >
                                        <td
                                            data-label="Trade"
                                            class="text-uppercase"
                                        >
                                            <div>
                                                {{ $t("Pair") }}:
                                                <span
                                                    class="fw-bold text-info"
                                                    >{{ order.symbol }}</span
                                                >
                                            </div>
                                        </td>
                                        <td data-label="Pricing">
                                            <div class="fw-bold">
                                                {{ $t("Price") }}:
                                                <span class="text-warning">{{
                                                    order.price | toMoney(4)
                                                }}</span>
                                                {{ order.symbol.split("/")[1] }}
                                            </div>
                                            <div class="fw-bold">
                                                {{ $t("Amount") }}:
                                                <span class="text-warning">{{
                                                    order.amount | toMoney(4)
                                                }}</span>
                                                {{ order.symbol.split("/")[0] }}
                                            </div>
                                            <div class="fw-bold">
                                                {{ $t("Cost") }}:
                                                <span class="text-warning">{{
                                                    order.cost | toMoney(4)
                                                }}</span>
                                                {{ order.symbol.split("/")[1] }}
                                            </div>
                                            <div class="fw-bold">
                                                {{ $t("Fees") }}:
                                                <span class="text-danger">{{
                                                    order.fee | toMoney(4)
                                                }}</span>
                                                {{ order.symbol.split("/")[1] }}
                                            </div>
                                        </td>
                                        <td data-label="Order">
                                            <div>
                                                {{ $t("Type") }}:
                                                <span
                                                    v-if="order.side == 'buy'"
                                                    class="fw-bold text-success"
                                                    >{{ $t("Buy") }}</span
                                                >
                                                <span
                                                    v-else
                                                    class="fw-bold text-danger"
                                                    >{{ $t("Sell") }}</span
                                                >
                                            </div>
                                            <div class="fw-bold">
                                                {{ $t("Filled") }}:
                                                <span class="text-info">{{
                                                    order.filled | toMoney(4)
                                                }}</span>
                                                {{ order.symbol.split("/")[0] }}
                                            </div>
                                            <div class="fw-bold">
                                                {{ $t("Remaining") }}:
                                                <span class="text-danger">{{
                                                    order.remaining | toMoney(4)
                                                }}</span>
                                                {{ order.symbol.split("/")[0] }}
                                            </div>
                                        </td>
                                        <td data-label="Status">
                                            <span
                                                v-if="order.status == 'closed'"
                                                class="badge bg-success"
                                                >{{ $t("Filled") }}</span
                                            >
                                            <span
                                                v-else-if="
                                                    order.status == 'open'
                                                "
                                                class="badge bg-primary"
                                                >{{ $t("Live") }}</span
                                            >
                                            <span
                                                v-else
                                                class="badge bg-danger"
                                                >{{ $t("Canceled") }}</span
                                            >
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td
                                            class="text-muted text-center"
                                            colspan="100%"
                                        >
                                            <img
                                                height="128px"
                                                width="128px"
                                                src="https://assets.staticimg.com/pro/2.0.4/images/empty.svg"
                                                alt=""
                                            />
                                            <p class="">
                                                {{ $t("No Data Found") }}
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div
                    class="tab-pane fade"
                    :class="{ 'active show': isActive('limit') }"
                    id="limit"
                    role="tabpanel"
                >
                    <div
                        class="card"
                        style="
                            font-size: 11px;
                            max-height: 74vh;
                            overflow-y: auto;
                        "
                    >
                        <div class="table-responsive">
                            <table class="table">
                                <thead class="table-dark">
                                    <tr>
                                        <th scope="col">{{ $t("Trade") }}</th>
                                        <th scope="col">{{ $t("Pricing") }}</th>
                                        <th scope="col">{{ $t("Order") }}</th>
                                        <th scope="col">{{ $t("Status") }}</th>
                                    </tr>
                                </thead>
                                <tbody
                                    v-if="
                                        orders.limit != null &&
                                        orders.limit.length > 0
                                    "
                                    :key="orders.limit.symbol"
                                >
                                    <tr
                                        v-for="(order, index) in orders.limit"
                                        :key="index"
                                    >
                                        <td
                                            data-label="Trade"
                                            class="text-uppercase"
                                        >
                                            <div>
                                                {{ $t("Pair") }}:
                                                <span
                                                    class="fw-bold text-info"
                                                    >{{ order.symbol }}</span
                                                >
                                            </div>
                                        </td>
                                        <td data-label="Pricing">
                                            <div class="fw-bold">
                                                {{ $t("Price") }}:
                                                <span class="text-warning">{{
                                                    order.price | toMoney(4)
                                                }}</span>
                                                {{ order.symbol.split("/")[1] }}
                                            </div>
                                            <div class="fw-bold">
                                                {{ $t("Amount") }}:
                                                <span class="text-warning">{{
                                                    order.amount | toMoney(4)
                                                }}</span>
                                                {{ order.symbol.split("/")[0] }}
                                            </div>
                                            <div class="fw-bold">
                                                {{ $t("Cost") }}:
                                                <span class="text-warning">{{
                                                    order.cost | toMoney(4)
                                                }}</span>
                                                {{ order.symbol.split("/")[1] }}
                                            </div>
                                            <div class="fw-bold">
                                                {{ $t("Fees") }}:
                                                <span class="text-danger">{{
                                                    order.fee | toMoney(4)
                                                }}</span>
                                                {{ order.symbol.split("/")[1] }}
                                            </div>
                                        </td>
                                        <td data-label="Order">
                                            <div>
                                                {{ $t("Type") }}:
                                                <span
                                                    v-if="order.side == 'buy'"
                                                    class="fw-bold text-success"
                                                    >{{ $t("Buy") }}</span
                                                >
                                                <span
                                                    v-else
                                                    class="fw-bold text-danger"
                                                    >{{ $t("Sell") }}</span
                                                >
                                            </div>
                                            <div class="fw-bold">
                                                {{ $t("Filled") }}:
                                                <span class="text-info">{{
                                                    order.filled | toMoney(4)
                                                }}</span>
                                                {{ order.symbol.split("/")[0] }}
                                            </div>
                                            <div class="fw-bold">
                                                {{ $t("Remaining") }}:
                                                <span class="text-danger">{{
                                                    order.remaining | toMoney(4)
                                                }}</span>
                                                {{ order.symbol.split("/")[0] }}
                                            </div>
                                        </td>
                                        <td data-label="Status">
                                            <span
                                                v-if="order.status == 'closed'"
                                                class="badge bg-success"
                                                >{{ $t("Filled") }}</span
                                            >
                                            <span
                                                v-else-if="
                                                    order.status == 'open'
                                                "
                                                class="badge bg-primary"
                                                >{{ $t("Live") }}</span
                                            >
                                            <span
                                                v-else
                                                class="badge bg-danger"
                                                >{{ $t("Canceled") }}</span
                                            >
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td
                                            class="text-muted text-center"
                                            colspan="100%"
                                        >
                                            <img
                                                height="128px"
                                                width="128px"
                                                src="https://assets.staticimg.com/pro/2.0.4/images/empty.svg"
                                                alt=""
                                            />
                                            <p class="">
                                                {{ $t("No Data Found") }}
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["user"],
    // component list
    components: {},

    // component data
    data() {
        return {
            activeItem: "market",
            wallets: [],
            orders: [],
            plat: plat,
        };
    },

    watch: {
        $route: "fetchData",
    },
    // custom methods
    methods: {
        goBack() {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push("/");
        },
        fetchData() {
            this.$http.post("/user/fetch/trade/orders").then((response) => {
                (this.wallets = response.data.wallets),
                    (this.orders = response.data.orders);
            });
        },
        isActive(menuItem) {
            return this.activeItem === menuItem;
        },
        setActive(menuItem) {
            this.activeItem = menuItem;
        },
    },

    // on component created
    created() {
        this.fetchData();
    },

    // on component mounted
    mounted() {},

    // on component destroyed
    destroyed() {},
};
</script>

<style lang="scss">
@import "../scss/variables";
@import "../scss/tooltip";
</style>
