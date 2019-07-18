<template>
  <div class="users-edit">



    <section class="module p-b-0">

      <h1 class="module-title font-alt align-center">EDIT YOUR PROFILE</h1>


      <div class="align-center form-group">
      <router-link class="font-inc comment clearfix" v-bind:to="'/users/' + user.id">BACK TO PROFILE ></router-link>
      </div>

      <div class="container">

        <div class="row">

          <div class="col-sm-8 col-sm-offset-2">

            <div class="post">

            <div class="post-thumbnail">
              <img v-bind:src="user.image_url">
            </div>

          </div>

        </div>
      </div>
    </div>
  </section>
  
    

    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

     <div class="row">

    <div class="col-sm-6 col-sm-offset-3">

    <form id="contact-form" role="form" novalidate="" v-on:submit.prevent="submit()">
      <div class="form-group">
        <div class="form-group">
          <label class="sr-only" for="first_name">FIRST NAME:</label>
          <input type="string" class="form-control" id="firstName" placeholder="write your first name here" v-model="user.first_name">
        </div>
        <div class="form-group">
          <label class="sr-only" for="last_name">LAST NAME:</label>
          <input type="string" class="form-control" id="lastName" placeholder="write your last name here" v-model="user.last_name">
        </div>
      </div>
      <div class="form-group">
        <label class="sr-only" for="email">EMAIL:</label>
        <input type="string" class="form-control" id="email" placeholder="enter your email address" v-model="user.email">
      </div>
      <div class="form-group">
        <label class="sr-only" for="password">PASSWORD:</label>
        <input type="string" class="form-control" id="password" placeholder="enter your new password" v-model="password">
      </div>
      <div class="form-group">
        <label class="sr-only" for="passwordConfirmation">PASSWORD_CONFIRMATION:</label>
        <input type="string" class="form-control" id="passwordConfirmation" placeholder="re-enter your new password" v-model="passwordConfirmation">
      </div>

      <div class="form-group">
        <label class="sr-only" for="imageUrl">IMAGE</label>
        <input type="text" class="form-control" id="imageUrl" placeholder="paste your image link" v-model="user.image_url">
      </div>


      <div class="align-center">
          <label class="comment clearfix font-alt"><a>UPDATE YOUR HAIR TYPE:</a></label>
          <div class="font-inc comment clearfix comment-author align-center row multi-columns-row post-columns" v-for = "tag in tags">
              <div class="">
              <input class="align-center post-body font-inc" type="radio" :value="tag.id" 
              v-model="tagId"> <small> {{ tag.name }}</small>
              </div>
              <div class="">
              <img class="align-center resize" v-bind:src="tag.image_url">
            </div>
        </div>
      <!-- </div> -->

<!--       <div>
        <label>SELECT YOUR HAIR TYPE:</label>
        <div v-for = "tag in tags">
          <input type="radio" :value="tag.id" v-model="tagId"> {{ tag.name }}
          <img v-bind:src="tag.image_url" alt="" height="50px" width="auto"><br>
        </div> -->
      <!--   <div>
          tagId: {{tagId}}
          Tags: {{tags.map(tag => tag.name)}}
        </div> -->
      </div>

      <div class="form-group align-center module-title">
        <button type="submit" class="btn btn-round btn-default">UPDATE</button>

        <button v-on:click="destroyUser()" class="btn btn-d btn-round btn-default">DELETE YOUR PROFILE</button>   
      </div>   

      
    </form>

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

    destroyUser: function() {
      axios
      .delete("/api/users/" + this.$route.params.id)
      .then(response => {
        console.log("User Deleted"); 
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("jwt");
        localStorage.removeItem("user_id");
        this.$router.push("/signup"); 
      });
    },
  },
};
</script>


<style>
  img.resize {
    max-width:30%;
    max-height:30%;
    border-radius: 50%;
  }
</style>