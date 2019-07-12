<template>
  <div class="posts-edit">      
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>EDIT YOUR POST</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <img v-bind:src="post.image_url" class="text-center" height="400px" width="auto">

        <div class="form-group col-md-12">
          <label for="imageUrl">IMAGE</label>
          <input type="text" v-model="post.image_url" placeholder=post.image_url >
        </div>         
        <div class="form-group">
          <label>TITLE:</label> 
          <input type="text" required class="form-control" v-model="post.title">
        </div> 

         <div class="form-group">
          <label>TEXT:</label> 
          <textarea class="form-control" v-model="post.text" required placeholder="Tell your story...or...share some wisdom..."></textarea> 
        </div>

        <input type="submit" class="btn btn-primary" value="PUBLISH">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      post: {},
      errors: []
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
        title: this.post.title,
        text: this.post.text,
        image_url: this.post.image_url || post.image_url,
      };
      axios
        .patch("/api/posts/" + this.$route.params.id, params)
        .then(response => { 
          console.log("Success!", response.data);
          this.$router.push("/posts");
        })
        .catch(error => {
          console.log(response.data);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>