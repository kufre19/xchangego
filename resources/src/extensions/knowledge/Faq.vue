<template>
  <div>
    <section id="faq-search-filter">
      <div
        class="card faq-search bg-cover bg-center"
        :style="`background-image: url('/assets/images/banner/banner.png'); background-color: rgba(115, 103, 240, 0.12);`"
      >
        <div
          class="pt-5 pl-5 absolute top-0 left-0"
          style="position: absolute; top: 15px; left: 15px;"
        >
          <router-link
            class="text-dark mr-5 rounded-full border px-1 py-0.5 hover:bg-gray-300 dark:hover:bg-gray-600"
            to="/knowledge"
          >
            <i class="bi bi-chevron-left"></i
          ></router-link>
        </div>
        <div class="card-body text-center">
          <!-- main title -->
          <h2 class="text-primary text-2xl">
            {{ $t("Let's answer some questions") }}
          </h2>

          <!-- subtitle -->
          <p class="card-text mb-2">
            {{ $t("or choose a category to quickly find the help you need") }}
          </p>

          <!-- search input -->
          <form class="faq-search-input" @submit.prevent="search()">
            <div class="input-group">
              <input ref="search" type="text" placeholder="Search faq..." />
              <span>
                <i class="bi bi-search"></i>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!--/ Knowledge base Jumbotron -->

    <!-- Knowledge base -->
    <section id="faq-tabs">
      <div class="grid xs:grid-cols-1 md:grid-cols-4 gap-6 mt-10">
        <div class="col-span-1">
          <div class="faq-navigation flex flex-col justify-between">
            <ul class="nav nav-pills nav-left flex-col space-y-2">
              <li
                v-for="(faqs, index) in categories"
                :key="index"
                class="nav-item"
              >
                <a
                  :id="faqs.id"
                  class="nav-link"
                  :class="faqs.id == 1 ? 'active' : ''"
                  data-bs-toggle="pill"
                  :href="'#faq-category-' + faqs.id"
                  aria-expanded="true"
                  role="tab"
                >
                  <i data-feather="credit-card" class="font-medium-3 mr-1"></i>
                  <span class="fw-bold">{{ faqs.category }}</span>
                </a>
              </li>
            </ul>
            <img
              src="/assets/images/illustration/faq-illustrations.svg"
              class="img-fluid hidden md:block"
              alt="demand img"
            />
          </div>
        </div>
        <div class="xs:col-span-1 md:col-span-3">
          <div class="tab-content">
            <div
              v-for="(faqs, index) in categories"
              :id="'faq-category-' + faqs.id"
              :key="index"
              class="tab-pane"
              :class="faqs.id == 1 ? 'active' : ''"
              role="tabpanel"
              :aria-labelledby="faqs.category"
              aria-expanded="false"
            >
              <div class="flex items-center my-2">
                <div
                  class="bg-light-primary dark:bg-gray-800 text-primary dark:text-gray-200 p-2 rounded mr-3"
                >
                  <i class="font-medium-4 bi bi-info-lg"></i>
                </div>
                <div>
                  <h4 class="mb-0">{{ faqs.category }}</h4>
                </div>
              </div>

              <div
                v-for="(faq, indexx) in faqs.faq_questions"
                :id="'#faq-question-' + faq.id"
                :key="indexx"
                class="mt-2"
              >
                <div
                  class="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-md rounded-md"
                >
                  <div :id="faq.category_id + faq.id" class="cursor-pointer">
                    <button
                      class="w-full text-left px-4 py-2 focus:outline-none dark:text-gray-200 rounded-t-md"
                      @click="toggleAccordion(faq.id)"
                      :aria-expanded="openedAccordion === faq.id"
                    >
                      {{ faq.question }}
                      <i
                        class="bi float-right mt-1"
                        :class="
                          openedAccordion === faq.id
                            ? 'bi-chevron-down'
                            : 'bi-chevron-right'
                        "
                      ></i>
                    </button>
                  </div>

                  <div
                    :id="'faq-question-' + faq.id"
                    class="overflow-hidden text-dark dark:text-gray-200 px-4 py-2"
                    v-show="openedAccordion === faq.id"
                  >
                    {{ faq.answer }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="faq-contact text-center mt-5">
      <h2 class="text-3xl md:text-4xl mb-4">
        {{ $t("You still have a question") }}?
      </h2>
      <p class="text-lg mb-3">
        {{
          $t(
            "If you cannot find a question in our FAQ, you can always contact us. We will answer to you shortly!"
          )
        }}
      </p>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        categories: [],
        openedAccordion: null,
      };
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
      toggleAccordion(id) {
        this.openedAccordion = this.openedAccordion === id ? null : id;
      },
      fetchCategories() {
        axios
          .get("/user/knowledge/faq")
          .then((response) => {
            this.categories = response.categories;
          })
          .catch((error) => {});
      },
      search() {
        this.$router
          .push("/knowledge/faq/" + this.$refs.search.value)
          .catch((err) => {
            // Ignore the vuex err regarding  navigating to the page they are already on.
            if (
              err.name !== "NavigationDuplicated" &&
              !err.message.includes(
                "Avoided redundant navigation to current location"
              )
            ) {
              // But print any other errors to the console
              logError(err);
            }
          });
      },
    },
  };
</script>
<style scoped>
  .faq-search {
    background-size: cover;
    background-color: rgba(115, 103, 240, 0.12) !important;
  }
  .faq-search .faq-search-input .input-group:focus-within {
    box-shadow: none;
  }

  .faq-contact .faq-contact-card {
    background-color: rgba(186, 191, 199, 0.12);
  }

  @media (min-width: 992px) {
    .faq-search .card-body {
      padding: 8rem !important;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    .faq-search .card-body {
      padding: 6rem !important;
    }
  }
  @media (min-width: 768px) {
    .faq-search .faq-search-input .input-group {
      width: 576px;
      margin: 0 auto;
    }
    .faq-navigation {
      height: 550px;
    }
  }
</style>
