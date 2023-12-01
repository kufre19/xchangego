<template>
  <div>
    <div
      class="mb-4 items-center justify-between xs:block xs:space-y-5 sm:flex sm:space-y-0"
    >
      <h2 class="if-sm text-lg font-medium">
        {{ $t("My Payment Methods") }}
      </h2>
      <div class="grid xs:grid-cols-1 md:grid-cols-2">
        <button
          class="btn btn-outline-primary mr-2 mt-1"
          @click="showAddMethodModal = true"
        >
          <i class="bi bi-plus-lg"></i>
          {{ $t("Create Payment Method") }}
        </button>
        <Filter>
          <input
            v-model="filters.name.value"
            type="text"
            class="filter-input"
            placeholder="Method Name"
          />
        </Filter>
      </div>
    </div>

    <div class="card relative overflow-x-auto">
      <VTable
        :key="paymentMethods.length"
        v-model:current-page="currentPage"
        class="w-full text-left text-sm text-gray-500 dark:text-gray-400"
        :data="paymentMethods"
        :filters="filters"
        :page-size="10"
        :hide-sort-icons="true"
        @totalPagesChanged="totalPages = $event"
      >
        <template #head>
          <tr
            class="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <VTh scope="col" sort-key="name" class="py-3 px-6">
              <Col text="Name" />
            </VTh>
            <VTh scope="col" sort-key="description" class="py-3 px-6">
              <Col text="Description" />
            </VTh>
            <VTh scope="col" sort-key="fiat" class="py-3 px-6">
              <Col text="Fiat" />
            </VTh>
            <VTh scope="col" sort-key="status" class="py-3 px-6">
              <Col text="status" />
            </VTh>
            <th scope="col" class="py-3 px-6">
              {{ $t("Actions") }}
            </th>
          </tr>
        </template>
        <template #body="{ rows }">
          <tr
            v-for="row in rows"
            :key="row.id"
            class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <td data-label="Name" class="py-4 px-6">
              {{ row.name }}
            </td>
            <td data-label="Description" class="py-4 px-6">
              {{ row.description }}
            </td>
            <td data-label="Fiat" class="py-4 px-6">
              {{ row.fiat }}
            </td>
            <td data-label="Status" class="py-4 px-6">
              {{ row.status }}
            </td>
            <td data-label="Actions" class="py-4 px-6">
              <button
                class="mr-2 rounded-md bg-blue-500 px-2 py-1 text-white"
                @click="editPaymentMethod(row)"
              >
                {{ $t("Edit") }}
              </button>
              <button
                class="rounded-md bg-red-500 px-2 py-1 text-white"
                @click="deletePaymentMethod(row)"
              >
                {{ $t("Delete") }}
              </button>
            </td>
          </tr>
        </template>
      </VTable>
    </div>
    <VTPagination
      v-model:currentPage="currentPage"
      class="float-right flex items-center justify-between pt-4"
      aria-label="Table navigation"
      :total-pages="totalPages"
      :max-page-links="3"
      :boundary-links="true"
    >
      <template #firstPage> {{ $t("First") }} </template>

      <template #lastPage> {{ $t("Last") }} </template>

      <template #next>
        <span class="sr-only">{{ $t("Next") }}</span>
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

    <AddPaymentMethodModal
      :show-modal="showAddMethodModal"
      :fiat="fiat"
      @close="showAddMethodModal = false"
      @created="addPaymentMethod"
    />

    <EditPaymentMethodModal
      :show-modal="showEditMethodModal"
      :fiat="fiat"
      :method="selectedPaymentMethod"
      @close="showEditMethodModal = false"
    />
  </div>
</template>

<script>
  import AddPaymentMethodModal from "../modals/add-payment-method-modal.vue";
  import EditPaymentMethodModal from "../modals/edit-payment-method-modal.vue";
  import Filter from "../../../../partials/table/Filter.vue";
  import Col from "../../../../partials/table/Col.vue";

  export default {
    name: "SellerPaymentMethods",
    components: {
      AddPaymentMethodModal,
      EditPaymentMethodModal,
      Col,
      Filter,
    },
    props: {
      paymentMethods: {
        type: Object,
        required: true,
      },
      fiat: {
        type: Object,
        required: true,
      },
    },
    emits: ["created", "deleted"],
    data() {
      return {
        filters: {
          name: { value: "", keys: ["name"] },
        },
        currentPage: 1,
        totalPages: 0,
        showAddMethodModal: false,
        showEditMethodModal: false,
        selectedPaymentMethod: null,
      };
    },
    methods: {
      addPaymentMethod() {
        this.$emit("created");
        this.showAddMethodModal = false;
      },
      editPaymentMethod(paymentMethod) {
        this.selectedPaymentMethod = paymentMethod;
        this.showEditMethodModal = true;
      },
      async deletePaymentMethod(paymentMethod) {
        try {
          const response = await axios.delete(
            `/user/p2p/seller/payment-methods/${paymentMethod.id}`
          );
          this.$toast[response.type](response.message);
          if (response.status == "success") {
            this.$emit("deleted");
          }
        } catch (error) {
          console.log(error);
          if (error.response.status === 422) {
            const errors = error.response.data.errors;
            let errorMessage = "";
            Object.keys(errors).forEach((key) => {
              errorMessage += errors[key][0] + "\n";
            });
            this.$toast.error(errorMessage);
          } else {
            this.$toast.error(error.response.data.error);
          }
        }
      },
    },
  };
</script>

<style scoped>
  .card {
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
</style>
