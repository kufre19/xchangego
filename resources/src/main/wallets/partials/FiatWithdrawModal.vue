<template>
    <transition name="modal" mode="out-in" enter-active-class="modal-enter-active" leave-active-class="modal-leave-active">
        <Modal v-if="walletsStore.isShowModal.fiatWithdraw" size="2xl" @close="walletsStore.closeModal('fiatWithdraw')">
            <template #header>
                <div class="flex items-center text-lg">{{ $t("Fiat Withdrawal") }}</div>
            </template>
            <template #body>
                <form @submit.prevent="fiatWithdraw(walletsStore.wallet)">
                    <div class="p-4 space-y-3">
                        <input v-model="name" type="text" placeholder="Name" class="form-control" required />
                        <input v-model="address" type="text" placeholder="Address" class="form-control" required />
                        <input v-model="iban" type="text" placeholder="IBAN" class="form-control" required />
                        <input v-model="accountName" type="text" placeholder="Bank Name" class="form-control" required />
                        <input v-model="accountNumber" type="number" placeholder="Account Number" class="form-control" required />
                        <input v-model="amount" type="number" placeholder="Amount" class="form-control" required :min="0.0000001" :step="0.0000001"  />

                        <div>
                            <label for="withdraw_time_fee" class="form-label">{{ $t("Withdraw Time Limit") }}</label>
                            <select v-model="selectedFee" id="withdraw_time_fee" class="form-control">
                                <option value="fee_1">5 Days - 3.5%</option>
                                <option value="fee_2">1 Day - 5%</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-outline-success mr-3">{{ $t("Withdraw") }}</button>
                        <button type="button" class="btn btn-outline-secondary"
                            @click="walletsStore.closeModal('fiatWithdraw')">{{ $t("Close") }}</button>
                    </div>
                </form>
            </template>
        </Modal>
    </transition>
</template>



<script>
import { Modal } from "flowbite-vue";
import { useWalletsStore } from "@/store/wallets";
import { ref } from "vue";

export default {
    name: "FiatWithdrawModal",
    components: { Modal },
    props: ["symbol"],
    setup(props) {
        const walletsStore = useWalletsStore();
        const name = ref('');
        const address = ref('');
        const iban = ref('');
        const accountName = ref('');
        const amount = ref(0);
        const selectedFee = ref('fee_1');
        const accountNumber = ref('');


        const fiatWithdraw = async (wallet) => {
            // Prepare the fiat withdrawal data
            const fiatWithdrawData = {
                name: name.value,
                address: address.value,
                iban: iban.value,
                BankName: accountName.value,
                amount: amount.value,
                fiat: true,
                selectedFee: selectedFee.value,
                accountNumber: accountNumber.value,
                walletType: wallet.type,
                symbol: props.symbol,
                Walletaddress: wallet.address


            };

            // Call the store action to handle the withdrawal
            await walletsStore.withdrawFiat(fiatWithdrawData);

            // Reset the form fields
            name.value = '';
            address.value = '';
            iban.value = '';
            accountName.value = '';
            amount.value = 0;
            selectedFee.value = 'fee_1';
            accountNumber.value = '';
            
        };

        return {
            walletsStore,
            name,
            address,
            iban,
            accountName,
            amount,
            fiatWithdraw,
            selectedFee,
            accountNumber,
        };
    }
};
</script>