<template>

  <div class="home">

  <section id="home" class="module-hero module-parallax module-fade bg-dark-30" data-background="/assets/images/bird.jpg">

    <div class="hs-caption container">
      <div class="caption-content">
        <div class="hs-title-size-4 font-alt m-b-30">
          {{ message }}
        </div>
        <div class="hs-title-size-1 font-inc">
          {{ placeholder }}
        </div>
      </div>
    </div>

  </section >

</div>

</template>

<style>
  #home {
    height: 600px;
    background-image: url(/assets/images/bird.jpg)
  }
</style>

<script>
export default {
  data: function() {
    return {
      message: "WALDEN.FOR MEN",
      placeholder: "Let's figure this out together"

    };
  },
  created: function() {},
  methods: {}
};
</script>