<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title">
        {{ $t("Business Network") }}
      </div>
      <div class="outer-container">
        <div ref="treeContainer" class="tree-container">
          <ul class="tree">
            <li>
              <span
                :class="treeData.isActive ? 'border-success' : 'border-dark'"
              >
                <div
                  class="card relative inline-block flex flex-col items-center p-2"
                >
                  <div
                    class="rank-circle absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform"
                  >
                    {{ treeData.rank }}
                  </div>
                  <img
                    :src="
                      treeData.profilePhotoPath !== null &&
                      treeData.profilePhotoPath !== '' &&
                      treeData.profilePhotoPath !== undefined
                        ? '/assets/images/profile/' + treeData.profilePhotoPath
                        : '/assets/images/profile/default.png'
                    "
                    alt="Profile photo"
                    class="profile-image mb-2 h-16 w-16 rounded-full"
                  />
                  <div
                    :class="
                      treeData.isActive
                        ? 'text-success dark:text-green-300'
                        : 'text-dark dark:text-gray-300'
                    "
                  >
                    {{ treeData.username }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ formatDate(treeData.joinedAt) }}
                  </div>
                </div></span
              >
              <ul v-if="treeData.children && treeData.children.length > 0">
                <node-tree
                  v-for="(child, index) in treeData.children"
                  :key="index"
                  :tree-data="child"
                />
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import NodeTree from "./NodeTree.vue";
  import panzoom from "panzoom";

  export default {
    name: "BusinessNetwork",
    components: { NodeTree },
    props: {
      plat: {
        type: Object,
        required: true,
      },
      userStore: {
        type: Object,
        required: true,
      },
      mlmStore: {
        type: Object,
        required: true,
      },
      treeData: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      if (this.plat.mlm.type === "unilevel") {
        panzoom(this.$refs.treeContainer, {
          maxZoom: 2,
          minZoom: 0.5,
          smoothScroll: false,
          bounds: true,
          boundsPadding: 0.2,
        });
      }
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
    },
  };
</script>
