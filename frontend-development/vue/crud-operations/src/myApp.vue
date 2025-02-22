<template>
  <div class="container">
    <myheader
      :intake="{
        track: 'OS',
        branch: 'Mansoura',
        location: 'Mansoura University',
      }"
    >
      <h5>Moblie development</h5>
      <template v-slot:top>
        <p>top slot</p>
      </template>
      <template v-slot:bottom>
        <a href="#">More...</a>
      </template>
    </myheader>
    <div class="row my-2">
      <links />
      <pagebody />
    </div>
    <myfooter />
  </div>
</template>

<script>
import myheader from "@/components/header.vue";
import myfooter from "@/components/footer.vue";
import links from "@/components/links.vue";
import pagebody from "@/components/body.vue";
export default {
  components: {
    myheader,
    myfooter,
    links,
    pagebody,
  },
};
</script>

<style></style>
