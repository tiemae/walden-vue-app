<template>
  <div class="users-show">

<!--     <h4 v-if="$parent.isLoggedIn()">Logged in as: {{ $parent.user.name }}</h4> -->
    
    <h1>WELCOME, {{ user.first_name.toUpperCase()}}</h1>
    <img v-bind:src="user.image_url" alt="" contain height="500px" width="auto"><br>
    <router-link v-bind:to="'/users/' + user.id + '/edit'"><button>EDIT YOUR PROFILE</button></router-link>

    <h2>ACCOUNT EMAIL</h2>
    <p>{{ user.email }}</p>

    <h2>YOUR HAIR TYPE:</h2>
    <img v-bind:src="user.tag.image_url" class="text-center" contain height="100px" width="auto">
    <p>{{ user.tag.name }}</p> 
     

    <h2> YOUR LATEST POSTS:</h2>

    <div v-for="post in user.posts">
      <h2 class="text-center">{{ post.title }}</h2>
      <p> Written by: {{ post.author }}</p>
      <p> Published on {{post.created_at}}</p>      
      <router-link v-bind:to="'/posts/' + post.id">
        <img v-bind:src="post.image_url" class="text-center" height="400px" width="auto">
     
      </router-link> <br>

<!--        <router-link v-bind:to="'/posts/' + post.id + '/edit'"><button>EDIT YOUR POST</button></router-link> -->

    </div>

   <!-- add html drop down for selecting (options) -->


  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
      console.log(this.user);
    });
  },
  methods: {
    submit: function() {
    },
  }
};
</script>