<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home | </router-link> 
      <router-link to="/about"> About | </router-link>
      <router-link to="/posts"> Posts | </router-link>
      <router-link v-if="isLoggedIn()" to="/posts/new"> Create A Post | </router-link> 
      <router-link v-if="!isLoggedIn()" to="/signup"> Signup | </router-link> 
      <router-link v-if="!isLoggedIn()" to="/login"> Login | </router-link> 
      <router-link v-if="isLoggedIn()" to="/users/me"> Profile | </router-link> 
      <router-link v-if="isLoggedIn()" to="/logout"> Logout | </router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 80px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>


<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user_id: localStorage.getItem('user_id'),
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

