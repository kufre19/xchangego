<template>
  <div>
    <div class="page-header page-header-kyc">
      <div class="row justify-center">
        <div class="lg:col-span-8 col-xl-7 text-center">
          <h2 class="page-title">{{ $t("Begin your ID-Verification") }}</h2>
          <p class="large">
            {{ $t("Verify your identity to start using your trade wallet.") }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="kyc-form-steps card max-w-3xl pt-2">
        <form
          v-if="kycStore.options !== null"
          class="validate-modern"
          method="POST"
          id="kyc_submit"
          enctype="multipart/form-data"
          @submit.prevent="submitKyc"
        >
          <div class="space-y-5">
            <!-- Step 1: Personal Details -->
            <div class="form-step form-step1" v-if="step_01 !== null">
              <div class="form-step-head card-innr">
                <div class="step-head">
                  <div class="step-number">01</div>
                  <div class="step-head-text">
                    <h4 class="text-warning">{{ "Personal Details" }}</h4>
                    <p>
                      {{
                        $t(
                          "Your basic personal information is required for identification purposes."
                        )
                      }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="px-5 pt-5">
                <div class="alert alert-warning">
                  <i class="bi bi-info-circle"></i>
                  {{
                    $t(
                      "Please type carefully and fill out the form with your personal details. You are not allowed to edit the details once you have submitted the application."
                    )
                  }}
                </div>
              </div>
              <div class="grid gap-5 grid-cols-2 p-5 mb-5" v-if="hasInfo">
                <!-- Form fields for Step 1: Personal Details -->
                <div v-if="hasFirstname">
                  <label
                    for="first-name"
                    :class="{
                      required: kycStore.options.kyc_firstname.req === 1,
                    }"
                    >{{ $t("First Name") }}</label
                  >
                  <input
                    :required="kycStore.options.kyc_firstname.req === 1"
                    class="form-control"
                    type="text"
                    id="first-name"
                    name="first_name"
                  />
                </div>

                <!-- Add more form fields for Step 1 -->
                <!-- Last Name -->
                <div v-if="hasLastname">
                  <label
                    for="last-name"
                    :class="{
                      required: kycStore.options.kyc_lastname.req === 1,
                    }"
                    >{{ $t("Last Name") }}</label
                  >
                  <input
                    :required="kycStore.options.kyc_lastname.req === 1"
                    class="form-control"
                    type="text"
                    id="last-name"
                    name="last_name"
                  />
                </div>

                <!-- Email Address -->
                <div v-if="hasEmail">
                  <label
                    for="email"
                    :class="{
                      required: kycStore.options.kyc_email.req === 1,
                    }"
                    >{{ $t("Email Address") }}</label
                  >
                  <input
                    :required="kycStore.options.kyc_email.req === 1"
                    class="form-control"
                    type="email"
                    id="email"
                    name="email"
                  />
                </div>

                <!-- Phone Number -->
                <div v-if="hasPhone">
                  <label
                    for="phone-number"
                    :class="{
                      required: kycStore.options.kyc_phone.req === 1,
                    }"
                    >{{ $t("Phone Number") }}</label
                  >
                  <input
                    :required="kycStore.options.kyc_phone.req === 1"
                    class="form-control"
                    type="text"
                    id="phone-number"
                    name="phone"
                  />
                </div>

                <!-- Date of Birth -->
                <div v-if="hasDob">
                  <label
                    for="date-of-birth"
                    :class="{
                      required: kycStore.options.kyc_dob.req === 1,
                    }"
                    >{{ $t("Date of Birth") }}</label
                  >
                  <input
                    :required="kycStore.options.kyc_dob.req === 1"
                    class="form-control datepicker"
                    type="date"
                    id="date-of-birth"
                    name="dob"
                  />
                </div>

                <!-- Gender -->
                <div v-if="hasGender">
                  <label
                    for="gender"
                    :class="{
                      required: kycStore.options.kyc_gender.req === 1,
                    }"
                    >{{ $t("Gender") }}</label
                  >
                  <select
                    :required="kycStore.options.kyc_gender.req === 1"
                    class="form-select"
                    name="gender"
                    id="gender"
                  >
                    <option value="">{{ $t("Select Gender") }}</option>
                    <option value="male">{{ $t("Male") }}</option>
                    <option value="female">{{ $t("Female") }}</option>
                    <option value="other">{{ $t("Other") }}</option>
                  </select>
                </div>
              </div>
              <div v-if="hasAddress">
                <h4 class="text-dark px-5">{{ $t("Your Address") }}</h4>
                <div class="grid gap-5 grid-cols-2 p-5 mb-5">
                  <!-- Country -->
                  <div v-if="hasCountry">
                    <label
                      for="country"
                      :class="{
                        required: kycStore.options.kyc_country.req === 1,
                      }"
                      >{{ $t("Country") }}</label
                    >
                    <select
                      :required="kycStore.options.kyc_country.req === 1"
                      class="form-select"
                      name="country"
                      id="country"
                      data-dd-class="search-on"
                    >
                      <option value="">{{ $t("Select Country") }}</option>
                      <option
                        v-for="country in kycStore.countries"
                        :key="country"
                        :value="country"
                        >{{ country }}</option
                      >
                    </select>
                  </div>

                  <!-- State -->
                  <div v-if="hasState">
                    <label
                      for="state"
                      :class="{
                        required: kycStore.options.kyc_state.req === 1,
                      }"
                      >{{ $t("State") }}</label
                    >
                    <input
                      :required="kycStore.options.kyc_state.req === 1"
                      class="form-control"
                      type="text"
                      id="state"
                      name="state"
                    />
                  </div>

                  <!-- City -->
                  <div v-if="hasCity">
                    <label
                      for="city"
                      :class="{
                        required: kycStore.options.kyc_city.req === 1,
                      }"
                      >{{ $t("City") }}</label
                    >
                    <input
                      :required="kycStore.options.kyc_city.req === 1"
                      class="form-control"
                      type="text"
                      id="city"
                      name="city"
                    />
                  </div>

                  <!-- Zip / Postal Code -->
                  <div v-if="hasZip">
                    <label
                      for="zip"
                      :class="{
                        required: kycStore.options.kyc_zip.req === 1,
                      }"
                      >{{ $t("Zip / Postal Code") }}</label
                    >
                    <input
                      :required="kycStore.options.kyc_zip.req === 1"
                      class="form-control"
                      type="text"
                      id="zip"
                      name="zip"
                    />
                  </div>

                  <!-- Address Line 1 -->
                  <div v-if="hasAddress1">
                    <label
                      for="address_1"
                      :class="{
                        required: kycStore.options.kyc_address1.req === 1,
                      }"
                      >{{ $t("Address Line 1") }}</label
                    >
                    <input
                      :required="kycStore.options.kyc_address1.req === 1"
                      class="form-control"
                      type="text"
                      id="address_1"
                      name="address_1"
                    />
                  </div>

                  <!-- Address Line 2 -->
                  <div v-if="hasAddress2">
                    <label
                      for="address_2"
                      :class="{
                        required: kycStore.options.kyc_address2.req === 1,
                      }"
                      >{{ $t("Address Line 2") }}</label
                    >
                    <input
                      :required="kycStore.options.kyc_address2.req === 1"
                      class="form-control"
                      type="text"
                      id="address_2"
                      name="address_2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Document Upload -->

            <div
              v-if="step_02 !== null"
              :key="step_02"
              class="form-step form-step2"
            >
              <div class="form-step-head card-innr">
                <div class="step-head">
                  <div class="step-number">{{ step_02 }}</div>
                  <div class="step-head-text">
                    <h4 class="text-warning">
                      {{ $t("Document Upload") }}
                    </h4>
                    <p>
                      {{
                        $t(
                          "To verify your identity, we ask you to upload high-quality scans or photos of your official identification documents issued by the government."
                        )
                      }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="form-step-fields card-innr">
                <div class="alert alert-warning">
                  <i class="bi bi-info-circle"></i>
                  {{
                    $t(
                      "In order to complete, please upload any of the following personal documents."
                    )
                  }}
                </div>
                <ul
                  class="document-list grid gap-3 xs:grid-cols-1 md:grid-cols-2 px-2"
                >
                  <template v-if="hasPassport">
                    <input
                      class="document-type"
                      type="radio"
                      name="documentType"
                      id="docType-passport"
                      data-title="Passport"
                      data-img="`/assets/images/vector-passport.png`"
                      :checked="docType === 'passport'"
                      @click="docType = 'passport'"
                    />
                    <label
                      :for="`docType-passport`"
                      :style="{
                        borderColor:
                          docType === 'passport' ? '#7668fe' : '#e6effb',
                      }"
                    >
                      <img
                        style="height: 36px;"
                        :src="`/assets/images/icon-passport.png`"
                        alt=""
                      />
                      <span
                        :style="{
                          color: docType === 'passport' ? '#495463' : '#758698',
                        }"
                        >{{ $t("Passport") }}</span
                      >
                    </label>
                  </template>
                  <template v-if="hasNationalId">
                    <input
                      class="document-type"
                      type="radio"
                      name="documentType"
                      id="docType-nidcard"
                      data-title="National ID"
                      data-img="/assets/images/vector-nidcard.png"
                      :checked="docType === 'nidcard'"
                      @click="docType = 'nidcard'"
                    />
                    <label
                      :for="`docType-nidcard`"
                      :style="{
                        borderColor:
                          docType === 'nidcard' ? '#7668fe' : '#e6effb',
                      }"
                    >
                      <img
                        style="height: 36px;"
                        src="/assets/images/icon-national-id.png"
                        alt=""
                      />
                      <span
                        :style="{
                          color: docType === 'nidcard' ? '#495463' : '#758698',
                        }"
                        >{{ $t("National ID") }}</span
                      >
                    </label>
                  </template>

                  <template v-if="hasDrivingLicense">
                    <input
                      class="document-type"
                      type="radio"
                      name="documentType"
                      id="docType-driving"
                      data-title="Driving License"
                      data-img="/assets/images/vector-driving.png"
                      :checked="docType === 'driving'"
                      @click="docType = 'driving'"
                    />
                    <label
                      :for="`docType-driving`"
                      :style="{
                        borderColor:
                          docType === 'driving' ? '#7668fe' : '#e6effb',
                      }"
                    >
                      <img
                        style="height: 36px;"
                        src="/assets/images/icon-license.png"
                        alt=""
                      />
                      <span
                        :style="{
                          color: docType === 'driving' ? '#495463' : '#758698',
                        }"
                        >{{ $t("Driving License") }}</span
                      >
                    </label>
                  </template>
                </ul>
                <div class="doc-upload-area" v-if="docType !== null">
                  <p class="text-dark font-bold">
                    {{
                      $t(
                        "To avoid delays with verification process, please double-check to ensure the below requirements are fully met:"
                      )
                    }}
                  </p>
                  <ul class="list-disc mb-5">
                    <li>
                      {{ $t("Chosen credential must not be expired.") }}
                    </li>
                    <li>
                      {{
                        $t(
                          "Document should be in good condition and clearly visible."
                        )
                      }}
                    </li>
                    <li>
                      {{
                        $t(
                          "There is no light glare or reflections on the card."
                        )
                      }}
                    </li>
                    <li>
                      {{
                        $t(
                          "File is at least 1 MB in size and has at least 300 dpi resolution."
                        )
                      }}
                    </li>
                  </ul>
                  <div
                    class="doc-upload doc-upload-d1 border-b border-gray-300 dark:border-gray-600 pb-5"
                  >
                    <h6 class="font-mid doc-type-title text-dark">
                      {{ $t("Upload Here Your") }} {{ docType }}
                      {{ $t("Copy") }}
                    </h6>
                    <div class="flex justify-between items-center">
                      <div class="col-sm-8">
                        <input
                          class="upload"
                          type="file"
                          id="document_one"
                          name="document_one"
                          required
                        />
                      </div>
                      <div class="xs:hidden sm:block">
                        <div class="mx-md-4">
                          <img
                            width="160"
                            class="_image"
                            :src="`/assets/images/vector-${docType}.png`"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="doc-upload doc-upload-d2 border-b border-gray-300 dark:border-gray-600 pb-5"
                    :class="docType === 'nidcard' ? '' : ' hidden'"
                  >
                    <h6 class="font-mid text-dark">
                      {{ $t("Upload Here Your National ID Back Side") }}
                    </h6>
                    <div class="flex justify-between items-center">
                      <div class="col-sm-8">
                        <input
                          class="upload"
                          type="file"
                          id="document_two"
                          name="document_two"
                        />
                      </div>
                      <div class="xs:hidden sm:block">
                        <div class="mx-md-4">
                          <img
                            width="160"
                            src="/assets/images/vector-id-back.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="doc-upload doc-upload-d3">
                    <h6 class="font-mid text-dark">
                      {{
                        $t(
                          "Upload a selfie as a Photo Proof while holding document in your hand"
                        )
                      }}
                    </h6>
                    <div class="flex justify-between items-center">
                      <div class="col-sm-8">
                        <input
                          class="upload"
                          type="file"
                          id="document_image_hand"
                          name="document_image_hand"
                          required
                        />
                      </div>
                      <div class="xs:hidden sm:block">
                        <div class="mx-md-4">
                          <img
                            width="160"
                            src="/assets/images/vector-hand.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3: Extra Informations -->
            <div
              v-if="step_03 !== null"
              :key="step_03"
              class="form-step form-step3"
            >
              <div class="form-step-head card-innr">
                <div class="step-head">
                  <div class="step-number">03</div>
                  <div class="step-head-text">
                    <h4 class="text-dark">{{ $t("Extra Informations") }}</h4>
                    <p>
                      {{
                        $t(
                          "We require extra essential information to get to know you better"
                        )
                      }}
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="form-step-fields card-innr addedField grid xs:grid-cols-1 md:grid-cols-2 gap-3 mb-5"
              >
                <template
                  v-for="(item, key, index) in kycStore.options.extra_field"
                >
                  <template v-if="item.level == level">
                    <div v-if="item.type == 'text'">
                      <label class="label mt-1"
                        ><strong
                          >{{ item.field_level }}
                          <span
                            class="text-danger"
                            v-if="item.validation == 'required'"
                            >*</span
                          >
                        </strong>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        :name="`extra_field[${key}]`"
                        :placeholder="item.field_level"
                      />
                    </div>
                    <div v-else-if="item.type == 'textarea'">
                      <label class="label mt-1"
                        ><strong
                          >{{ item.field_level }}
                          <span
                            class="text-danger"
                            v-if="item.validation == 'required'"
                            >*</span
                          >
                        </strong>
                      </label>
                      <textarea
                        :name="`extra_field[${key}]`"
                        class="form-control"
                        :placeholder="item.field_level"
                        rows="3"
                        >{{ item.field_level }}</textarea
                      >
                    </div>
                    <div v-else-if="item.type == 'file'">
                      <label
                        ><strong
                          >{{ item.field_level }}
                          <span
                            class="text-danger"
                            v-if="item.validation == 'required'"
                            >*</span
                          >
                        </strong></label
                      >
                      <br />

                      <input
                        type="file"
                        class="upload"
                        :name="`extra_field[${key}]`"
                        accept="image/*"
                      />
                    </div>
                  </template>
                </template>
              </div>
            </div>

            <!-- Final Step: Terms and Confirmation -->
            <div class="form-step form-step-final">
              <div class="form-step-fields">
                <div class="flex space-x-2">
                  <input
                    type="checkbox"
                    id="term-condition"
                    name="condition"
                    required
                  />
                  <label for="term-condition">
                    {{
                      $t("I agree to the Terms of Service and Privacy Policy")
                    }}
                  </label>
                </div>
                <div class="flex space-x-2">
                  <input
                    id="info-correct"
                    name="correct"
                    type="checkbox"
                    required
                  />
                  <label for="info-correct">
                    {{
                      $t(
                        "All the personal information I have entered is correct."
                      )
                    }}
                  </label>
                </div>
                <div class="flex space-x-2">
                  <input
                    id="certification"
                    name="certification"
                    type="checkbox"
                    required
                  />
                  <label for="certification">
                    {{
                      $t(
                        "I certify that, I am registering to participate in the trading platform in the capacity of an individual (and beneficial owner) and not as an agent or representative of a third party corporate entity."
                      )
                    }}
                  </label>
                </div>
                <div class="gaps-1x"></div>
                <button class="btn btn-primary" type="submit">
                  {{ $t("Proceed to Verify") }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { useKycStore } from "@/store/kyc";
  import { useRoute, useRouter } from "vue-router";

  export default {
    setup() {
      const kycStore = useKycStore();
      const route = useRoute();
      const router = useRouter();

      const level = ref(Number(route.query.level));

      const docType = ref(null);
      const hasInfo = ref(false);
      const hasAddress = ref(false);
      const hasFirstname = ref(false);
      const hasLastname = ref(false);
      const hasEmail = ref(false);
      const hasPhone = ref(false);
      const hasDob = ref(false);
      const hasGender = ref(false);
      const hasCountry = ref(false);
      const hasState = ref(false);
      const hasCity = ref(false);
      const hasZip = ref(false);
      const hasAddress1 = ref(false);
      const hasAddress2 = ref(false);
      const hasPassport = ref(false);
      const hasNationalId = ref(false);
      const hasDrivingLicense = ref(false);
      const hasDocument = ref(false);
      const hasExtraField = ref(false);
      const step_01 = ref(null);
      const step_02 = ref(null);
      const step_03 = ref(null);

      const submitKyc = async () => {
        const form = document.getElementById("kyc_submit");
        const formData = new FormData(form);
        formData.append("level", level.value);
        if (hasDocument.value) {
          formData.append("documentType", docType.value);
        }
        await axios
          .post("/user/kyc/submit", formData)
          .then((response) => {
            $toast[response.type](response.message);
            if (response.type === "success") {
              setTimeout(() => {
                router.push("/identity");
              }, 1000);
            }
          })
          .catch((error) => {
            console.error("Error:", error.response.data.message);
          });
      };

      const fetchKycTemplate = async () => {
        if (kycStore.options === null) {
          await kycStore.fetch();
        }
        hasFirstname.value =
          kycStore.options.kyc_firstname.show === 1 &&
          kycStore.options.kyc_firstname.level === level.value;

        hasLastname.value =
          kycStore.options.kyc_lastname.show === 1 &&
          kycStore.options.kyc_lastname.level === level.value;

        hasEmail.value =
          kycStore.options.kyc_email.show === 1 &&
          kycStore.options.kyc_email.level === level.value;

        hasPhone.value =
          kycStore.options.kyc_phone.show === 1 &&
          kycStore.options.kyc_phone.level === level.value;

        hasDob.value =
          kycStore.options.kyc_dob.show === 1 &&
          kycStore.options.kyc_dob.level === level.value;

        hasGender.value =
          kycStore.options.kyc_gender.show === 1 &&
          kycStore.options.kyc_gender.level === level.value;

        hasInfo.value =
          hasFirstname.value ||
          hasLastname.value ||
          hasEmail.value ||
          hasPhone.value ||
          hasDob.value ||
          hasGender.value;

        hasCountry.value =
          kycStore.options.kyc_country.show === 1 &&
          kycStore.options.kyc_country.level === level.value;

        hasState.value =
          kycStore.options.kyc_state.show === 1 &&
          kycStore.options.kyc_state.level === level.value;

        hasCity.value =
          kycStore.options.kyc_city.show === 1 &&
          kycStore.options.kyc_city.level === level.value;

        hasZip.value =
          kycStore.options.kyc_zip.show === 1 &&
          kycStore.options.kyc_zip.level === level.value;

        hasAddress1.value =
          kycStore.options.kyc_address1.show === 1 &&
          kycStore.options.kyc_address1.level === level.value;

        hasAddress2.value =
          kycStore.options.kyc_address2.show === 1 &&
          kycStore.options.kyc_address2.level === level.value;

        hasAddress.value =
          hasCountry.value ||
          hasState.value ||
          hasCity.value ||
          hasZip.value ||
          hasAddress1.value ||
          hasAddress2.value;

        step_01.value = hasInfo.value || hasAddress.value ? "01" : null;

        hasPassport.value =
          kycStore.options.kyc_document.passport.status === 1 &&
          kycStore.options.kyc_document.passport.level === level.value;

        hasNationalId.value =
          kycStore.options.kyc_document.nidcard.status === 1 &&
          kycStore.options.kyc_document.nidcard.level === level.value;

        hasDrivingLicense.value =
          kycStore.options.kyc_document.driving.status === 1 &&
          kycStore.options.kyc_document.driving.level === level.value;

        hasDocument.value =
          hasPassport.value || hasNationalId.value || hasDrivingLicense.value;

        docType.value = hasDocument.value
          ? Object.keys(kycStore.options.kyc_document)[0]
          : null;

        step_02.value = hasDocument.value ? "02" : null;

        hasExtraField.value =
          kycStore.options &&
          kycStore.options.extra_field &&
          Object.values(kycStore.options.extra_field).some(
            (item) => item.level == level.value
          );
        console.log(hasExtraField.value);

        step_03.value = hasExtraField.value
          ? step_02 !== null
            ? "03"
            : "02"
          : null;
      };

      onMounted(() => {
        fetchKycTemplate();
      });

      return {
        kycStore,
        submitKyc,
        step_01,
        step_02,
        step_03,
        docType,
        level,
        hasInfo,
        hasAddress,
        hasFirstname,
        hasLastname,
        hasEmail,
        hasPhone,
        hasDob,
        hasGender,
        hasCountry,
        hasState,
        hasCity,
        hasZip,
        hasAddress1,
        hasAddress2,
        hasPassport,
        hasNationalId,
        hasDrivingLicense,
        hasDocument,
        hasExtraField,
      };
    },
  };
</script>

<style scope>
  .page-header-kyc {
    padding-top: 14px;
    padding-bottom: 25px;
  }
  .page-header-kyc div[class*="col-"] {
    padding-left: 30px;
    padding-right: 30px;
  }
  .page-header-kyc .page-title {
    font-weight: 400;
  }
  .page-header-kyc p {
    font-size: 1em;
  }
  ul li {
    list-style: none;
  }
  .document-list {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
  }
  @media (min-width: 414px) {
    .document-list {
      margin-left: -5px;
      margin-right: -5px;
    }
  }
  @media (min-width: 1200px) {
    .document-list {
      margin-left: -10px;
      margin-right: -10px;
    }
  }
  .doc-upload + .doc-upload {
    margin-top: 30px;
  }
  .note {
    padding: 15px 15px 15px 45px;
    border-radius: 4px;
    position: relative;
    line-height: 1.4;
  }
  .note p {
    font-size: 11px !important;
    line-height: inherit;
    display: block;
  }
  .note-plane {
    padding: 0 0 0 18px;
    background: transparent !important;
  }
  .note-light-alt p {
    color: #758698;
  }
  @media (min-width: 576px) {
    .note p {
      font-size: 12px !important;
    }
  }
  @media (min-width: 992px) {
    .note-md p {
      font-size: 14px !important;
    }
  }
  .card-innr {
    position: relative;
    padding: 15px 18px;
    border-color: #e6effb !important;
  }
  .card-innr
    > div:last-child:not(.input-item):not(.row):not(.step-head):not(.tile-footer):not(.tab-content):not(.progress-bar):not(.chart-tokensale):not(:only-child) {
    margin-bottom: 5px;
  }
  .card.kyc-form-steps {
    transition: none;
  }
  @media (min-width: 576px) {
    .card-innr {
      padding: 20px 25px;
    }
  }
  .kyc-form-steps {
    margin-bottom: 25px;
  }
  .form-step-head {
    border-top: 1px solid #eef2f8;
    border-bottom: 1px solid #eef2f8;
  }
  .form-step-final {
    border-top: 1px solid #eef2f8;
    padding-bottom: 5px;
  }
  .form-step-fields {
    padding: 20px;
  }
  .form-step.form-step1 .form-step-fields {
    padding-bottom: 1px;
  }
  .form-step.form-step2 .form-step-fields {
    padding-bottom: 16px;
  }
  .form-step .note-plane {
    margin-bottom: 10px;
  }
  .form-step .note-plane p {
    font-size: 1em !important;
    line-height: 1.5;
  }
  .form-step.form-step2 .note-plane {
    margin-bottom: 2px;
  }
  .step-head {
    display: flex;
    align-items: center;
  }
  .step-head-text h4 {
    margin-bottom: 0;
    color: #342d6e;
  }
  .step-head-text p {
    font-size: 0.95em;
  }
  .step-head h4 {
    font-weight: 500;
  }
  .step-number {
    flex-shrink: 0;
    height: 48px;
    width: 48px;
    font-size: 16px;
    color: #758698;
    border: 2px solid #b1becc;
    text-align: center;
    line-height: 45px;
    border-radius: 50%;
    margin-right: 12px;
    margin-top: 4px;
    margin-bottom: 4px;
  }
  @media (min-width: 576px) {
    .kyc-form-steps {
      margin-bottom: 60px;
    }
    .form-step-fields {
      padding: 30px;
    }
    .form-step.form-step1 .form-step-fields {
      padding-bottom: 10px;
    }
    .form-step.form-step2 .form-step-fields {
      padding-bottom: 25px;
    }
    .step-head h4 {
      font-weight: 400;
    }
    .step-number {
      font-size: 20px;
      margin-right: 18px;
    }
  }
  .gaps-1x {
    height: 10px;
  }
  .pdb-0-5x {
    padding-bottom: 5px;
  }
  .pdb-1x {
    padding-bottom: 10px;
  }
  select {
    width: 100%;
    line-height: 20px;
    padding: 10px 20px 10px 15px;
    border: none;
    border-radius: 4px;
    height: 42px !important;
    font-size: 14px;
    color: #6e81a9;
    background: transparent;
    vertical-align: top;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  select:focus {
    outline: none;
  }
  .kyc-form-steps {
    margin-bottom: 25px;
  }
  img {
    max-width: 100%;
  }
  label {
    font-weight: 400;
    line-height: 1.3;
  }
  ul {
    padding: 0px;
    margin: 0px;
  }
  ul li {
    list-style: none;
  }
  .input-wrap {
    position: relative;
  }
  .document-list {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
  }
  .document-item {
    width: 100%;
  }

  .document-type {
    position: absolute;
    opacity: 0;
    height: 1px;
    width: 1px;
  }
  .document-type-icon {
    position: relative;
    width: 30px;
    flex-shrink: 0;
  }
  .document-type-icon img {
    min-width: 100%;
    transition: all 0.4s;
  }
  .document-type-icon img:last-child:not(:first-child) {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .document-type ~ label {
    position: relative;
    display: block;
    border: 2px solid #e6effb;
    border-radius: 4px;
    color: #758698;
    padding: 8px 42px 8px 14px;
    font-size: 11px;
    transition: all 0.4s;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 0;
  }

  .document-type ~ label span {
    padding-left: 15px;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 0.05em;
    transition: all 0.4s;
  }
  .document-type:checked ~ label {
    border-color: #7668fe;
  }
  .document-type:checked ~ label:after {
    opacity: 1;
  }
  .document-type:checked ~ label span {
    color: #495463;
  }
  .dark .document-type:checked ~ label span {
    color: #cfd3d8;
  }
  .document-type:checked
    ~ label
    .document-type-icon
    img:last-child:not(:first-child) {
    opacity: 1;
  }
  @media (min-width: 414px) {
    .document-list {
      margin-left: -5px;
      margin-right: -5px;
    }
    .document-item {
      padding-left: 5px;
      padding-right: 5px;
      width: 50%;
    }
    .document-item:last-child:not(:nth-child(even)) {
      width: 100%;
    }
    .document-type ~ label span {
      padding-left: 8px;
    }
  }
  @media (min-width: 768px) {
    .document-item {
      width: auto !important;
    }
    .document-type-icon {
      width: 34px;
    }
    .document-type ~ label {
      padding-right: 46px;
      font-size: 12px;
    }
  }
  @media (min-width: 1200px) {
    .document-list {
      margin-left: -10px;
      margin-right: -10px;
    }
    .document-item {
      padding-left: 10px;
      padding-right: 10px;
    }
    .document-type-icon {
      width: 40px;
    }
    .document-type ~ label {
      padding: 10px 48px 10px 16px;
      font-size: 13px;
    }
  }
  input {
    background: none;
  }
  .guttar-vr-10px {
    margin-top: -5px !important;
    margin-bottom: -5px !important;
  }
  .guttar-vr-10px > li {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }
  ul {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  img {
    vertical-align: middle;
    border-style: none;
  }
  label {
    display: inline-block;
    margin-bottom: 0.5rem;
  }
  input {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  input {
    overflow: visible;
  }
  input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }
  @media print {
    *,
    ::after,
    ::before {
      text-shadow: none !important;
      box-shadow: none !important;
    }
    img {
      page-break-inside: avoid;
    }
  }
</style>
