<template>
    <div
        :key="mlmStore.bvWithdrawable"
        class="mb-5 grid gap-5 xs:grid-cols-1 md:grid-cols-2"
    >
        <div class="card text-center">
            <div class="card-body">
                <div class="avatar bg-light-primary p-50 mb-1">
                    <div class="avatar-content">
                        <i class="bi bi-briefcase font-medium"></i>
                    </div>
                </div>
                <h2 class="font-medium">{{ mlmStore.bvWithdrawable }} BV</h2>
                <p class="card-text">
                    {{ $t("Your Business Value") }}
                </p>
            </div>
        </div>
        <div
            v-if="plat.mlm.commission_type == 'direct'"
            class="card text-center"
        >
            <div class="card-body">
                <div class="avatar bg-light-warning p-50 mb-1">
                    <div class="avatar-content">
                        <i class="bi bi-diagram-3 font-medium"></i>
                    </div>
                </div>
                <h2 class="font-medium">
                    {{
                        mlmStore.planA != null &&
                        mlmStore.planA.trade_commission
                    }}
                    BV
                </h2>
                <p class="card-text">
                    {{ $t("Trade Commission") }}
                </p>
            </div>
        </div>
        <div
            v-else-if="plat.mlm.commission_type == 'daily'"
            class="card text-center"
        >
            <div class="card-body">
                <div class="avatar bg-light-warning p-50 mb-1">
                    <div class="avatar-content">
                        <i class="bi bi-diagram-3 font-medium"></i>
                    </div>
                </div>
                <h2 class="font-medium">{{ mlmStore.daily_bv }} BV</h2>
                <p class="card-text">
                    {{ $t("Daily Business Value") }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BvCards",
    props: {
        mlmStore: {
            type: Object,
            required: true,
        },
        plat: {
            type: Object,
            required: true,
        },
    },
};
</script>
