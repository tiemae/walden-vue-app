<template>
  <div class="users-show">

<!--     <h4 v-if="$parent.isLoggedIn()">Logged in as: {{ $parent.user.name }}</h4> -->
    
    <h2> Hi {{ user.first_name}}!</h2>
    <img v-bind:src="user.image_url" alt="">

    <div v-for="post in posts">
      <h2 class="text-center">{{ post.title }}</h2>
      <img v-bind:src="post.url" class="text-center">
      <p class="text-center text-nowrap"> {{ post.text }} </p>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      posts: []
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
      console.log(this.user);
    });
    axios.get("/api/posts/" + this.$route.params.id).then(response => {
      this.posts = response.data;
      console.log(this.posts);
    });
  },
  methods: {
    submit: function() {
    },
  }
};
</script>