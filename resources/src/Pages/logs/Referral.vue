<template>
    <div>
        <div class="row" id="table-hover-row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">{{ $t("Referral Log") }}</h4>
                        <div class="input-group w-50">
                            <span class="input-group-text" id="trx-search">{{
                                $t("Transaction ID")
                            }}</span>
                            <input
                                class="form-control"
                                v-model="filters.trx.value"
                            />
                        </div>
                    </div>
                    <div class="table-responsive">
                        <v-table
                            :data="logs"
                            :filters="filters"
                            :currentPage.sync="currentPage"
                            :pageSize="10"
                            @totalPagesChanged="totalPages = $event"
                            class="table table-hover"
                        >
                            <thead slot="head">
                                <tr>
                                    <v-th sortKey="id" scope="col">ID</v-th>
                                    <v-th sortKey="gateway.name" scope="col">{{
                                        $t("First Name")
                                    }}</v-th>
                                    <v-th sortKey="amount" scope="col">{{
                                        $t("Last Name")
                                    }}</v-th>
                                    <v-th sortKey="status" scope="col">{{
                                        $t("Username")
                                    }}</v-th>
                                    <v-th sortKey="created_at" scope="col">{{
                                        $t("Date")
                                    }}</v-th>
                                </tr>
                            </thead>
                            <tbody slot="body" slot-scope="{ displayData }">
                                <template v-if="logs != null">
                                    <tr
                                        v-for="row in displayData"
                                        :key="row.id"
                                    >
                                        <td data-label="trx">
                                            {{ row.trx }}
                                        </td>
                                        <td data-label="Gateway">
                                            {{ row.gateway.name }}
                                        </td>
                                        <td data-label="Amount">
                                            {{
                                                (row.amount * cur_rate)
                                                    | toMoney(2)
                                            }}
                                            {{ gnl_symbol }}
                                            <button
                                                v-if="
                                                    row.admin_feedback != null
                                                "
                                                class="btn-info btn-rounded badge detailBtn"
                                                :data-admin_feedback="
                                                    row.admin_feedback
                                                "
                                            >
                                                <i
                                                    class="bi bi-info-circle"
                                                ></i>
                                            </button>
                                        </td>

                                        <td data-label="Status">
                                            <span
                                                v-if="row.status == 1"
                                                class="badge bg-success"
                                                >{{ $t("Complete") }}</span
                                            >
                                            <span
                                                v-else-if="row.status == 2"
                                                class="badge bg-warning"
                                                >{{ $t("Pending") }}</span
                                            >
                                            <span
                                                v-else-if="row.status == 3"
                                                class="badge bg-danger"
                                                >{{ $t("Canceled") }}</span
                                            >
                                        </td>
                                        <td data-label="Date">
                                            {{
                                                row.created_at
                                                    | moment(
                                                        "dddd, MMMM Do YYYY"
                                                    )
                                            }}
                                        </td>
                                        <td data-label="Details">
                                            <a
                                                class="btn btn-primary btn-sm btn-icon"
                                            >
                                                <i
                                                    class="bi bi-info-circle"
                                                ></i>
                                            </a>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="100%">
                                            {{ $t("No results found!") }}
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </v-table>
                    </div>
                    <div class="card-footer ms-auto pb-0">
                        <smart-pagination
                            :currentPage.sync="currentPage"
                            :totalPages="totalPages"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // component list
    components: {},

    // component data
    data() {
        return {
            logs: [],
            cur_rate: cur_rate,
            cur_symbol: cur_symbol,
            filters: {
                trx: { value: "", keys: ["trx"] },
            },
            currentPage: 1,
            totalPages: 0,
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
            this.$http.post("/user/fetch/deposit/history").then((response) => {
                this.logs = response.data.logs;
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
