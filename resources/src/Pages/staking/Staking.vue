<template>
    <div>
        <div
            class="card bg-black"
            style="background-image: url('/assets/images/staking/bg/banner.gif'"
        >
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-9 col-md-8 col-sm-12 col-12">
                        <div
                            class="card"
                            style="background-color: #000000db !important"
                        >
                            <div class="card-body">
                                <h1>Staking</h1>
                                <h3>
                                    Earn stable profits with professional asset
                                    management
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-12 col-12">
                        <div
                            class="card shadow"
                            style="
                                border-top: 6px solid #2dbd96;
                                background-color: #000000db !important;
                                border-bottom-right-radius: 10px;
                                border-bottom-left-radius: 10px;
                            "
                        >
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        <div>Assets (USDT)</div>
                                        <div>{{ assets }}</div>
                                    </div>
                                </div>
                                <div class="row mt-1">
                                    <div class="col">
                                        <div>Yesterday Profit (USDT)</div>
                                        <div>{{ last_profit }}</div>
                                    </div>
                                    <div class="col">
                                        <div>Total Profit (USDT)</div>
                                        <div>{{ total_profit }}</div>
                                    </div>
                                </div>
                            </div>
                            <router-link
                                to="/staking/logs"
                                class="card-footer btn"
                            >
                                <span>View More </span
                                ><i class="bi bi-chevron-right"></i>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="table-responsive">
                <table class="table">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Coin</th>
                            <th scope="col">Staking Profit</th>
                            <th scope="col">Duration (Days)</th>
                            <th scope="col">Minimum Stake Amount</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="coins != null">
                            <tr v-for="(coin, index) in coins" :key="index">
                                <td data-label="Coin">
                                    <div class="d-flex align-items-center">
                                        <v-lazy-image
                                            class="avatar-content me-1"
                                            :width="32"
                                            :src="
                                                coin.icon
                                                    ? '/assets/images/staking/' +
                                                      coin.icon
                                                    : '/assets/images/cryptoCurrency/' +
                                                      coin.symbol +
                                                      '.png'
                                            "
                                        />
                                        <span class="fw-bold me-1 fs-3">{{
                                            coin.symbol
                                        }}</span>
                                        <span class="text-mute fs-5">{{
                                            coin.title
                                        }}</span>
                                    </div>
                                </td>
                                <td data-label="APR">
                                    <span class="text-success fw-bold fs-4"
                                        >{{ coin.profit }}%</span
                                    >
                                </td>
                                <td data-label="Duration (Days)">
                                    <span class="text-warning fw-bold fs-4">{{
                                        coin.period
                                    }}</span>
                                </td>
                                <td data-label="Minimum Stake Amount">
                                    <span class="fs-4"
                                        >{{ coin.min_stake | toMoney(4) }}
                                        {{ coin.symbol }}</span
                                    >
                                </td>
                                <td data-label="Action">
                                    <div v-if="coinlogs != null">
                                        <div
                                            v-if="coinlogs[coin.id] != null"
                                            :key="coinlogs[coin.id].status"
                                        >
                                            <template
                                                v-if="
                                                    coinlogs[coin.id].status !=
                                                    null
                                                "
                                            >
                                                <template
                                                    v-if="
                                                        coinlogs[coin.id]
                                                            .status != 2
                                                    "
                                                >
                                                    <button
                                                        type="button"
                                                        class="btn btn-warning"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#subscribeModal"
                                                        @click="
                                                            stake_coin = coin
                                                        "
                                                    >
                                                        Stake
                                                    </button>
                                                </template>
                                                <button
                                                    v-if="
                                                        coinlogs[coin.id]
                                                            .status == 1
                                                    "
                                                    type="button"
                                                    class="btn btn-danger"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#cancelModal"
                                                    @click="stake_coin = coin"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    v-else-if="
                                                        coinlogs[coin.id]
                                                            .status == 2
                                                    "
                                                    type="button"
                                                    class="btn btn-success"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#claimModal"
                                                    @click="stake_coin = coin"
                                                >
                                                    Claim Profit
                                                </button>
                                            </template>
                                        </div>
                                        <button
                                            v-else
                                            type="button"
                                            class="btn btn-warning"
                                            data-bs-toggle="modal"
                                            data-bs-target="#subscribeModal"
                                            @click="stake_coin = coin"
                                        >
                                            Stake
                                        </button>
                                    </div>
                                    <button
                                        v-else
                                        type="button"
                                        class="btn btn-warning"
                                        data-bs-toggle="modal"
                                        data-bs-target="#subscribeModal"
                                        @click="stake_coin = coin"
                                    >
                                        Stake
                                    </button>
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td
                                    class="text-muted text-center"
                                    colspan="100%"
                                >
                                    No Staking Coin Found
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <!-- table end -->
            </div>
        </div>
        <Stake
            v-if="wallet != null"
            :key="wallet.balance"
            :coin="stake_coin"
            :wallet="wallet"
            @Staked="fetchData()"
        />
        <StakeCancel :coin="stake_coin" @Staked="fetchData()" />
        <StakeClaim :coin="stake_coin" @Staked="fetchData()" />
    </div>
</template>

<script>
import Stake from "../../components/staking/Stake.vue";
import StakeCancel from "../../components/staking/StakeCancel.vue";
import StakeClaim from "../../components/staking/StakeClaim.vue";

export default {
    props: ["user"],
    // component list
    components: {
        Stake,
        StakeCancel,
        StakeClaim,
    },

    // component data
    data() {
        return {
            coins: [],
            stake_coin: [],
            coinlogs: null,
            assets: [],
            last_profit: [],
            total_profit: [],
            wallet: [],
            currency: [],
        };
    },

    // custom methods
    methods: {
        goBack() {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push("/");
        },
        fetchData() {
            this.$http
                .post("/user/fetch/staking")
                .then((response) => {
                    (this.coins = response.data.coins),
                        (this.coinlogs = response.data.coinlogs),
                        (this.assets = response.data.assets),
                        (this.last_profit = response.data.last_profit),
                        (this.total_profit = response.data.total_profit),
                        (this.wallet = response.data.wallet),
                        (this.currency = response.data.currency);
                })
                .catch((error) => {
                    if (error.response.data.message == "nokyc") {
                        window.location.href = "/user/kyc";
                    }
                });
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
