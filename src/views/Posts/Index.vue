<template>
  <div class="posts-index">
    
    <h1>WALDEN. FOR MEN</h1>

    <div v-for="post in posts">
      <h2 class="text-center">{{ post.title }}</h2>
      <p> Written by: {{ post.author }}</p>
      <p> Published on {{post.created_at}}</p> 

      <router-link v-bind:to="'/posts/' + post.id">
        <img v-bind:src="post.image_url" class="text-center" height="400px" width="auto">
      </router-link>  
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      posts: [],
    };
  },
  created: function() {
    axios.get("/api/posts").then(response => {
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