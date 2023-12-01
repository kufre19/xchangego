<template>
  <div>
    <div class="my-2 text-end">
      <router-link to="/support" class="btn btn-outline-secondary"
        ><i class="bi bi-chevron-left"></i> {{ $t("Back") }}</router-link
      >
    </div>
    <div class="card">
      <form
        class="message__chatbox__form row"
        enctype="multipart/form-data"
        @submit.prevent="submitForm"
      >
        <div class="card-body space-y-5">
          <div class="grid gap-5 xs:grid-cols-1 md:grid-cols-2">
            <div class="">
              <label for="name" class="label">{{ $t("Name") }}</label>
              <input
                id="name"
                type="text"
                name="name"
                class="form-control"
                :value="userName"
              />
            </div>
            <div class="">
              <label for="email" class="label">{{ $t("Email") }}</label>
              <input
                id="email"
                type="text"
                name="email"
                class="form-control"
                :value="userEmail"
                readonly
              />
            </div>
          </div>
          <div class="">
            <label for="subject" class="label">{{ $t("Subject") }}</label>
            <input
              id="subject"
              v-model="subject"
              type="text"
              name="subject"
              class="form-control"
              :placeholder="$t('Enter Subject')"
              required
            />
          </div>
        </div>
        <div class="card-footer">
          <button type="submit" class="btn btn-primary">
            {{ $t("Next") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { useUserStore } from "../../store/user";
  import { getCurrentInstance, onMounted, ref } from "vue";
  import { useRouter } from "vue-router";

  export default {
    setup() {
      const instance = getCurrentInstance();
      const userStore = useUserStore();
      const router = useRouter();
      const userName = ref("");
      const userEmail = ref("");
      const subject = ref("");

      onMounted(async () => {
        if (!userStore.user) {
          await userStore.fetch();
        }
        userName.value =
          userStore.user.firstname + " " + userStore.user.lastname;
        userEmail.value = userStore.user.email;
      });

      const submitForm = async () => {
        await axios
          .post("/user/support/tickets", {
            name: userName.value,
            email: userEmail.value,
            subject: subject.value,
          })
          .then((response) => {
            instance.appContext.config.globalProperties.$toast[response.type](
              response.message
            );
            router.push(`/support/ticket/${response.id}`);
          })
          .catch((error) => {
            instance.appContext.config.globalProperties.$toast.error(
              error.response.data.message
            );
          });
      };

      return {
        userName,
        userEmail,
        subject,
        submitForm,
      };
    },
  };
</script>
