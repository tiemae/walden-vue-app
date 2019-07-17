<template>
  <div class="signup">

      <section class="module module-header bg-dark bg-dark-50">
      <div class="container">

        <div class="row">

          <div class="col-sm-6 col-sm-offset-3">

            <h2 class="module-title align-center font-alt">WELCOME TO WALDEN</h2>

          </div>

        </div>

        <div class="row">

          <div class="col-sm-6 col-sm-offset-3">

            <form v-on:submit.prevent="submit()" role="form" novalidate="">

          <!--     <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul> -->
              <div>
                <label class="comment clearfix font-inc">SELECT YOUR HAIR TYPE:</label>
                <div class="font-inc comment clearfix comment-author" v-for = "tag in tags">
                  <input type="radio" :value="tag.id" v-model="tagId"> {{ tag.name }}
                  <img class="comment-avatar" v-bind:src="tag.image_url"><br>
                </div>
            </div>



              <div class="form-group">
                <label class="sr-only" for="first_name">Your First Name</label>
                <input type="text" id="first_name" class="form-control" name="first_name" placeholder="Your First Name" required="" data-validation-required-message="Please enter your first name." aria-invalid="false" v-model="first_name">
                <p class="help-block text-danger"></p>
              </div>

              <div class="form-group">
                <label class="sr-only" for="last_name">Your last Name</label>
                <input type="text" id="last_name" class="form-control" name="last_name" placeholder="Your last Name" required="" data-validation-required-message="Please enter your last name." aria-invalid="false" v-model="last_name">
                <p class="help-block text-danger"></p>
              </div>

              <div class="form-group">
                <label class="sr-only" for="image_url">Upload An Image URL</label>
                <input type="text" id="image_url" class="form-control" name="image_url" placeholder="Upload An Image URL" required="" data-validation-required-message="Please enter Upload An Image URL." aria-invalid="false" v-model="image_url">
                <p class="help-block text-danger"></p>
              </div>

              <div class="form-group">
                <label class="sr-only" for="email">Your Email</label>
                <input type="email" id="email" class="form-control" name="email" placeholder="Your E-mail" required="" data-validation-required-message="Please enter your e-mail." aria-invalid="false" v-model="email">
                <p class="help-block text-danger"></p>
              </div>

              <div class="form-group">
                <label class="sr-only" for="password">Your Password</label>
                <input type="password" id="password" name="password" class="form-control" placeholder="Your Password" required="" data-validation-required-message="Please enter your password." v-model="password">
                <p class="help-block text-danger"></p>
              </div>

              <div class="form-group">
                <label class="sr-only" for="passwordConfirmation">re-enter your password</label>
                <input type="password" id="passwordConfirmation" name="password_confirmation" class="form-control" placeholder="re-enter your password" required="" data-validation-required-message="Please re-enter your password." v-model="passwordConfirmation">
                <p class="help-block text-danger"></p>
              </div>

              <button type="submit" class="btn btn-round btn-default">Submit</button>

            </form>

            <!-- Ajax response -->
            <div id="contact-response" class="ajax-response font-alt"></div>

          </div>

        </div>

      </div>
    </section>




























<!--     <div class="container">
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
    </div> -->
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


<style scoped>
  .image-tag{
    max-width: 20%;
  }
</style>