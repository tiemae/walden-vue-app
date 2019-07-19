<template>
  <div id="app">

    <nav class="navbar navbar-fixed-top navbar-custom" role="navigation">

        <div class="container">
      
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#custom-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.html">Walden.For Men.</a>
          </div>
      
          <div class="collapse navbar-collapse" id="custom-collapse">
      
            <ul class="nav navbar-nav navbar-right">
      
              <li><router-link to="/">Home</router-link></li>
      
              <li><a href="/about">About</a></li>
              <li><router-link v-if="!isLoggedIn()" to="/login"> Login </router-link></li>
              <li><router-link to="/posts"> Posts </router-link></li>
              <li><router-link v-if="isLoggedIn()" to="/posts/new"> Create A Post </router-link></li>
              <li><router-link v-if="!isLoggedIn()" to="/signup"> Signup </router-link></li> 
              <li><router-link v-if="isLoggedIn()" to="/users/me"> Profile </router-link></li>
              <li><router-link v-if="isLoggedIn()" to="/logout"> Logout </router-link> </li>             
      
            </ul>
          </div>
      
        </div>

    </nav>

    <router-view :key="$route.path"></router-view> 

    <footer>
<!--       <div class="container"> -->
<!--         <div class="row"> -->
          <div class="col-sm-12 text-center">
            <p class="copyright font-inc m-b-0">© 2019 <a href="index.html">Walden.For Men</a>, All Rights Reserved.</p>
          </div>
<!--         </div> -->
<!--       </div> -->
    </footer>

  </div>
</template>

<style>
</style>


<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user_id: localStorage.getItem('user_id'),
      searchFilter: "",
      // user: {}
    };
  },
  created: function() {
    // axios.get("/api/users/me").then(response => {
    //   this.user = response.data;
    //   console.log(this.user);
    // });
    // method section gets called whenever but the data and created sections won't re-render until the page is refreshed
  },
  methods: {
    isLoggedIn: function() {
      if (localStorage.getItem('jwt')) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

