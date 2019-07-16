<template>
  <div class="posts-index">

  <div class="wrapper">

    <section class="module p-b-0">

      <div class="container">

        <div class="row">

          <div class="col-sm-6 col-sm-offset-3">
          <!-- <div class="col-sm-6 col-md-6 col-lg-6"> -->

            <!-- POST WITH IMAGE -->
            <div class="post">

              <div v-for="post in filterBy(posts, $parent.searchFilter)">
                <router-link v-bind:to="'/posts/' + post.id">
                  <div class="post-thumbnail">
                  <img v-bind:src="post.image_url">
                  </div>
                </router-link>  

                <div class="post-header">
                  <h1 class="post-title font-alt">{{ post.title }}</h1>
                  <div class="post-meta font-inc">
                    By {{ post.author}} | {{post.created_at}}
                  </div>
                  <div class="post-more font-inc">
                    <router-link v-bind:to="'/posts/' + post.id" class="more-link">Read more</router-link>
                  </div> 
                </div>










<!--                 <div class="post-header">
                  <h2 class="post-title font-alt">{{ post.title }}</h2>
                </div>
                <p class="post-meta font-inc"> Written by: {{ post.author }}</p>
                <p class="post-meta font-inc"> Published on {{post.created_at}}</p> 
                <div class="post-more font-inc">
                  <router-link v-bind:to="'/posts/' + post.id" class="more-link">Read more</router-link>
                </div> -->
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>   

        <!-- PAGINATION -->
    <section class="module-small p-t-10">

      <div class="container">
      
        <div class="pagination font-inc text-uppercase">
      
          <a href="#"><i class="fa fa-angle-left"></i> Prev</a>
          <a href="#">Next <i class="fa fa-angle-right"></i></a>
      
        </div>
      
      </div>

    </section>
    <!-- /PAGINATION --> 

  </div>
    
    
    
<!--     <div v-if="$parent.isLoggedIn()" v-for="post in filteredPosts">
      <h2 class="text-center">{{ post.title }}</h2>
      <p> Written by: {{ post.author }}</p>
      <p> Published on {{post.created_at}}</p> 

      <router-link v-bind:to="'/posts/' + post.id">
        <img v-bind:src="post.image_url" class="text-center" height="400px" width="auto">
      </router-link>  
    </div> -->
<!--     <div v-for="post in filterBy(posts, $parent.searchFilter)">
      <h2 class="text-center">{{ post.title }}</h2>
      <p> Written by: {{ post.author }}</p>
      <p> Published on {{post.created_at}}</p> 

      <router-link v-bind:to="'/posts/' + post.id">
        <img v-bind:src="post.image_url" class="text-center" height="400px" width="auto">
      </router-link>  
    </div> -->
<!--     <div v-else="$parent.!isLoggedIn()" v-for="post in filterBy(posts, $parent.searchFilter, 'posts.title')">
      <h2 class="text-center">{{ post.title }}</h2>
      <p> Written by: {{ post.author }}</p>
      <p> Published on {{post.created_at}}</p> 

      <router-link v-bind:to="'/posts/' + post.id">
        <img v-bind:src="post.image_url" class="text-center" height="400px" width="auto">
      </router-link>  
    </div> -->
<!--       <div> -->
<!--         <button v-on-click>SHOW ALL POSTS</button>
          <div v-for="post in filterBy(posts, $parent.searchFilter, 'posts.title'>
            <h2 class="text-center">{{ post.title }}</h2>
            <p> Written by: {{ post.author }}</p>
            <p> Published on {{post.created_at}}</p> 

          <router-link v-bind:to="'/posts/' + post.id">
            <img v-bind:src="post.image_url" class="text-center" height="400px" width="auto">
          </router-link> -->
<!--           </div>
      </div> -->
 
<!-- 
    <div v-else v-for="post in filterBy(posts, $parent.searchFilter, 'posts.title')">
      <h2 class="text-center">{{ post.title }}</h2>
      <p> Written by: {{ post.author }}</p>
      <p> Published on {{post.created_at}}</p> 

      <router-link v-bind:to="'/posts/' + post.id">
        <img v-bind:src="post.image_url" class="text-center" height="400px" width="auto">
      </router-link>  
    </div> -->

  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters"

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      posts: [],
      // filteredPosts: [],
      user: {},
      // tags: [],
    };
  },
  created: function() {
    axios.get("/api/posts").then(response => {
      this.posts = response.data;
      // this.posts.forEach(function(post){
      //   if (post.tag_ids.includes(this.user.tag_id)){
      //     this.filteredPosts.push(post)
      //   }
      // }.bind(this));
      // console.log(this.filteredPosts);
      console.log(this.posts);
    });
    axios.get("/api/users/me").then(response => {
      this.user = response.data;
      console.log(this.user);
    });    
    // axios.get("/api/tags").then(response => {
    //   this.tags = response.data;
    //   console.log(this.tags);
    // });    
  },
  methods: {
    submit: function() {
    },
  }
};
</script>