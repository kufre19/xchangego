<template>
  <section id="knowledge-base-question">
    <div class="xs: grid grid-cols-1 gap-5 md:grid-cols-3">
      <div class="card xs:col-span-1 md:col-span-2">
        <div class="card-header">
          <div class="card-title">
            <router-link
              class="text-dark mr-5 rounded-full border px-1 py-0.5 hover:bg-gray-300 dark:hover:bg-gray-600"
              to="/knowledge"
            >
              <i class="bi bi-chevron-left"></i
            ></router-link>
            <span>{{ article.title }}</span>
          </div>
        </div>
        <div class="card-body">
          <p class="mb-2">
            {{ $t("Published in") }}:
            <toDate v-if="article.created_at" :time="article.created_at" />
            <span v-else>N/A</span>
          </p>

          <img
            v-if="article.img != null"
            :src="'/assets/images/article/' + article.img"
            class="card-img-top"
            alt="knowledge-base-image"
          />
          <p class="mt-2">
            {{ article.full_text }}
          </p>
        </div>
      </div>
      <div class="col-span-1 space-y-5">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <div class="title-gradient">
                {{ $t("Categories") }}
              </div>
            </div>
          </div>
          <div class="card-body">
            <div v-if="article.category">
              <router-link
                class="text-dark"
                :to="
                  '/knowledge/categories/' +
                  article.category.slug +
                  '/' +
                  article.category.id
                "
              >
                <i class="bi bi-folder"></i>
                {{ article.category.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <div class="title-gradient">
                {{ $t("Tags") }}
              </div>
            </div>
          </div>
          <div class="card-body">
            <div v-if="article.tags" class="flex flex-wrap">
              <div v-for="(tag, index) in article.tags" :key="index">
                <router-link
                  :to="'/knowledge/tags/' + tag.slug + '/' + tag.id"
                  class="badge bg-info"
                  >{{ tag.name }}</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import toDate from "../../partials/toDate.vue";
  export default {
    components: { toDate },
    data() {
      return { article: [] };
    },

    watch: {
      async $route(to) {
        if (to.params.slug != null) {
          this.fetchArticle();
        }
      },
    },
    mounted() {
      this.fetchArticle();
    },
    methods: {
      fetchArticle() {
        axios
          .get(
            "/user/knowledge/articles/" +
              (this.$route.params.slug ? this.$route.params.slug + "/" : "") +
              this.$route.params.id
          )
          .then((response) => {
            this.article = response.article;
          })
          .catch((error) => {});
      },
    },
  };
</script>
