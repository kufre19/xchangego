<template>
    <div>
        <div
            class="card bg-black"
            style="background-image: url('assets/images/staking/bg/banner.gif')"
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
                            <router-link class="card-footer btn" to="/staking">
                                <i class="bi bi-chevron-left"></i
                                ><span> Go Back</span>
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
                            <th scope="col">Total Staking</th>
                            <th scope="col">Profit</th>
                            <th scope="col">Duration (Days)</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody
                        v-if="coinlogs != null && coinlogs.length > 0"
                        :key="coinlogs.length"
                    >
                        <tr v-for="(log, index) in coinlogs" :key="index">
                            <td data-label="Coin">
                                <div class="d-flex align-items-center">
                                    <img
                                        class="avatar-content me-1"
                                        width="32px"
                                        :src="
                                            log.symbol
                                                ? '/assets/images/cryptoCurrency/' +
                                                  log.symbol +
                                                  '.png'
                                                : '/market/notification.png'
                                        "
                                    />
                                    <span class="fw-bold me-1 fs-3">{{
                                        log.symbol
                                    }}</span>
                                </div>
                            </td>
                            <td data-label="Total Staking">
                                <span class="text-success fw-bold fs-6"
                                    >{{ log.staked ? log.staked : 0 }}
                                    {{ log.symbol }}</span
                                >
                            </td>
                            <td data-label="Profit">
                                <div>
                                    Yesterday Profit:
                                    <span class="fw-bold text-success">{{
                                        log.last_profit ? log.last_profit : 0
                                    }}</span>
                                    USDT
                                </div>
                                <div>
                                    Total Profit:
                                    <span class="fw-bold text-success">{{
                                        log.total_profit ? log.total_profit : 0
                                    }}</span>
                                    USDT
                                </div>
                            </td>
                            <td data-label="Duration">
                                <div>
                                    Start:
                                    <span class="fw-bold text-warning">{{
                                        log.start_date
                                    }}</span>
                                </div>
                                <div>
                                    End:
                                    <span class="fw-bold text-warning">{{
                                        log.end_date
                                    }}</span>
                                </div>
                            </td>
                            <td data-label="Status">
                                <span
                                    v-if="log.status == 0"
                                    class="badge bg-danger"
                                    >Canceled</span
                                >
                                <span
                                    v-else-if="log.status == 1"
                                    class="badge bg-primary"
                                    >Staking</span
                                >
                                <span
                                    v-else-if="log.status == 2"
                                    class="badge bg-warning"
                                    >Completed</span
                                >
                                <span
                                    v-else-if="log.status == 3"
                                    class="badge bg-success"
                                    >Claimed</span
                                >
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td class="text-muted text-center" colspan="100%">
                                <img
                                    height="128px"
                                    width="128px"
                                    src="https://assets.staticimg.com/pro/2.0.4/images/empty.svg"
                                    alt=""
                                />
                                <p>No Data Found</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
// component
export default {
    props: ["user"],

    // component list
    components: {},

    // component data
    data() {
        return {
            coinlogs: [],
            assets: [],
            last_profit: [],
            total_profit: [],
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
            this.$http.post("/user/fetch/staking/logs").then((response) => {
                (this.coinlogs = response.data.coinlogs),
                    (this.assets = response.data.assets),
                    (this.last_profit = response.data.last_profit),
                    (this.total_profit = response.data.total_profit);
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
