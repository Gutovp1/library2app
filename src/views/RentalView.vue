<template>
  <div class="rental">
    <Rental msg="This is Rental View" />
  </div>
</template>

<script>
import Rental from "@/components/lib/Rental.vue";

export default {
  name: "RentalView",
  components: { Rental },
};
</script>
