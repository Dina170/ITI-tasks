<template>
  <div>
    <slot name="top" />
    <div class="text-center my-2 py-2 bg-primary">
      <h4>header</h4>
      <h4>Track: {{ intake.track }}</h4>
      <h4>Branch: {{ intake.branch }}</h4>
      <h4>Location: {{ intake.location }}</h4>
    </div>
    <slot name="bottom" />
    <slot>test default value</slot>
  </div>
</template>

<script>
export default {
  props: ["intake"],
};
</script>

<style></style>
