<template>
  <div class="users-show">




    <!-- ABOUT -->

    <section class="module p-b-0">

      <h1 class="module-title font-alt align-center">WELCOME, {{ user.first_name.toUpperCase()}}</h1>

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

<!-- USER INFO -->


    <div class="post-header">
      <div class="comment-header font-alt align-center">
          {{ user.email }} | HAIR-TYPE: {{ user.tag.name }} | <router-link v-bind:to="'/users/' + user.id + '/edit'"><button style="border:none;" type="submit" class="btn-g btn-xs"><u>EDIT PROFILE ></u></button></router-link> 
      </div>
    </div>

<!--     <h1>WELCOME, {{ user.first_name.toUpperCase()}}</h1>
    <img v-bind:src="user.image_url" alt="" contain height="500px" width="auto"><br>
    <router-link v-bind:to="'/users/' + user.id + '/edit'"><button>EDIT YOUR PROFILE</button></router-link>

    <h2>ACCOUNT EMAIL</h2>
    <p>{{ user.email }}</p>

    <h2>YOUR HAIR TYPE:</h2>
    <img v-bind:src="user.tag.image_url" class="text-center" contain height="100px" width="auto">
    <p>{{ user.tag.name }}</p>  -->


    <!-- HOME -->
    <section class="module-small">

      <div class="post-header">

      <div class="hs-caption container">
        <div class="caption-content">
          <div class="hs-title-size-1 font-inc">
            <blockquote>Life becomes difficult without self-love and more difficult when you think so low of yourself that you can’t stand the person you see every day in the mirror. It has happened to all of us at one point or another after something you did wrong or something you should have done but didn’t.</blockquote>

            <blockquote>We all need self-love in a decent dose.</blockquote>

            <blockquote><strong>Remember, self-love has very little to do with how you feel about your outer self. It’s about accepting all of yourself.</strong></blockquote>

          </div>
        </div>
      </div>
      </div>
    </section >
    <!-- /HOME -->



    <!-- DIVIDER -->
    <hr class="divider-w">
    <!-- /DIVIDER -->



    <section class="p-b-0">

      <div class="container">

        <div class="row multi-columns-row post-columns">



          <div class="post-header">
            <h1 class="module-title font-alt align-center"><small>YOUR POSTS:</small></h1>


            <div v-for="post in user.posts" class="col-sm-6 col-md-6 col-lg-6">

              <div class="post">
                <div class="post-thumbnail">
                  <router-link v-bind:to="'/posts/' + post.id"> <img v-bind:src="post.image_url"  ></router-link>
                </div>
                <h2 class="post-title font-alt text-center">{{ post.title }}</h2>
                <div class="post-meta font-inc text-center"> Published on {{post.created_at}} <br></div>
              </div>
            </div>
     

          </div>
        </div>
      
      </div>
    
    </section>

<!--     <h2> YOUR LATEST POSTS:</h2>

    <div v-for="post in user.posts">
      <h2 class="text-center">{{ post.title }}</h2>
      <p> Written by: {{ post.author }}</p>
      <p> Published on {{post.created_at}}</p>      
      <router-link v-bind:to="'/posts/' + post.id">
        <img v-bind:src="post.image_url" class="text-center" height="400px" width="auto">
     
      </router-link> <br>
 -->
<!--        <router-link v-bind:to="'/posts/' + post.id + '/edit'"><button>EDIT YOUR POST</button></router-link> -->

    </div>

<!-- /USER INFO -->

</section>
    <!-- /ABOUT -->




    <!-- <h1>WELCOME, {{ user.first_name.toUpperCase()}}</h1>
    <img v-bind:src="user.image_url" alt="" contain height="500px" width="auto"><br>
    <router-link v-bind:to="'/users/' + user.id + '/edit'"><button>EDIT YOUR PROFILE</button></router-link>

    <h2>ACCOUNT EMAIL</h2>
    <p>{{ user.email }}</p>

    <h2>YOUR HAIR TYPE:</h2>
    <img v-bind:src="user.tag.image_url" class="text-center" contain height="100px" width="auto">
    <p>{{ user.tag.name }}</p> 
     

    <h2> YOUR LATEST POSTS:</h2>

    <div v-for="post in user.posts">
      <h2 class="text-center">{{ post.title }}</h2>
      <p> Written by: {{ post.author }}</p>
      <p> Published on {{post.created_at}}</p>      
      <router-link v-bind:to="'/posts/' + post.id">
        <img v-bind:src="post.image_url" class="text-center" height="400px" width="auto">
     
      </router-link> <br>

      <router-link v-bind:to="'/posts/' + post.id + '/edit'"><button>EDIT YOUR POST</button></router-link> -->

<!--     </div> -->

   <!-- add html drop down for selecting (options) -->


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