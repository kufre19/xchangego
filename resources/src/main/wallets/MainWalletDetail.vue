<template>
  <div class="flex items-center justify-between mb-5">
    <h3 class="text-lg">{{ state.symbol }} Wallet</h3>
    <div class="flex items-center space-x-2">
      <button
        v-if="walletsStore.missing.length > 0"
        class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        :disabled="walletsStore.loading"
        :loading="walletsStore.loading"
        @click="walletsStore.create_main(walletsStore.missing[0])"
      >
        <i class="bi bi-plus-lg"></i>{{ $t("Create Missing Blockchains") }}
      </button>
      <router-link to="/wallets" class="btn btn-outline-secondary">
        <i class="bi bi-chevron-left"></i> {{ $t("Back") }}
      </router-link>
    </div>
  </div>

  <div class="card mb-5">
    <div class="card-body">
      <div class="grid grid-cols-1 gap-4 items-center md:grid-cols-3">
        <div class="flex items-center col-span-2">
          <img
            v-lazy="
              '/assets/images/cryptoCurrency/' +
              (state.symbol ? state.symbol.toLowerCase() : '') +
              '.png'
            "
            class="avatar-content mr-5"
            height="64"
            width="64"
            @error="onImageError"
          />
          <div>
            <div class="text-lg font-medium">
              {{ state.symbol }}
            </div>
            <div>
              <span v-if="state.api == 1">{{ state.type.toUpperCase() }}</span>
              {{ $t("Wallet") }}
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t("Total:") }}
          </div>
          <div class="text-base dark:text-white">
            {{ Number(totalBalance).toFixed(6) }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="Object.keys(walletsStore.addresses).length > 1" class="mb-5">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div
        v-for="(wallet, key, index) in walletsStore.addresses"
        :key="index"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 wallet"
      >
        <div class="text-sm text-gray-600 dark:text-gray-400">
          {{ key }}
        </div>
        <div class="text-base dark:text-white">
          {{ Number(wallet.balance).toFixed(6) }}
        </div>
        <div
          class="wallet-border"
          :class="`wallet-border-${(index % 7) + 1}`"
        ></div>
      </div>
    </div>
  </div>
  <div class="card mb-5">
    <div class="card-body">
      <div
        class="grid grid-cols-1 gap-4"
        :class="
          hasTradingWallet || hasFundingWallet
            ? 'md:grid-cols-3'
            : 'md:grid-cols-2'
        "
      >
        <button
          type="button"
          class="btn border-l-4 border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 w-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="showModal('deposit')"
        >
          <i class="bi bi-journal-arrow-down"></i> {{ $t("Deposit") }}
        </button>
        <button
          type="button"
          class="btn border-l-4 border-red-600 text-red-600 dark:border-red-400 dark:text-red-400 w-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="showModal('withdraw')"
        >
          <i class="bi bi-journal-arrow-up"></i>
          {{ $t("Withdraw") }}
        </button>
        <button
          v-if="hasTradingWallet || hasFundingWallet"
          type="button"
          class="btn border-l-4 border-yellow-600 text-yellow-600 dark:border-yellow-400 dark:text-yellow-400 w-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700"
          @click="showModal('transfer')"
        >
          <i class="bi bi-send"></i>
          {{ $t("Transfer") }}
        </button>
      </div>
    </div>
  </div>

  <div>
    <div
      class="items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0 mb-5"
    >
      <div class="font-medium">{{ $t("Transactions") }}</div>
      <Filter>
        <input
          v-model="state.filters.txid.value"
          type="text"
          class="filter-input"
          placeholder="Transaction Hash"
      /></Filter>
    </div>
    <div class="card relative overflow-x-auto">
      <VTable
        :key="walletsStore.mianLogs.length"
        v-model:current-page="state.currentPage"
        class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        :data="logs"
        :filters="state.filters"
        :page-size="10"
        :hide-sort-icons="true"
        @totalPagesChanged="state.totalPages = $event"
      >
        <template #head>
          <tr
            class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <th sort-key="type" scope="col" class="py-3 px-6">
              {{ $t("Type") }}
            </th>
            <th sort-key="date" scope="col" class="py-3 px-6">
              {{ $t("Date") }}
            </th>
            <th sort-key="amount" scope="col" class="py-3 px-6">
              {{ $t("Amount") }}
            </th>
            <th sort-key="fee" scope="col" class="py-3 px-6">
              {{ $t("Fee") }}
            </th>
            <th sort-key="status" scope="col" class="py-3 px-6">
              {{ $t("Status") }}
            </th>
            <th scope="col" class="py-3 px-6">
              {{ "txHash" }}
            </th>
          </tr>
        </template>
        <template #body="{ rows }">
          <template v-if="logs.length > 0">
            <tr
              v-for="row in rows"
              :key="row.id"
              class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td
                data-label="Type"
                class="flex justify-start py-2 px-3 items-center"
              >
                <transaction-type-main
                  :type="parseInt(row.type)"
                ></transaction-type-main>
              </td>
              <td data-label="Date" class="py-2 px-3">
                <toDate :time="row.created_at" />
              </td>
              <td data-label="Amount" class="py-2 px-3">
                {{ parseFloat(row.amount) }}
                <span v-if="state.symbol">
                  {{ state.symbol }}
                </span>
              </td>
              <td data-label="Fee" class="py-2 px-3">
                {{ parseFloat(row.fee) }}
                <span v-if="state.symbol">
                  {{ state.symbol }}
                </span>
              </td>
              <td data-label="Status" class="py-2 px-3">
                <span v-if="row.status == 0" class="badge bg-warning">{{
                  $t("Pending")
                }}</span>
                <span v-else-if="row.status == 1" class="badge bg-success">{{
                  $t("Confirmed")
                }}</span>
                <span v-else-if="row.status == 2" class="badge bg-danger">{{
                  $t("Failed")
                }}</span>
              </td>
              <td
                v-if="row.type <= 2"
                data-label="Transaction"
                class="py-2 px-3"
              >
                <a
                  v-if="row.chain == 'ETH'"
                  :href="'https://etherscan.io/tx/' + row.txid"
                  class="btn btn-outline-info btn-sm"
                  target="_blank"
                  >{{ $t("View") }}</a
                >
                <a
                  v-else-if="row.chain == 'BSC'"
                  :href="'https://bscscan.com/tx/' + row.txid"
                  class="btn btn-outline-info btn-sm"
                  target="_blank"
                  >{{ $t("View") }}</a
                >
                <a
                  v-else-if="row.chain == 'TRON'"
                  :href="'https://tronscan.org/#/transaction/' + row.txid"
                  class="btn btn-outline-info btn-sm"
                  target="_blank"
                  >{{ $t("View") }}</a
                >
                <a
                  v-else-if="row.chain == 'MATIC'"
                  :href="'https://polygonscan.com/tx/' + row.txid"
                  class="btn btn-outline-info btn-sm"
                  target="_blank"
                  >{{ $t("View") }}</a
                >
                <a
                  v-else-if="row.chain == 'KLAY'"
                  :href="'https://scope.klaytn.com/tx/' + row.txid"
                  class="btn btn-outline-info btn-sm"
                  target="_blank"
                  >{{ $t("View") }}</a
                >
                <a
                  v-else-if="row.chain == 'CELO'"
                  :href="'https://celoscan.io/tx/' + row.txid"
                  class="btn btn-outline-info btn-sm"
                  target="_blank"
                  >{{ $t("View") }}</a
                >
                <a
                  v-else-if="row.chain == 'BTC'"
                  :href="
                    'https://blockchair.com/bitcoin/transaction/' + row.txid
                  "
                  class="btn btn-outline-info btn-sm"
                  target="_blank"
                  >{{ $t("View") }}</a
                >
                <a
                  v-else-if="row.chain == 'DOGE'"
                  :href="
                    'https://blockchair.com/dogecoin/transaction/' + row.txid
                  "
                  class="btn btn-outline-info btn-sm"
                  target="_blank"
                  >{{ $t("View") }}</a
                >
                <a
                  v-else-if="row.chain == 'LTC'"
                  :href="
                    'https://blockchair.com/litecoin/transaction/' + row.txid
                  "
                  class="btn btn-outline-info btn-sm"
                  target="_blank"
                  >{{ $t("View") }}</a
                >
                <a
                  v-else-if="row.chain == 'SOL'"
                  :href="'https://solscan.io/tx/' + row.txid"
                  class="btn btn-outline-info btn-sm"
                  target="_blank"
                  >{{ $t("View") }}</a
                >
              </td>
              <td
                v-else
                data-label="Transaction"
                class="py-2 px-3 whitespace-nowrap"
              >
                <span class="badge bg-dark">{{
                  $t("Internal Transaction")
                }}</span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              scope="row"
              class="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
            >
              <td colspan="100%" class="py-4 px-6">
                {{ $t("No transaction found!") }}
              </td>
            </tr>
          </template>
        </template>
      </VTable>
    </div>

    <VTPagination
      v-model:currentPage="state.currentPage"
      class="float-right flex items-center justify-between pt-4"
      aria-label="Table navigation"
      :total-pages="state.totalPages"
      :max-page-links="3"
      :boundary-links="true"
    >
      <template #firstPage> {{ $t("First") }} </template>

      <template #lastPage> {{ $t("Last") }} </template>

      <template #next
        ><span class="sr-only">{{ $t("Next") }}</span>
        <svg
          class="h-5 w-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </template>

      <template #previous>
        <span class="sr-only">{{ $t("Previous") }}</span>
        <svg
          class="h-5 w-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </template>
    </VTPagination>
  </div>

  <transition
    name="modal"
    mode="out-in"
    enter-active-class="modal-enter-active"
    leave-active-class="modal-leave-active"
  >
    <Modal
      v-if="state.isShowModal.deposit"
      size="2xl"
      @close="closeModal('deposit')"
    >
      <template #header>
        <div class="flex items-center text-lg">
          {{ $t("Select Deposit Network") }}
        </div>
      </template>
      <template #body>
        <div style="margin: -24px !important;">
          <div class="bg-gray-200 dark:bg-gray-900">
            <ul
              class="-mb-px flex flex-wrap text-sm font-medium"
              role="tablist"
            >
              <li
                v-for="(wallet, key, index) in walletsStore.addresses"
                :key="index"
                class="mr-2"
                :class="
                  state.tab.deposit != null
                    ? key == state.tab.deposit
                      ? 'bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-500'
                      : ''
                    : index == 0
                    ? 'bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-500'
                    : ''
                "
                @click="state.tab.deposit = key"
              >
                <button
                  class="inline-block rounded-t-lg p-4"
                  type="button"
                  role="tab"
                >
                  {{ key }}
                </button>
              </li>
            </ul>
          </div>
          <div>
            <div
              v-for="(wallet, key, index) in walletsStore.addresses"
              :key="index"
              class="dark:bg-gray-800"
              :class="
                state.tab.deposit != null
                  ? key == state.tab.deposit
                    ? ''
                    : 'hidden'
                  : index == 0
                  ? ''
                  : 'hidden'
              "
            >
              <div class="p-4">
                <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-3">
                  <div class="col-span-1">
                    <div>
                      <label class="form-control-label h6">To</label>
                    </div>
                    <vue-qrcode
                      :options="{ width: 150 }"
                      :value="wallet.address ? wallet.address : 'non'"
                    ></vue-qrcode>
                  </div>
                  <div class="space-y-3 xs:col-span-1 md:col-span-2">
                    <div>
                      <label
                        class="form-control-label h6"
                        for="recieving_address"
                      >
                        {{ $t("Wallet Address") }}</label
                      >
                      <input
                        ref="recieving_address"
                        class="form-control"
                        type="text"
                        :value="wallet.address ? wallet.address : ''"
                        readonly
                      />
                    </div>
                    <div
                      class="mt-1 flex justify-between border-b border-gray-200 dark:border-gray-600"
                    >
                      <span>{{ $t("Transfer Limit") }}</span>
                      <span>{{ $t("Unlimited") }}</span>
                    </div>
                    <template v-if="wallet.has_memo == 1">
                      <div
                        v-if="wallet.memo != '' || wallet.memo != null"
                        class="flex justify-between border-b border-gray-200 dark:border-gray-600"
                      >
                        <span>{{ $t("Memo") }}</span>
                        <span class="text-warning">{{
                          wallet.memo ? wallet.memo : ""
                        }}</span>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="mt-5">
                  {{ $t("This is a") }}
                  <span :ref="key" class="text-info">{{ key }}</span>
                  {{
                    $t(
                      "Chain address. Do not send any other Chain to this address or your funds may be lost."
                    )
                  }}.
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </transition>

  <transition
    name="modal"
    mode="out-in"
    enter-active-class="modal-enter-active"
    leave-active-class="modal-leave-active"
  >
    <Modal
      v-if="state.isShowModal.withdraw"
      size="2xl"
      @close="closeModal('withdraw')"
    >
      <template #header>
        <div class="flex items-center text-lg">
          {{ $t("Select Withdraw Network") }}
        </div>
      </template>
      <template #body>
        <div style="margin: -24px !important;">
          <div class="bg-gray-200 dark:bg-gray-900">
            <ul class="-mb-px flex flex-wrap text-sm font-medium">
              <li
                v-for="(wallet, key, index) in walletsStore.addresses"
                :key="index"
                class="mr-2"
                :class="
                  state.tab.withdraw != null
                    ? key == state.tab.withdraw
                      ? 'bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-500'
                      : ''
                    : index == 0
                    ? 'bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-500'
                    : ''
                "
                @click="state.tab.withdraw = key"
              >
                <button
                  class="inline-block rounded-t-lg p-4"
                  type="button"
                  role="tab"
                >
                  {{ key }}
                </button>
              </li>
            </ul>
          </div>
          <div>
            <div
              v-for="(wallet, key, index) in walletsStore.addresses"
              :key="index"
              class="dark:bg-gray-800"
              :class="
                state.tab.withdraw != null
                  ? key == state.tab.withdraw
                    ? ''
                    : 'hidden'
                  : index == 0
                  ? ''
                  : 'hidden'
              "
            >
              <form @submit.prevent="Withdraw(key)">
                <div class="space-y-3 p-4">
                  <div>
                    <label class="form-control-label h6" for="wallet_balance">{{
                      $t("Wallet Balance")
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="wallet.balance + ' ' + state.symbol"
                      readonly
                    />
                  </div>
                  <div>
                    <label for="withdraw_address">{{
                      $t("Wallet Address")
                    }}</label>
                    <input
                      v-model="state.withdraw_address"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="my-1">
                    <div>
                      <label for="amount">{{ $t("Amount") }}</label>
                      <input
                        v-model="state.withdraw_amount"
                        type="number"
                        class="form-control"
                        :min="wallet.withdraw_min"
                        :step="wallet.withdraw_min"
                        :max="wallet.withdraw_max"
                      />
                    </div>
                    <small
                      >{{ $t("Min") }}:
                      <span class="text-warning">
                        {{ parseFloat(wallet.withdraw_min) }}</span
                      >
                      / {{ $t("Max") }}:
                      <span class="text-warning">
                        {{ parseFloat(wallet.withdraw_max) }}</span
                      >
                    </small>
                  </div>
                  <div v-if="wallet.has_memo == 1" class="my-1">
                    <div>
                      <label for="memo">{{ $t("Memo") }}</label>
                      <input
                        v-model="state.withdraw_memo"
                        type="text"
                        class="form-control"
                      />
                    </div>
                    >
                  </div>
                  <div>
                    <label for="fees">{{ $t("Fees") }}</label>
                    <input
                      type="text"
                      class="form-control"
                      :value="calculateFee(wallet)"
                      disabled
                    />
                  </div>
                  <small v-if="['BTC', 'LTC', 'DOGE'].includes(wallet.chain)"
                    >{{ $t("Min") }}:
                    <span class="text-warning"> {{ minFee(wallet) }}</span>
                  </small>
                </div>
                <div class="modal-footer mt-5">
                  <div class="flex justify-end">
                    <button
                      type="submit"
                      class="btn btn-outline-success mr-3"
                      :disabled="state.loading"
                    >
                      {{ $t("Withdraw") }}
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="closeModal('withdraw')"
                    >
                      {{ $t("Close") }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </transition>

  <transition
    name="modal"
    mode="out-in"
    enter-active-class="modal-enter-active"
    leave-active-class="modal-leave-active"
  >
    <Modal
      v-if="state.isShowModal.transfer"
      size="3xl"
      @close="closeModal('transfer')"
    >
      <template #header>
        <div class="flex items-center text-lg">
          {{ $t("Transfer Funds") }}
        </div>
      </template>
      <template #body>
        <div v-if="!state.showTransferDetails">
          <div
            v-if="hasTradingWallet && hasFundingWallet"
            class="grid grid-cols-1 gap-5"
          >
            <button
              class="btn btn-outline-warning flex justify-start"
              @click="
                state.transferMode = 'funding';
                state.showTransferDetails = true;
              "
            >
              <i class="bi bi-chevron-right"></i>
              <span>{{
                $t("Transfer to") +
                " " +
                state.symbol +
                " " +
                $t("Funding Wallet")
              }}</span>
            </button>
            <button
              class="btn btn-outline-primary"
              @click="
                state.transferMode = 'trading';
                state.showTransferDetails = true;
              "
            >
              <i class="bi bi-chevron-right"></i>
              {{
                $t("Transfer to") +
                " " +
                state.symbol +
                " " +
                $t("Trading Wallet")
              }}
            </button>
          </div>
          <div v-else-if="hasTradingWallet" class="flex justify-center">
            <button
              class="btn btn-outline-primary"
              @click="
                state.transferMode = 'trading';
                state.showTransferDetails = true;
              "
            >
              <i class="bi bi-chevron-right"></i>
              {{
                $t("Transfer to") +
                " " +
                state.symbol +
                " " +
                $t("Trading Wallet")
              }}
            </button>
          </div>
          <div v-else-if="hasFundingWallet" class="flex justify-center">
            <button
              class="btn btn-outline-warning"
              @click="
                state.transferMode = 'funding';
                state.showTransferDetails = true;
              "
            >
              <i class="bi bi-chevron-right"></i>
              {{
                $t("Transfer to") +
                " " +
                state.symbol +
                " " +
                $t("Funding Wallet")
              }}
            </button>
          </div>
        </div>
        <div v-if="state.transferMode" class="space-y-5">
          <div>
            <select
              id="chain"
              v-model="state.transfer_chain"
              name="chain"
              class="form-control w-full"
              required
            >
              <option
                v-for="(wallet, key, index) in walletsStore.addresses"
                :key="index"
                :value="key"
                >{{ key }}</option
              >
            </select>
          </div>
          <div>
            <label for="transfer_amount">{{ $t("Amount") }}</label>
            <input
              v-model="state.transfer_amount"
              type="number"
              class="form-control"
              min="0"
              :max="totalBalance"
              step="0.000001"
              required
            />
          </div>
          <div class="flex items-center justify-between">
            <div
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full"
            >
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t("Balance") }}:
              </div>
              <div class="text-base dark:text-white">
                {{ Number(totalBalance).toFixed(6) }} (<span
                  class="text-danger"
                  >{{ currentBalanceChange }}</span
                >)
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-16 h-16 mx-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            <div
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 w-full"
            >
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t("Target Wallet Balance") }}:
              </div>
              <div class="text-base dark:text-white">
                {{ targetWalletBalance() }} (<span class="text-success">{{
                  targetBalanceChange
                }}</span
                >)
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <button
            v-if="state.showTransferDetails"
            type="button"
            class="btn btn-outline-success"
            :disabled="state.loading"
            @click="transferFunds()"
          >
            {{ $t("Transfer") }}
          </button>
          <button
            v-if="state.showTransferDetails"
            type="button"
            class="btn btn-outline-secondary"
            @click="
              state.showTransferDetails = false;
              state.transferMode = '';
            "
          >
            <i class="bi bi-chevron-left"></i>
            {{ $t("Back") }}
          </button>
          <button
            v-else
            type="button"
            class="btn btn-outline-secondary"
            @click="closeModal('transfer')"
          >
            {{ $t("Close") }}
          </button>
        </div>
      </template>
    </Modal>
  </transition>
