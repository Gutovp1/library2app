<template>
  <div class="book">
    <Book msg="This is Book View" />
  </div>
</template>

<script>
import Book from "@/components/lib/BookLib.vue";

export default {
  name: "BookView",
  components: { Book },
};
</script>
