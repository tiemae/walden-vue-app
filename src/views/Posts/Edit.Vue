<template>
  <div class="posts-edit">      
    <div class="container">

        <section class="module p-b-0">

          <h1 class="module-title font-alt align-center">EDIT YOUR POST</h1>


          <div class="align-center form-group">
          <router-link class="font-inc comment clearfix" v-bind:to="'/posts/' + post.id">BACK TO POST ></router-link>
          </div>

          <div class="container">

            <div class="row">

              <div class="col-sm-8 col-sm-offset-2">

                <div class="post">

                <div class="post-thumbnail">
                  <img v-bind:src="post.image_url">
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      <div class="row">

      <div class="col-sm-6 col-sm-offset-3">

      <form id="contact-form" role="form" novalidate="" v-on:submit.prevent="submit()">
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label class="font-inc" for="imageUrl">IMAGE</label>
          <input class="form-control" type="text" v-model="post.image_url" placeholder=post.image_url >
        </div>         
        <div class="form-group">
          <label class="font-inc">TITLE:</label> 
          <input type="text" required class="form-control" v-model="post.title">
        </div> 

         <div class="form-group">
          <label class="font-inc">TEXT:</label> 
          <textarea class="form-control" rows="30" v-model="post.text" required placeholder="Tell your story...or...share some wisdom..."></textarea> 
        </div>

        <div class="align-center">
            <label class="comment clearfix font-alt"><a>SELECT TAGS FOR YOUR POST:</a></label>
            <div class="font-inc comment clearfix comment-author align-center row multi-columns-row post-columns" v-for = "tag in tags">
                <div class="">
                <input class="align-center post-body font-inc" type="checkbox" :value="tag.id" 
                v-model="tagIds"> <small> {{ tag.name }}</small>
                </div>
                <div class="">
                <img class="align-center resize" v-bind:src="tag.image_url">
              </div>
          </div>
        </div>



<!--         <div>
          <label class="comment clearfix font-inc">SELECT RElEVANT TAGS:</label>
            <div class="font-inc comment clearfix comment-author" v-for = "tag in tags">
              <input type="checkbox" :value="tag.id" v-model="tagIds"> {{ tag.name }}
              <img class="comment-avatar" v-bind:src="tag.image_url"><br>
            </div>
        </div> -->

        <div class="form-group align-center module-title">
          <input type="submit" class="btn btn-round btn-default" value="UPDATE">
        </div>

      </form>
      
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
      post: {},
      errors: [],
      tags: [],
      tagIds: [],
    };
  },

  created: function() {
    axios.get("/api/posts/" + this.$route.params.id).then(response => {
      this.post = response.data;
      console.log(this.post);
    });
    axios.get("/api/tags/").then(response => {
      this.tags = response.data;
      console.log(this.tags);
    });
  },  
  methods: {
    submit: function() {
      var params = {
        title: this.post.title,
        text: this.post.text,
        image_url: this.post.image_url || post.image_url,
        tag_ids: this.tagIds,
      };
      axios
        .patch("/api/posts/" + this.$route.params.id, params)
        .then(response => { 
          console.log("Success!", response.data);
          this.$router.push("/posts");
        })
        .catch(error => {
          console.log(response.data);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>