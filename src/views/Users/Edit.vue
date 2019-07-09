<template>
  <div class="users-edit">
    
    <img v-bind:src="user.image_url" alt="">
    <h1>{{ user.first_name.toUpperCase() }} {{ user.last_name.toUpperCase() }}</h1>
    

    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <form v-on:submit.prevent="submit()">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="first_name">FIRST NAME:</label>
          <input type="string" class="form-control" id="firstName" placeholder="write your first name here" v-model="user.first_name">
        </div>
        <div class="form-group col-md-6">
          <label for="last_name">LAST NAME:</label>
          <input type="string" class="form-control" id="lastName" placeholder="write your last name here" v-model="user.last_name">
        </div>
      </div>
      <div class="form-group col-md-12">
        <label for="email">EMAIL:</label>
        <input type="string" class="form-control" id="email" placeholder="enter your email address" v-model="user.email">
      </div>
      <div class="form-group col-md-12">
        <label for="password">PASSWORD:</label>
        <input type="string" class="form-control" id="password" placeholder="enter your password" v-model="password">
      </div>
      <div class="form-group col-md-12">
        <label for="passwordConfirmation">PASSWORD_CONFIRMATION:</label>
        <input type="string" class="form-control" id="passwordConfirmation" placeholder="enter your password, again" v-model="passwordConfirmation">
      </div>

      <div>
        <label>SELECT YOUR HAIR TYPE:</label>
        <div v-for = "tag in tags" >
          <input type="radio" :value="tag.id" v-model="tagId"> {{ tag.name }}
        </div>
      <!--   <div>
          tagId: {{tagId}}
          Tags: {{tags.map(tag => tag.name)}}
        </div> -->
      </div>

      <div class="form-group col-md-12">
        <label for="imageUrl">IMAGE</label>
        <input type="text" class="form-control" id="imageUrl" placeholder="paste your image link" v-model="user.image_url">
      </div>

      <div class="form-group col-md-12 text-center">
        <button type="submit" class="btn btn-primary">Update</button>
      </div>
      
    </form>


  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      errors: [],
      tags: [],
      tagId: "",
      password: "",
      passwordConfirmation: ""
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then(response => {
      this.user = response.data;
      console.log(this.user);
    });
    axios.get("/api/tags/").then(response => {
      this.tags = response.data;
      console.log(this.tags);
    });
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        email: this.user.email,
        tag_id: this.tagId,
        image_url: this.user.image_url
      };
      axios.patch("/api/users/" + this.user.id, params).then(response => {
        console.log("Success!", response.data);
        this.$router.push("/users/" + this.user.id);
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },
  }
};
</script>