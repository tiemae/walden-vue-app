<template>
  <div class="posts-new">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>CREATE A POST</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>TITLE:</label> 
          <input type="text" required class="form-control" v-model="title">
        </div>
        <div class="form-group col-md-12">
          <label for="imageUrl">IMAGE</label>
          <input type="text" required class="form-control" id="imageUrl" placeholder="paste your image link" v-model="imageUrl">
        </div>        
         <div class="form-group">
          <textarea class="form-control" v-model="text" required placeholder="Tell your story...or...share some wisdom..."></textarea> 
        </div>

      <div>
        <label>SELECT YOUR TAGS:</label>
        <div v-for = "tag in tags">
          <input type="checkbox" :value="tag.id" v-model="tagIds"> {{ tag.name }}
          <img v-bind:src="tag.image_url" alt="" height="50px" width="auto"><br>
        </div>
      </div>

      {{tagIds}}

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
      title: "",
      text: "",
      imageUrl: "",
      tags: [],
      tagIds: [],
      errors: []
    };
  },

  created: function() {
    axios.get("/api/tags/").then(response => {
      this.tags = response.data;
      console.log(this.tags);
    });
  },  
  methods: {
    submit: function() {
      var params = {
        title: this.title,
        text: this.text,
        image_url: this.imageUrl,
        tag_ids: this.tagIds
      };
      axios
        .post("/api/posts", params)
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