<template>
  <div class="footer">
    <h4>{{ returnMsg() }}</h4>
  </div>
</template>

<script>
export default {
  name: "FooterView",
  data() {
    return {
      msg: `Gutovp - copyright © `,
    };
  },
  methods: {
    returnMsg() {
      return this.msg + new Date().getFullYear();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  color: darkgray;
  background-color: white;
  box-shadow: inset 0px 4px 3px rgba(50, 50, 50, 0.75);
  text-align: center;
}
</style>
