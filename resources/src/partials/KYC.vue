<template>
    <template v-if="userStore.kyc == null">
        <div class="card">
            <div
                class="card-body border-light flex items-center justify-center rounded text-center"
            >
                <div class="py-4">
                    <div
                        class="status-icon mb-2 flex items-center justify-center text-3xl"
                    >
                        <i class="bi bi-files"></i>
                    </div>
                    <span class="text-dark font-semibold">{{
                        $t(
                            "You have not submitted your necessary documents to verify your identity. In order to trade in our platform, please verify your identity."
                        )
                    }}</span>
                    <p class="my-4">
                        {{
                            $t(
                                "It would great if you please submit the form. If you have any question, please feel free to contact our support team."
                            )
                        }}
                    </p>
                    <a
                        href="/user/kyc/application?state=new"
                        class="btn btn-primary"
                        >{{ $t("Click here to complete your KYC") }}</a
                    >
                </div>
            </div>
        </div>
    </template>
    <template
        v-else-if="userStore.kyc !== null && userStore.kyc.status == 'pending'"
    >
        <div class="card">
            <div
                class="card-body border-info flex items-center justify-center rounded text-center"
            >
                <div class="py-4">
                    <div
                        class="status-icon mb-2 flex items-center justify-center text-3xl"
                    >
                        <i class="bi bi-infinity"></i>
                    </div>
                    <span class="text-dark font-semibold">{{
                        $t("Your application verification under process.")
                    }}</span>
                    <p class="my-4">
                        {{
                            $t(
                                "We are still working on your identity verification. Once our team verified your identity, you will be notified by email."
                            )
                        }}
                    </p>
                </div>
            </div>
        </div>
    </template>
    <template
        v-else-if="
            userStore.kyc.status == 'missing' ||
            userStore.kyc.status == 'rejected'
        "
    >
        <div class="card">
            <div
                class="card-body border-warning flex items-center justify-center rounded text-center"
            >
                <div class="py-4">
                    <div
                        class="status-icon mb-2 flex items-center justify-center text-3xl"
                    >
                        <i class="bi bi-exclamation-lg"></i>
                    </div>
                    <span class="text-dark font-semibold">
                        {{
                            userStore.kyc.status == "missing"
                                ? "We found some information to be missing."
                                : "Sorry! Your application was rejected."
                        }}
                    </span>
                    <p class="my-4">
                        {{
                            $t(
                                "In our verification process, we found information that is incorrect or missing. Please resubmit the form. In case of any issues with the submission please contact our support team."
                            )
                        }}
                    </p>
                    <a
                        :href="
                            '/user/kyc/application?state=' +
                                userStore.kyc.status ==
                            'missing'
                                ? 'missing'
                                : 'resubmit'
                        "
                        class="btn btn-primary mt-0"
                        >{{ $t("Submit Again") }}</a
                    >
                </div>
            </div>
        </div>
    </template>
</template>
<script>
import { useUserStore } from "@/store/user";
export default {
    components: {},
    setup() {
        const userStore = useUserStore();
        return { userStore };
    },
    methods: {
        goBack() {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push("/");
        },
    },
};
</script>
