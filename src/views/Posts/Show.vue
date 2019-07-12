<template>
  <div class="posts-index">
    
    <h1>WALDEN. FOR MEN</h1>

    <div>
    <img v-bind:src="post.image_url" class="text-center" height="500px" width="auto">
    <h2 class="text-center">{{ post.title }}</h2>
    <p class="text-center"> writen by: {{ post.author }}</p>
    <p> Published on {{post.created_at}} </p> 
    <p class="text-center text-nowrap"> {{ post.text }} </p>
    </div>

    <h2>Comments</h2>
    <div v-for="comment in post.comments">
      <img v-bind:src="comment.user.image_url" class="text-center" height="50px" width="auto"><br><span>Comment by: {{comment.author}}</span>
      <p class="text-center">{{ comment.text }}</p>

      <button v-if="comment.user.id == user_id" v-on:click="destroyComment()">DELETE THIS COMMENT</button>

    {{comment.user.id}}
    {{user_id}}

    </div>




    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Responses</h1>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
          <textarea v-model= "text" required placeholder="Write response here..."></textarea> <br>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>


    </div>

    <router-link v-bind:to="'/posts/' + post.id + '/edit'"><button>EDIT YOUR POST</button></router-link>

    <button v-if="post.user.id == user_id" v-on:click="destroyPost()">DELETE YOUR POST</button>

    <!-- v-if="post.user.id = $parent.user_id" -->

   <!--  {{post.user.id}} -->
 <!--    {{$parent.user.id}} this wouldn't load automatically, it needed a refresh :/ --> 
<!--     {{user_id}} -->

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      post: {},
      errors: [],
      user_id: localStorage.getItem('user_id'),
      text: "",
      comments: {} 
    };
  },
  created: function() {
    axios.get("/api/posts/" + this.$route.params.id).then(response => {
      this.post = response.data;
      console.log(this.post);
    });    
  },
  methods: {
    submit: function() {
      var params = {
      text: this.text,
      post_id: this.post.id 
      // this would also work this.$route.params.id 
    };
    axios
      .post("/api/comments", params)
      .then(response => {
        console.log(response.data); 
        this.post.comments.push(response.data);
        this.text = "";
      })
      .catch(error => {
        this.errors = error.response.data.errors;
    });

    },

    destroyPost: function() {
      axios
      .delete("/api/posts/" + this.$route.params.id)
      .then(response => {
        console.log("Post Deleted");
        this.$router.push("/posts");   
      });
    },
    destroyComment: function() {
      axios
      .delete("/api/comments/" + "")
      .then(response => {
        console.log("Comment Deleted");
        this.$router.push("/posts/" + this.$route.params.id);  
      });
    },    
  }
};
</script>