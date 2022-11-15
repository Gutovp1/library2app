<template>
  <div class="publisher">
    <Publisher msg="This is Publisher View" />
  </div>
</template>

<script>
import Publisher from "@/components/lib/PublisherLib.vue";

export default {
  name: "PublisherView",
  components: { Publisher },
};
</script>
