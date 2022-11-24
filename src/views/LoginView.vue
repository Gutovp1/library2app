<template>
  <div class="login">
    <Login msg="This is login View" />
  </div>
</template>

<script>
import Login from "@/components/lib/LoginLib.vue";

export default {
  name: "LoginView",
  components: { Login },
};
</script>
