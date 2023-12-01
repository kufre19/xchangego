<template>
  <div>
    <div class="grid xs:gap-0 md:gap-5 xs:grid-cols-1 md:grid-cols-4">
      <div class="col-span-1 space-y-5">
        <card-profile
          :user-store="userStore"
          :mlm-store="mlmStore"
          :plat="plat"
          @show-withdraw-modal="showModal('withdraw')"
        ></card-profile>
        <Refer
          :pathname="pathname"
          :reward="
            plat.mlm.unilevel_upline1_percentage
              ? plat.mlm.unilevel_upline1_percentage
              : 5
          "
        />
        <div v-if="plat.mlm.type == 'binary'" class="card">
          <div class="card-header">
            <h4 class="card-title">
              {{ $t("All Referrals") }}
            </h4>
          </div>
          <div class="card-body">
            <div class="flex flex-wrap">
              <span
                v-for="(ref, index) in mlmStore.ref_by"
                :key="index"
                class="badge bg-warning mr-1"
                >{{ ref.username }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3 space-y-5">
        <business-network
          :plat="plat"
          :mlm-store="mlmStore"
          :user-store="userStore"
          :tree-data="treeData"
        ></business-network>
        <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-2">
          <div>
            <bv-cards :mlm-store="mlmStore" :plat="plat"></bv-cards>
            <rank-commissions
              :plat="plat"
              :mlm-store="mlmStore"
            ></rank-commissions>
          </div>
          <latest-commissions :mlm-store="mlmStore"></latest-commissions>
        </div>
      </div>
    </div>
    <div
      v-if="plat.mlm.membership_status == 1"
      class="mt-5 grid gap-5 xs:grid-cols-1 md:grid-cols-2"
    >
      <current-rank :mlm-store="mlmStore" :plat="plat"></current-rank>
      <next-rank
        :mlm-store="mlmStore"
        :plat="plat"
        @show-deposit-modal="showModal('deposit')"
      ></next-rank>
    </div>

    <transition
      name="modal"
      mode="out-in"
      enter-active-class="modal-enter-active"
      leave-active-class="modal-leave-active"
    >
      <Modal
        v-if="isShowModal.deposit"
        size="lg"
        @close="closeModal('deposit')"
      >
        <template #header>
          <div class="flex items-center text-lg">
            {{ $t("Become an Affiliate Member") }}
          </div>
        </template>
        <template #body>
          <div
            v-if="plat.mlm.membership_terms != null"
            v-html="plat.mlm.membership_terms"
          ></div>
        </template>
        <template #footer>
          <div class="flex justify-end space-x-3">
            <button
              v-if="ext.eco == 1 && mlmStore.canDirect == true"
              :key="mlmStore.canDirect"
              type="submit"
              class="btn btn-outline-warning"
              @click="
                fetchWallet(
                  plat.mlm.membership_deposit_currency,
                  plat.mlm.membership_deposit_currency_network
                );
                closeModal('deposit');
                showModal('depositEco');
              "
            >
              {{ $t("Direct Deposit") }}
            </button>
            <button
              type="submit"
              class="btn btn-outline-success"
              @click="
                closeModal('deposit');
                showModal('depositWallet');
              "
            >
              {{ $t("Wallet Transfer") }}
            </button>
          </div>
        </template>
      </Modal>
    </transition>

    <form class="deposite-form" @submit.prevent="deposit('eco')">
      <transition
        name="modal"
        mode="out-in"
        enter-active-class="modal-enter-active"
        leave-active-class="modal-leave-active"
      >
        <Modal
          v-if="isShowModal.depositEco"
          size="lg"
          @close="
            closeModal('depositEco');
            showModal('deposit');
          "
        >
          <template #header>
            <div class="flex items-center text-lg">
              {{ $t("Direct Deposit Confirmation") }}
            </div>
          </template>
          <template #body>
            <div class="space-y-5">
              <div :key="mlmStore.walCur" class="mb-1">
                <label for="basic-url" class="form-label">
                  <a class="text-dark">{{ $t("Wallet Balance") }}</a>
                </label>
                <form
                  v-if="mlmStore.walCur == null"
                  @submit.prevent="
                    createWallet(
                      plat.mlm.membership_deposit_currency,
                      plat.mlm.membership_deposit_currency_network
                    )
                  "
                >
                  <button
                    type="submit"
                    class="btn btn-outline-success"
                    :disabled="mlmStore.loading"
                  >
                    {{ $t("Create Wallet") }}
                  </button>
                </form>
                <div v-else class="input-group">
                  <input
                    :key="mlmStore.walCur"
                    type="number"
                    :value="mlmStore.walCur"
                    readonly
                    aria-label="Amount (to the nearest dollar)"
                  />
                  <span>{{ plat.mlm.membership_deposit_currency }}</span>
                </div>
              </div>
              <div>
                <label for="hash" class="form-label">{{ $t("Amount") }}</label>
                <input
                  v-if="mlmStore.plan0 != null"
                  id="amount"
                  v-model="amount"
                  class="form-control"
                  type="text"
                  :min="mlmStore.plan0.deposits_required"
                  required
                />
              </div>
              <div>
                <label for="hash" class="form-label">{{
                  $t("Minimum Deposit To Activate Community Line")
                }}</label>
                <input
                  class="form-control"
                  type="text"
                  readonly
                  :value="
                    mlmStore.plan0 != null &&
                    mlmStore.plan0.deposits_required +
                      ' ' +
                      plat.mlm.membership_deposit_currency
                  "
                />
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-end space-x-2">
              <button
                type="submit"
                class="btn btn-outline-success"
                :disabled="mlmStore.loading"
              >
                {{ $t("Deposit") }}
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                :disabled="mlmStore.loading"
                @click="
                  closeModal('depositEco');
                  showModal('deposit');
                "
              >
                {{ $t("Close") }}
              </button>
            </div>
          </template>
        </Modal>
      </transition>
    </form>

    <form class="deposite-form" @submit.prevent="deposit('wallet')">
      <transition
        name="modal"
        mode="out-in"
        enter-active-class="modal-enter-active"
        leave-active-class="modal-leave-active"
      >
        <Modal
          v-if="isShowModal.depositWallet"
          size="lg"
          @close="
            closeModal('depositWallet');
            showModal('deposit');
          "
        >
          <template #header>
            <div class="flex items-center text-lg">
              {{ $t("Wallet Transfer Confirmation") }}
            </div>
          </template>
          <template #body>
            <div>
              <label for="hash" class="form-label">{{
                $t("Deposit Wallet")
              }}</label>
              <div class="input-group">
                <input
                  class="form-control"
                  type="text"
                  readonly
                  :value="plat.mlm.membership_deposit_wallet"
                />
              </div>
              <small class="text-warning"
                >{{ $t("Send") }}
                {{ plat.mlm.membership_deposit_currency }}
                {{
                  $t("to this wallet the enter the transaction hash below")
                }}</small
              >
            </div>
            <div>
              <label for="hash" class="form-label">{{
                $t("Deposit Hash")
              }}</label>
              <input
                id="hash"
                v-model="mlmStore.hash"
                class="form-control"
                type="text"
                placeholder="0x45xxxxxxxxxxxxxxxca46xxxxxxxxxxxxxxxxx2xxxxxxxxxxxxxxxxxxx"
                required=""
              />
            </div>
            <div v-if="mlmStore.mlm.value && mlmStore.mlm.membership == 0">
              <label for="hash" class="form-label">{{
                $t("Minimum Deposit To Activate Community Line")
              }}</label>
              <input
                class="form-control"
                type="text"
                readonly
                :value="
                  mlmStore.plan0 != null &&
                  mlmStore.plan0.deposits_required +
                    ' ' +
                    plat.mlm.membership_deposit_currency
                "
              />
            </div>
          </template>
          <template #footer>
            <div class="flex justify-end space-x-2">
              <button
                type="submit"
                class="btn btn-outline-success"
                :disabled="mlmStore.loading"
              >
                {{ $t("Deposit") }}
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary"
                :disabled="mlmStore.loading"
                @click="
                  closeModal('depositWallet');
                  showModal('deposit');
                "
              >
                {{ $t("Close") }}
              </button>
            </div>
          </template>
        </Modal>
      </transition>
    </form>

    <form class="withdraw-form" @submit.prevent="membership_withdraw()">
      <transition
        name="modal"
        mode="out-in"
        enter-active-class="modal-enter-active"
        leave-active-class="modal-leave-active"
      >
        <Modal
          v-if="isShowModal.withdraw"
          size="lg"
          @close="closeModal('withdraw')"
        >
          <template #header>
            <div class="flex items-center text-lg">
              {{ $t("Earning Withdraw") }}
            </div>
          </template>
          <template #body>
            <label for="wallet_address" class="form-label">{{
              $t("Withdraw Wallet")
            }}</label>
            <input
              id="wallet_address"
              v-model="mlmStore.wallet_address"
              class="form-control"
              type="text"
              placeholder="0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              required=""
            />
            <small class="text-warning"
              >{{ $t("Write your") }}
              {{ plat.mlm.membership_deposit_currency }}
              {{ $t("here to recieve your earnings") }}</small
            >
          </template>
          <template #footer>
            <div class="flex justify-end">
              <button
                type="submit"
                class="btn btn-outline-success"
                :disabled="mlmStore.loading"
              >
                {{ $t("Withdraw") }}
              </button>
            </div>
          </template>
        </Modal>
      </transition>
    </form>
  </div>
</template>

<script>
  import { Modal } from "flowbite-vue";
  import Refer from "@/partials/Refer.vue";
  import { useMlmStore } from "@/store/mlm";
  import { useUserStore } from "@/store/user";
  import CurrentRank from "./membership/CurrentRank.vue";
  import NextRank from "./membership/NextRank.vue";
  import BusinessNetwork from "./network/BusinessNetwork.vue";
  import RankCommissions from "./commissions/RankCommissions.vue";
  import LatestCommissions from "./commissions/LatestCommissions.vue";
  import CardProfile from "./CardProfile.vue";
  import BvCards from "./BvCards.vue";

  export default {
    // component list
    components: {
      Refer,
      RankCommissions,
      Modal,
      CurrentRank,
      NextRank,
      BusinessNetwork,
      LatestCommissions,
      CardProfile,
      BvCards,
    },
    setup() {
      const userStore = useUserStore();
      const mlmStore = useMlmStore();
      return { userStore, mlmStore };
    },

    // component data
    data() {
      return {
        pathname: window.location.protocol + "//" + window.location.hostname,
        gnl: gnl,
        plat: plat,
        ext: ext,
        amount: null,
        imageLoading: true,
        isShowModal: {
          deposit: false,
          depositEco: false,
          depositWallet: false,
          withdraw: false,
        },
      };
    },
    computed: {
      treeData() {
        return this.mlmStore.treeData;
      },
    },

    created() {
      this.fetchData();
    },

    // custom methods
    methods: {
      closeModal(type) {
        if (type == "deposit") {
          this.isShowModal.deposit = false;
        } else if (type == "depositEco") {
          this.isShowModal.depositEco = false;
        } else if (type == "depositWallet") {
          this.isShowModal.depositWallet = false;
        } else if (type == "withdraw") {
          this.isShowModal.withdraw = false;
        }
      },
      showModal(type) {
        if (type == "deposit") {
          this.isShowModal.deposit = true;
        } else if (type == "depositEco") {
          this.isShowModal.depositEco = true;
        } else if (type == "depositWallet") {
          this.isShowModal.depositWallet = true;
        } else if (type == "withdraw") {
          this.isShowModal.withdraw = true;
        }
      },
      async fetchData() {
        if (this.mlmStore.mlm.length == 0) {
          await this.mlmStore.fetch();
        }
      },
      async fetchWallet(coin, chain) {
        await this.mlmStore.fetchWallet(coin, chain);
      },
      async createWallet(coin, chain) {
        await this.mlmStore.createWallet(coin, chain);
      },
      async deposit(type) {
        await this.mlmStore.deposit(type, this.amount);
      },
      async membership_withdraw() {
        await this.mlmStore.membership_withdraw();
        this.closeModal("withdraw");
      },
    },
  };
</script>
