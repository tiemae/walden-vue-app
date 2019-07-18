<template>
  <div class="posts-new">


    <!-- CONTACT -->
    <section class="module">

      <div class="container">

        <!-- MODULE TITLE -->
        <div class="row">

          <div class="col-sm-6 col-sm-offset-3">

            <h2 class="module-title align-center font-alt">Create A Post</h2>

            <div class="module-subtitle align-center font-inc">
              We're all in this together, and it's up to you to share your wisdom.
            </div>

          </div>

        </div>
        <!-- /MODULE TITLE -->


        <!-- CONTACT FORM -->
        <div class="row">

          <div class="col-sm-6 col-sm-offset-3">

            <form id="contact-form" role="form" novalidate="" v-on:submit.prevent="submit()">

              <div class="form-group">
                <label class="sr-only" for="cname">Title</label>
                <input type="text" id="cname" class="form-control" name="cname" placeholder="Title" required="" v-model="title" data-validation-required-message="Please enter a title." aria-invalid="false">
                <p class="help-block text-danger"></p>
              </div>

              <div class="form-group">
                <label class="sr-only" >Image</label>
                <input type="text" class="form-control" placeholder="paste your image url" required="" data-validation-required-message="Please add a photo." v-model="imageUrl">
                <p class="help-block text-danger"></p>
              </div>

              <div class="form-group">
                <textarea class="form-control" rows="7" placeholder="Tell your story...or...share some wisdom..." required="" data-validation-required-message="Don't forget to share your story!"  v-model="text"></textarea>
                <p class="help-block text-danger"></p>
              </div>

              <button type="submit" class="btn btn-round btn-g">Publish</button>

            </form>

          </div>

        </div>
        <!-- /CONTACT FORM -->
      </div>
    </section>












    <!--OLD-->
<!--     <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>CREATE A POST</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>TITLE:</label> 
          <input type="text" required class="form-control" v-model="title">
        </div>
        <div class="form-group col-md-12">
          <label for="imageUrl">IMAGE</label>
          <input type="text" required class="form-control" id="imageUrl" placeholder="paste your image link" v-model="imageUrl">
        </div>        
         <div class="form-group">
          <textarea class="form-control" v-model="text" required placeholder="Tell your story...or...share some wisdom..."></textarea> 
        </div>

      <div>
        <label>SELECT YOUR TAGS:</label>
        <div v-for = "tag in tags">
          <input type="checkbox" :value="tag.id" v-model="tagIds"> {{ tag.name }}
          <img v-bind:src="tag.image_url" alt="" height="50px" width="auto"><br>
        </div>
      </div>

        <input type="submit" class="btn btn-primary" value="PUBLISH">
      </form>
    </div> -->

    <!--OLD-->

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      title: "",
      text: "",
      imageUrl: "",
      tags: [],
      tagIds: [],
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
        title: this.title,
        text: this.text,
        image_url: this.imageUrl,
        tag_ids: this.tagIds
      };
      axios
        .post("/api/posts", params)
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