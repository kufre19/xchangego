<template>
  <li>
    <span :class="treeData.isActive ? 'border-success' : 'border-dark'"
      ><div class="card relative inline-block flex flex-col items-center p-2">
        <div
          class="rank-circle absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform"
        >
          {{ treeData.rank }}
        </div>
        <img
          :src="'/assets/images/profile/' + treeData.profilePhotoPath"
          alt="Profile photo"
          class="profile-image mb-2 h-16 w-16 rounded-full"
          @error="$event.target.src = '/assets/images/profile/default.png'"
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
</template>

<script>
  export default {
    name: "NodeTree",
    props: {
      treeData: {
        type: Object,
        required: true,
      },
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
    },
  };
</script>
