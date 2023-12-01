<template>
  <div>
    <section id="knowledge-base-search">
      <div
        class="card knowledge-base-bg mb-5 bg-cover bg-center text-center"
        :style="`background-image: url('/assets/images/banner/banner.png'); background-color: rgba(115, 103, 240, 0.12);`"
      >
        <div class="card-body">
          <h2 class="text-primary mb-5 text-2xl">
            {{ $t("Dedicated Knowledge Base") }}
          </h2>
          <form class="kb-search-input" @submit.prevent="search()">
            <div class="input-group">
              <input ref="search" type="text" placeholder="Ask a question..." />
              <span>
                <i class="bi bi-search"></i>
              </span>
            </div>
          </form>
          <p class="mt-2">
            {{ $t("Or click") }}
            <router-link class="text-info" to="/knowledge/faq"
              >{{ $t("FAQs") }}</router-link
            >
            {{ $t("to find all answers you looking for") }}!
          </p>
        </div>
      </div>
    </section>
    <!--/ Knowledge base Jumbotron -->

    <!-- Knowledge base -->
    <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-3">
      <div class="xs:col-span-1 md:col-span-2">
        <section id="knowledge-base-category">
          <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-2">
            <template v-if="knowledgeStore.isLoading">
              <div class="card">
                <div class="card-body">
                  <h6
                    class="mb-2 flex items-center justify-between border-b border-gray-300 p-1 dark:border-gray-600"
                  >
                    <div class="skeleton h-4 w-1/2 rounded"></div>
                    <div class="skeleton h-4 w-1/4 rounded"></div>
                  </h6>

                  <div
                    v-for="n in 5"
                    :key="n"
                    class="skeleton mb-2 h-4 w-full rounded"
                  ></div>
                </div>
              </div>
            </template>

            <template v-else>
              <template v-if="knowledgeStore.categories != null">
                <template
                  v-for="(category, index) in knowledgeStore.categories"
                >
                  <template v-if="category.articles_count != 0">
                    <!-- account setting card -->
                    <div :key="index" class="card">
                      <div class="card-body">
                        <!-- account setting header -->
                        <h6
                          class="mb-2 flex items-center justify-between border-b border-gray-300 p-1 dark:border-gray-600"
                        >
                          <router-link
                            class="text-info"
                            :to="
                              '/knowledge/categories/' +
                              category.slug +
                              '/' +
                              category.id
                            "
                            >{{ category.name }}</router-link
                          >
                          <span class="text-warning"
                            >({{ category.articles_count }})</span
                          >
                        </h6>

                        <div class="list-disc">
                          <li
                            v-for="(article, index) in category.articles"
                            :key="index"
                          >
                            <router-link
                              class="text-dark"
                              :to="
                                '/knowledge/articles/' +
                                article.slug +
                                '/' +
                                article.id
                              "
                              >{{ article.title }}</router-link
                            >
                          </li>
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
              </template>
              <!-- no result -->
              <template v-else>
                <div class="no-result no-items text-center">
                  <h4 class="mt-4">
                    {{ $t("Search result not found!") }}
                  </h4>
                </div>
              </template>
            </template>
          </div>
        </section>
      </div>

      <div class="col-span-1">
        <div class="card mb-5">
          <div class="card-header">
            <div class="card-title">
              <div class="title-gradient">
                {{ $t("Need more Support") }}
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="support-container">
              {{
                $t("If you cannot find an answer in the knowledgebase, you can")
              }}
              <router-link to="/support" class="text-info">{{
                $t("contact us")
              }}</router-link>
              {{ $t("for further help.") }}
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <div class="title-gradient">
                {{ $t("Popular Articles") }}
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="list-disc">
              <li
                v-for="(article, index) in knowledgeStore.popularArticles"
                :key="index"
              >
                <router-link
                  class="text-dark"
                  :to="'/knowledge/articles/' + article.slug + '/' + article.id"
                >
                  {{ article.title }}</router-link
                >
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useKnowledgeStore } from "../../store/knowledge";
  export default {
    // component list
    components: {},
    setup() {
      const knowledgeStore = useKnowledgeStore();
      return { knowledgeStore };
    },
    created() {
      document.addEventListener("DOMContentLoaded", function () {
        "use strict";
        var searchbar = document.getElementById("searchbar"),
          search_content = document.querySelectorAll(
            ".kb-search-content-info .kb-search-content"
          ),
          no_result = document.querySelector(
            ".kb-search-content-info .no-result"
          );

        // Filter for knowledge base and category page
        searchbar.addEventListener("keyup", function () {
          var value = this.value.toLowerCase();
          if (value != "") {
            search_content.forEach(function (element) {
              element.style.display =
                element.textContent.toLowerCase().indexOf(value) > -1
                  ? ""
                  : "none";
            });
            var search_row = Array.from(search_content).filter(function (
              element
            ) {
              return element.style.display !== "none";
            }).length;

            //Check if search-content has row or not
            if (search_row == 0) {
              no_result.classList.remove("no-items");
            } else {
              if (!no_result.classList.contains("no-items")) {
                no_result.classList.add("no-items");
              }
            }
          } else {
            // If filter box is empty
            search_content.forEach(function (element) {
              element.style.display = "";
            });
          }
        });
      });
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
        if (this.knowledgeStore.categories.length == 0) {
          await this.knowledgeStore.fetch();
        }
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
  .knowledge-base-bg {
    background-size: cover;
    background-color: rgba(115, 103, 240, 0.12) !important;
  }
  .knowledge-base-bg .kb-search-input .input-group:focus-within {
    box-shadow: none;
  }

  .kb-search-content-info .kb-search-content .card-img-top {
    background-color: #fcfcfc;
  }
  .kb-search-content-info .no-result.no-items {
    display: none;
  }

  .kb-title {
    display: flex;
    justify-items: center;
    justify: space-around;
  }

  @media (min-width: 768px) {
    .knowledge-base-bg .kb-search-input .input-group {
      width: 576px;
      margin: 0 auto;
    }
  }
  @media (min-width: 992px) {
    .knowledge-base-bg .card-body {
      padding: 8rem;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    .knowledge-base-bg .card-body {
      padding: 6rem;
    }
  }
</style>