</template>

<script>
  import { Modal } from "flowbite-vue";
  import Filter from "@/partials/table/Filter.vue";
  import Col from "@/partials/table/Col.vue";
  import { useRouter } from "vue-router";
  import toMoney from "@/partials/toMoney.vue";
  import toDate from "@/partials/toDate.vue";
  import { useWalletsStore } from "@/store/wallets";
  import { useRoute } from "vue-router";
  import TransactionTypeMain from "./partials/TransactionTypeMain.vue";
  import {
    ref,
    watch,
    onBeforeMount,
    computed,
    reactive,
    onMounted,
  } from "vue";
  export default {
    components: { Modal, Filter, Col, toMoney, toDate, TransactionTypeMain },

    setup() {
      const router = useRouter();
      const route = useRoute();
      const walletsStore = useWalletsStore();

      const hasTradingWallet = ref(false);
      const hasFundingWallet = ref(false);

      async function checkWalletTypes() {
        if (walletsStore.currencies.length == 0) {
          try {
            await walletsStore.fetch();
          } catch (error) {
            console.log(error);
          }
        }

        if (walletsStore.currencies) {
          state.currency = walletsStore.currencies.find(
            (currency) => currency.symbol == route.params.symbol
          );
        }

        if (state.currency) {
          hasTradingWallet.value = !!state.currency.tradingWallet;
          hasFundingWallet.value = !!state.currency.fundingWallet;
        }
      }

      async function getWallet() {
        await walletsStore.fetchMainWallet(
          route.params.symbol,
          route.params.address
        );
        if (walletsStore.addresses) {
          state.transfer_chain = Object.keys(walletsStore.addresses)[0];
        }
      }

      onBeforeMount(() => {
        getWallet();
        checkWalletTypes();
      });

      watch(route, () => {
        walletsStore.wallet = [];
        walletsStore.wallet_trx = [];
        walletsStore.addresses = {};
        walletsStore.mianLogs = [];
        checkWalletTypes();
      });

      const startTimer = () => {
        setTimeout(() => {
          walletsStore.fetchMainWalletLogs(
            route.params.symbol,
            route.params.address
          );
        }, 3000);

        walletsStore.timer[route.params.address] = setInterval(() => {
          walletsStore.fetchMainWalletLogs(
            route.params.symbol,
            route.params.address
          );
        }, 20000);
      };

      startTimer();

      router.afterEach((to, from) => {
        clearInterval(walletsStore.timer[from.params.address]);
      });

      const state = reactive({
        type: route.params.type,
        symbol: route.params.symbol,
        address: route.params.address,
        gnl: gnl,
        loading: false,
        api: 1,
        pathname: "main",
        plat: plat,
        network: null,
        withdraw_address: null,
        withdraw_amount: null,
        filters: {
          txid: { value: "", keys: ["txid"] },
        },
        currentPage: 1,
        totalPages: 0,
        tab: {
          deposit: null,
          withdraw: null,
        },
        isShowModal: {
          deposit: false,
          withdraw: false,
          transfer: false,
        },
        transferMode: null,
        transfer_amount: 0,
        currency: null,
        transfer_chain: null,
      });

      const logs = computed(() => {
        let logs = walletsStore.mianLogs;
        return logs.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
      });

      const totalBalance = computed(() => {
        let total = 0;
        Object.values(walletsStore.addresses).forEach((wallet) => {
          total += parseFloat(wallet.balance);
        });
        return total;
      });

      function calculateFee(wallet) {
        let fee = state.withdraw_amount * (wallet.withdraw_fee / 100);
        if (wallet.chain === "BTC" && parseFloat(fee) < 0.00002) {
          fee = 0.00002;
        } else if (wallet.chain === "DOGE" && parseFloat(fee) < 2) {
          fee = 2;
        } else if (wallet.chain === "LTC" && parseFloat(fee) < 0.0002) {
          fee = 0.0002;
        }
        return parseFloat(fee) + " " + state.symbol;
      }
      function minFee(wallet) {
        if (wallet.chain === "BTC") {
          return 0.00002 + " " + state.symbol;
        } else if (wallet.chain === "DOGE") {
          return 2 + " " + state.symbol;
        } else if (wallet.chain === "LTC") {
          return 0.0002 + " " + state.symbol;
        }
      }

      function onImageError(event) {
        event.target.src = "/assets/no-image.png";
      }

      function Withdraw(chain) {
        if (state.withdraw_amount <= 0) {
          $toast.error("Invalid amount");
        } else {
          state.loading = true;
          axios
            .post("/user/eco/wallet/withdraw", {
              chain: chain,
              symbol: state.symbol,
              withdraw_address: state.withdraw_address,
              memo: state.withdraw_memo,
              amount: state.withdraw_amount,
            })
            .then((response) => {
              $toast[response.type](response.message);
            })
            .catch((error) => {
              $toast.error(error.response.data.message);
            })
            .finally(() => {
              walletsStore.fetchMainWallet(state.symbol, state.address);
              state.loading = false;
              closeModal("withdraw");
            });
        }
      }

      function closeModal(type) {
        if (type == "deposit") {
          state.isShowModal.deposit = false;
        } else if (type == "withdraw") {
          state.isShowModal.withdraw = false;
        } else if (type == "transfer") {
          state.isShowModal.transfer = false;
        }
      }

      function showModal(type) {
        if (type == "deposit") {
          state.isShowModal.deposit = true;
        } else if (type == "withdraw") {
          state.isShowModal.withdraw = true;
        } else if (type == "transfer") {
          state.isShowModal.transfer = true;
        }
      }

      function transferFunds() {
        if (state.transfer_amount <= 0) {
          $toast.error("Invalid amount");
        } else if (state.transfer_amount > totalBalance.value) {
          $toast.error("Invalid amount");
        } else {
          state.loading = true;
          axios
            .post("/user/eco/wallet/transfer/funds", {
              currency: state.symbol,
              chain: state.transfer_chain,
              target_wallet: state.transferMode,
              amount: state.transfer_amount.toString(),
            })
            .then((response) => {
              $toast[response.type](response.message);
            })
            .catch((error) => {
              $toast.error(error.response.data.message);
            })
            .finally(() => {
              walletsStore.fetchMainWallet(state.symbol, state.address);
              walletsStore.fetch();
              state.currency = walletsStore.currencies.find(
                (currency) => currency.symbol == route.params.symbol
              );
              state.loading = false;
              closeModal("transfer");
            });
        }
      }

      const currentBalanceChange = computed(() => {
        if (state.transfer_amount > 0) {
          return (
            Number(totalBalance.value) - Number(state.transfer_amount)
          ).toFixed(6);
        }
        return 0;
      });

      const targetBalanceChange = computed(() => {
        const targetWalletBalance =
          state.transferMode === "trading"
            ? Number(state.currency.tradingWallet.balance)
            : Number(state.currency.fundingWallet.balance);

        if (state.transfer_amount > 0) {
          return (targetWalletBalance + Number(state.transfer_amount)).toFixed(
            6
          );
        }
        return 0;
      });

      function targetWalletBalance() {
        const targetWalletBalance =
          state.transferMode === "trading"
            ? Number(state.currency.tradingWallet.balance)
            : Number(state.currency.fundingWallet.balance);

        return targetWalletBalance.toFixed(6);
      }

      return {
        walletsStore,
        hasTradingWallet,
        hasFundingWallet,
        checkWalletTypes,
        state,
        logs,
        totalBalance,
        calculateFee,
        minFee,
        onImageError,
        Withdraw,
        closeModal,
        showModal,
        transferFunds,
        currentBalanceChange,
        targetBalanceChange,
        targetWalletBalance,
      };
    },
  };
</script>
