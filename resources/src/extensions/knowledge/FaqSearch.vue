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
    <section id="faq-tabs" class="mt-5">
      <!-- vertical tab pill -->
      <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <div class="col-span-1 xs:hidden md:block">
          <div
            class="faq-navigation flex-column mb-md-0 mb-2 flex justify-between"
          >
            <!-- FAQ image -->
            <img
              src="/assets/images/illustration/faq-illustrations.svg"
              class="img-fluid"
              alt="demand img"
            />
          </div>
        </div>

        <div class="xs:col-span-1 md:col-span-2 lg:col-span-3">
          <template v-if="faqs != ''">
            <div
              v-for="(faq, index) in faqs"
              :id="'#faq-question-' + faq.id"
              :key="index"
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
          </template>

          <div v-else class="text-muted text-center" colspan="100%">
            <img
              height="128px"
              width="128px"
              src="https://assets.staticimg.com/pro/2.0.4/images/empty.svg"
              alt=""
            />
            <p class="text-dark text-lg">
              {{ $t("No Data Found") }}
            </p>

            <section class="faq-contact">
              <div class="row pt-75 mt-5">
                <div class="col-12 text-center">
                  <h2>{{ $t("You still have a question") }}?</h2>
                  <p class="mb-3">
                    {{
                      $t(
                        "If you cannot find a question in our FAQ, you can always contact us. We will answer to you shortly!"
                      )
                    }}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
    <!-- / frequently asked questions tabs pills -->

    <!-- contact us -->
    <section v-if="faqs != ''" class="faq-contact">
      <div class="row pt-75 mt-5">
        <div class="col-12 text-center">
          <h2>{{ $t("You still have a question") }}?</h2>
          <p class="mb-3">
            {{
              $t(
                "If you cannot find a question in our FAQ, you can always contact us. We will answer to you shortly!"
              )
            }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        faqs: [],
        openedAccordion: null,
      };
    },

    watch: {
      async $route(from, to) {
        if (
          to.params.search != from.params.search &&
          to.params.search != null
        ) {
          this.fetchCategories();
        }
      },
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
      toggleAccordion(id) {
        if (this.openedAccordion === id) {
          this.openedAccordion = null;
        } else {
          this.openedAccordion = id;
        }
      },
      fetchCategories() {
        axios
          .get("/user/knowledge/faq/" + this.$route.params.search)
          .then((response) => {
            this.faqs = response.faqs;
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
