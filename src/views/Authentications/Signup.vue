<template>
  <div class="signup">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>WELCOME TO WALDEN</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>First name:</label> 
          <input type="text" class="form-control" v-model="first_name">
        </div>
         <div class="form-group">
          <label>Last name:</label> 
          <input type="text" class="form-control" v-model="last_name">
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Update a photo:</label>
          <input type="text" class="form-control" v-model="image_url">
        </div>
      <div>
        <label>SELECT YOUR TAGS:</label>
        <div v-for = "tag in tags">
          <input type="radio" :value="tag.id" v-model="tagId"> {{ tag.name }}
          <img v-bind:src="tag.image_url" alt="" height="50px" width="auto"><br>
        </div>
      </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation">
        </div>
        <input type="submit" class="btn btn-primary" value="SIGN UP">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      image_url: "",
      password: "",
      passwordConfirmation: "",
      tags: [],
      tagId: "",
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
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        image_url: this.image_url,
        tag_id: this.tagId,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          console.log(response.data)          
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>