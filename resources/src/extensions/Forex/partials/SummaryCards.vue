<template>
    <template v-if="forexAccount != null">
        <summary-card
            icon="bi-briefcase"
            amount-key="accountBalance"
            title-text="Forex Account Balance"
            :amount="accountBalance"
            :symbol="currencySymbol"
        />
        <summary-card
            icon="bi-diagram-3"
            amount-key="accountProfit"
            title-text="Forex Account Profit"
            :amount="accountProfit"
            :symbol="currencySymbol"
        />
        <summary-card
            icon="bi-node-plus"
            amount-key="totalInvestment"
            title-text="Total Investment"
            :amount="totalInvestment"
            :symbol="currencySymbol"
        />
        <summary-card
            icon="bi-node-plus-fill"
            amount-key="investmentsProfit"
            title-text="Investments Profit"
            :amount="investmentsProfit"
            :symbol="currencySymbol"
        />
    </template>
    <template v-else>
        <div v-for="i in 4" :key="i" class="card">
            <div class="card-body"></div>
        </div>
    </template>
</template>

<script>
import SummaryCard from "./SummaryCard.vue";
export default {
    components: {
        SummaryCard,
    },
    props: {
        forexAccount: {
            type: Object,
            required: true,
        },
        accountBalance: {
            type: Number,
            required: true,
        },
        accountProfit: {
            type: Number,
            required: true,
        },
        totalInvestment: {
            type: Number,
            required: true,
        },
        investmentsProfit: {
            type: Number,
            required: true,
        },
        currencySymbol: {
            type: String,
            required: true,
        },
        forexLog: {
            type: Number,
            required: false,
            default: 0,
        },
        investmentLogsAmount: {
            type: Number,
            required: false,
            default: 0,
        },
        investmentLogsProfit: {
            type: Number,
            required: false,
            default: 0,
        },
    },
};
</script>
