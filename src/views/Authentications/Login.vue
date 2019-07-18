
<template>

  <div class="login">

  <section class="module module-header bg-dark bg-dark-50">
    <div class="container">

      <div class="row">

        <div class="col-sm-6 col-sm-offset-3">

          <h2 class="module-title align-center font-alt">Login</h2>

        </div>

      </div>

      <div class="row ">

        <div class="col-sm-4 col-sm-offset-4">

          <form v-on:submit.prevent="submit()" id="contact-form" role="form" novalidate="">

        <!--     <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul> -->

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

            <div class="align-center module-title"> 
              <button type="submit" class="btn btn-default btn-round">Submit</button>
            </div>

          </form>

          <!-- Ajax response -->
          <div id="contact-response" class="ajax-response font-alt"></div>

        </div>

      </div>

    </div>
  </section>

</div>







<!--   <div class="login">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Login</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <input type="submit" class="btn btn-primary" value="LOGIN">
      </form>
    </div>
  </div> -->





</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          console.log("Success!", response.data.user_id);
          this.$router.push("/posts");          
          // this.$router.push("/users/" + response.data.user_id);
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
