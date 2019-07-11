<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <img src="https://images.pexels.com/photos/1025586/pexels-photo-1025586.jpeg?cs=srgb&dl=animal-bald-bird-of-prey-1025586.jpg&fm=jpg" alt="" height="300px" width="auto">
    <h2>{{ placeholder }}</h2>
  </div>

</template>

<style>
</style>

<script>
export default {
  data: function() {
    return {
      message: "WALDEN. FOR MEN",
      placeholder: "Let's figure this out together"

    };
  },
  created: function() {},
  methods: {}
};
</script>