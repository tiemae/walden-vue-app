<template>
  <div class="users-show">

<!--     <h4 v-if="$parent.isLoggedIn()">Logged in as: {{ $parent.user.name }}</h4> -->
    
    <h1>WELCOME, {{ user.first_name.toUpperCase()}}</h1>
    <img v-bind:src="user.image_url" alt="">
    <h2>ACCOUNT EMAIL</h2>
    <p>{{ user.email }}</p>

    <h2>YOUR HAIR TYPE:</h2>
    <img v-bind:src="user.tag.image_url" class="text-center" contain height="100px" width="150px">
    <p>{{ user.tag.name }}</p> 
     

    <h2> YOUR LATEST POSTS:</h2>

    <div v-for="post in user.posts">
    <h3 class="text-center">{{ post.title }}</h3>
    <img v-bind:src="post.image_url" class="text-center">
    <p class="text-center text-nowrap"> {{ post.text }} </p>
    </div>

   <!-- add html drop down for selecting (options) -->

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#userEditModal">
      EDIT YOUR PROFILE
    </button>

    <!-- Modal -->
    <div class="modal" id="userEditModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">EDIT {{ user.first_name.toUpperCase() }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            
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
                <input type="text" class="form-control" id="email" placeholder="enter your email address" v-model="user.email">
              </div>
              <div class="form-group col-md-12">
                <label for="tag_id">SELECT YOUR HAIR TYPE:</label>
                <input type="text" class="form-control" id="tag_id" placeholder="select your hair type" v-model="user.tag.name">
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
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>



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