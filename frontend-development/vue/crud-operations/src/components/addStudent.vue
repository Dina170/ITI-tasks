<template>
    <div>
      <button class="btn btn-primary w-100 mb-1" @click="sendNewStudent">Add</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
        sendNewStudent() {
            this.$emit("addbtnClicked", {id: 4, name: "test", city: "Cairo"});
        }
    }
  };
  </script>
  
  <style></style>
  