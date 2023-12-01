<template>
    <div class="">
        <div class="d-sm-none text-2 flex items-center justify-between">
            <div class="flex-column flex">
                <div class="text-muted">
                    {{ $t("Last Price") }}:
                    <span class="last_price">------</span
                    ><i class="last_price_icon bi"></i>
                </div>
                <div class="text-muted">
                    {{ $t("24h Change") }}:
                    <span class="day_change">------</span
                    ><i class="day_change_icon bi"></i>
                </div>
            </div>
            <div v-if="provider != 'coinbasepro'" class="flex-column flex">
                <div class="text-muted d-none d-md-block">
                    {{ $route.params.symbol }} {{ $t("Volume") }}:
                    <span class="text-dark day_volume_pair">------</span>
                </div>
                <div class="text-muted d-none d-md-block">
                    {{ $route.params.currency }} {{ $t("Volume") }}:
                    <span class="text-dark day_volume_currency">------</span>
                </div>
            </div>
            <div v-if="provider != 'coinbasepro'" class="flex-column flex">
                <div class="text-muted">
                    {{ $t("24h High") }}:
                    <span class="text-dark day_high">------</span>
                </div>
                <div class="text-muted">
                    {{ $t("24h Low") }}:
                    <span class="text-dark day_low">------</span>
                </div>
            </div>
        </div>
        <div
            class="d-none d-sm-flex text-2 mx-1 mt-1 items-center justify-between"
        >
            <div class="flex items-center">
                <img
                    class="avatar-content"
                    width="36px"
                    :src="
                        $route.params.symbol
                            ? '/assets/images/cryptoCurrency/' +
                              $route.params.symbol.toLowerCase() +
                              '.png'
                            : '/market/notification.png'
                    "
                />
                <i class="bi bi-chevron-right"></i>
                <img
                    class="avatar-content"
                    width="36px"
                    :src="
                        $route.params.currency
                            ? '/assets/images/cryptoCurrency/' +
                              $route.params.currency.toLowerCase() +
                              '.png'
                            : '/market/notification.png'
                    "
                />
            </div>
            <div v-if="provider != 'coinbasepro'" class="flex-column flex">
                <span class="text-muted">{{ $t("24h change") }}</span>
                <span class="day_change fs-6">-------</span>
            </div>
            <div class="flex-column flex">
                <span class="text-muted">{{ $t("24h Price Range") }}</span>
                <div class="text-muted">
                    {{ $t("High") }}:
                    <span class="text-dark day_high">-------</span>
                </div>
                <div class="text-muted">
                    {{ $t("Low") }}:
                    <span class="text-dark day_low">-------</span>
                </div>
            </div>
            <div class="flex-column flex">
                <span class="text-muted">{{ $t("24h Volume") }}</span>
                <span class="text-muted"
                    >{{ $route.params.symbol }}:
                    <span class="text-dark day_volume_pair">-------</span></span
                >
                <span v-if="provider != 'coinbasepro'" class="text-muted"
                    >{{ $route.params.currency }}:
                    <span class="text-dark day_volume_currency"
                        >-------</span
                    ></span
                >
            </div>
        </div>
    </div>
</template>

<script>
// component
export default {
    // component list
    components: {},
    props: ["provider"],

    // component data
    data() {
        return {
            last_price: "",
            day_change: "",
        };
    },

    watch: {
        $route(to, from) {
            this.loopTicker();
        },
    },

    // on component created
    created() {},

    // on component mounted
    mounted() {
        this.loopTicker();
    },

    // on component destroyed
    unmounted() {},
    // custom methods
    methods: {
        async updateTicker(tick) {
            this.tickElements = document.querySelectorAll(".last_price");
            this.tickIcons = document.querySelectorAll(".last_price-icon");

            for (let i = 0; i < this.tickElements.length; i++) {
                const tickElement = this.tickElements[i];
                const tickIcon = this.tickIcons[i];

                if (!this.last_price || tick["last"] > this.last_price) {
                    tickElement.textContent = tick["last"];
                    tickElement.classList.toggle("text-success");
                    tickIcon.classList.toggle("bi-arrow-up");
                    tickIcon.classList.toggle("text-success");
                } else if (tick["last"] < this.last_price) {
                    tickElement.textContent = tick["last"];
                    tickElement.classList.toggle("text-danger");
                    tickIcon.classList.toggle("bi-arrow-down");
                    tickIcon.classList.toggle("text-danger");
                }

                this.last_price = tick["last"];
            }

            if (this.provide != "coinbasepro") {
                this.percentageElements =
                    document.querySelectorAll(".day_change");
                this.percentageIcons =
                    document.querySelectorAll(".day_change-icon");

                for (let i = 0; i < this.percentageElements.length; i++) {
                    const percentageElement = this.percentageElements[i];
                    const percentageIcon = this.percentageIcons[i];

                    if (
                        !this.day_change ||
                        tick["percentage"] > this.day_change
                    ) {
                        percentageElement.textContent =
                            tick["percentage"] + "%";
                        percentageElement.classList.toggle("text-success");
                        percentageIcon.classList.toggle("bi-arrow-up");
                        percentageIcon.classList.toggle("text-success");
                    } else if (tick["percentage"] < this.day_change) {
                        percentageElement.textContent =
                            tick["percentage"] + "%";
                        percentageElement.classList.toggle("text-danger");
                        percentageIcon.classList.toggle("bi-arrow-down");
                        percentageIcon.classList.toggle("text-danger");
                    }

                    this.day_change = tick["percentage"];
                }

                this.day_volume_currencys = document.querySelectorAll(
                    ".day_volume_currency"
                );

                for (const day_volume_currency of this.day_volume_currencys) {
                    day_volume_currency.textContent =
                        new Intl.NumberFormat().format(tick["quoteVolume"]);
                }
            }

            this.day_highs = document.querySelectorAll(".day_high");

            for (const day_high of this.day_highs) {
                day_high.textContent = this.formatPrice(tick["high"]);
            }

            this.day_lows = document.querySelectorAll(".day_low");

            for (const day_low of this.day_lows) {
                day_low.textContent = this.formatPrice(tick["low"]);
            }

            this.day_volume_pairs =
                document.querySelectorAll(".day_volume_pair");

            for (const day_volume_pair of this.day_volume_pairs) {
                day_volume_pair.textContent = new Intl.NumberFormat().format(
                    tick["baseVolume"]
                );
            }
        },

        contains(target, pattern) {
            var value = 0;
            pattern.forEach(function (word) {
                value = value + target.includes(word);
            });
            return value === 1;
        },
        async loopTicker() {
            while (
                window.location.href.indexOf(
                    this.$route.params.symbol +
                        "-" +
                        this.$route.params.currency
                ) > -1
            ) {
                if (document.hidden) {
                    await ccxt.sleep(1000);
                    continue;
                }
                try {
                    const data = await exchange.watchTicker(
                        this.$route.params.symbol +
                            "/" +
                            this.$route.params.currency
                    );
                    this.updateTicker(data);
                } catch (e) {
                    break;
                }
            }
        },

        formatPrice(price) {
            return ccxt.decimalToPrecision(
                price,
                ccxt.ROUND,
                9,
                ccxt.SIGNIFICANT_DIGITS,
                ccxt.PAD_WITH_ZERO
            );
        },
    },
};
</script>
