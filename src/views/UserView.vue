<template>
  <div class="user">
    <User msg="This is User View" />
  </div>
</template>

<script>
import User from "@/components/lib/UserLib.vue";

export default {
  name: "UserView",
  components: { User },
};
</script>
