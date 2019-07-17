<template>
  <div class="posts-index">

    <section class="module">

      <div class="container">

        <div class="row">

          <div class="col-sm-8 col-sm-offset-2">

            <!-- POST -->

            <div class="post">

              <div class="post-thumbnail">
                <img v-bind:src="post.image_url">
              </div>

              <div class="post-header">
                <h1 class="post-title font-alt">{{ post.title }}</h1>
                <div class="post-meta font-inc">
                  By {{post.author}} | {{post.created_at}}
                </div>
              </div>

              <div class="post-entry">

                <p> {{post.text}} </p>

              </div>

            </div>
            <!-- /POST -->

            <!-- COMMENTS-->
            <div class="comments" >
              <h4 class="comment-title font-alt">comments</h4>
              <div v-for="comment in post.comments">
              <!-- COMMENT 1 -->
              <div class="comment clearfix">

                <div class="comment-avatar">
                  <img v-bind:src="comment.user.image_url">
                </div>

                <div class="comment-content clearfix">

                  <div class="comment-author font-inc">
                    {{comment.author}}
                  </div>

                  <div class="comment-body">
                    <p> {{comment.text}} </p>
                  </div>

                  <div class="comment-meta font-inc">
                    {{comment.created_at}}

                    <!-- Button trigger modal -->

                    <button v-if="isLoggedIn()" type="submit" class="btn btn-round btn-g btn-xs" data-toggle="modal" data-target="#exampleModalCenter">
                      Reply
                    </button>

                    <!-- Modal -->
                    <div class="modal fade comment-body" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Reply To This Comment</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <form>
                              <ul>
                                <li v-for="error in errors">{{ error }}</li>
                              </ul>
                              <div class="form-group">
                                <textarea class="form-control font-inc" rows="6" v-model= "reply_text" required placeholder="Write your reply here...""></textarea>
                              </div>
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-round btn-g btn-xs" v-on:click="submit_reply(comment)">Submit Reply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                     <!-- Modal -->

                  </div>

                </div>

                <!-- COMMENT 2 -->
                <div class="comment clearfix" v-for="reply in comment.replies">

                  <div class="comment-avatar">
                    <img v-bind:src="reply.user.image_url">
                  </div>

                  <div class="comment-content clearfix">

                    <div class="comment-author font-inc">
                      {{reply.author}}
                    </div>

                    <div class="comment-body">
                      <p>{{ reply.text }}</p>
                    </div>

                    <div class="comment-meta font-inc">
                      {{ reply.created_at}}
                    </div>

                    <button v-if="reply.user.id == user_id" v-on:click="destroyReply(comment, reply)" type="submit" class="btn btn-round btn-danger btn-xs">DELETE</button>

                  </div>

                </div>
                <!-- /COMMENT 2 -->

              </div>
              <!-- /COMMENT 1 -->

              </div>

            </div>
            <!-- /COMMENTS -->

            <!-- COMMENT FORM -->
            <div class="comment-form">
              <h4 class="comment-form-title font-alt">Add your comment</h4>

              <form method="post">

                <div class="form-group">
                  <label class="sr-only" for="name">Name</label>
                  <input type="text" id="name" class="form-control" name="name" placeholder="Name">
                </div>

                <div class="form-group">
                  <label class="sr-only" for="email">Name</label>
                  <input type="text" id="email" class="form-control" name="email" placeholder="E-mail">
                </div>

                <div class="form-group">
                  <textarea class="form-control" id="comment" name="comment" rows="6" placeholder="Comment"></textarea>
                </div>

                <button type="submit" class="btn btn-round btn-g">Post comment</button>

              </form>

            </div>
            <!-- COMMENT FORM -->

          </div>

        </div>

      </div>

    </section>
    <!-- /BLOG SINGLE -->
















    <!-- cccccccccc OLD cccccccccccc-->

  <!--   <div>
    <img v-bind:src="post.image_url" height="500px" width="auto">
    <h2>{{ post.title }}</h2>
    <p> writen by: {{ post.author }}</p>
    <p> Published on {{post.created_at}} </p> 
    <p class="text-center text-nowrap"> {{ post.text }} </p>
    </div>

    <h2>Comments</h2>
    <div v-for="comment in post.comments">
      <img v-bind:src="comment.user.image_url" height="50px" width="auto"><br><span>Comment by: {{comment.author}}</span>
      <p>{{ comment.text }}</p>

        <form v-if="isLoggedIn()" v-on:submit.prevent="submit_reply(comment)">
        <p>NEW REPLY</p>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
          <textarea v-model= "reply_text" required placeholder="Write reply here..."></textarea> <br>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>


      <div v-for="reply in comment.replies">
        <img v-bind:src="reply.user.image_url" height="50px" width="auto"><br>
        <span>Reply from: {{reply.author}}</span>
        <p>{{ reply.text }}</p>

        <button v-if="reply.user.id == user_id" v-on:click="destroyReply(comment, reply)">DELETE</button>

      </div>


      <button v-if="comment.user.id == user_id" v-on:click="editComment(comment)">EDIT</button>

      <form v-if="comment.user.id == user_id" v-on:submit.prevent="editComment()">
        <h1>Edit Comment</h1>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
          <textarea v-model= "comment.text" placeholder="Write response here..."></textarea> <br>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>      

      <button v-if="comment.user.id == user_id" v-on:click="destroyComment(comment)">DELETE</button>
      
      {{comment.user.id}}
      {{user_id}} -->

    <!-- </div>


    <div class="container">
      <form v-if="isLoggedIn()" v-on:submit.prevent="submit(comment)">
        <h1>NEW COMMENT</h1>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
          <textarea v-model= "text" required placeholder="Write your comment here..."></textarea> <br>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form> -->
    <!-- </div>

    <router-link v-if="post.user.id == user_id" v-bind:to="'/posts/' + post.id + '/edit'"><button>EDIT YOUR POST</button></router-link>

    <button v-if="post.user.id == user_id" v-on:click="destroyPost()">DELETE YOUR POST</button> --> -->

      <!-- v-if="post.user.id = $parent.user_id" -->

      <!--  {{post.user.id}} -->
      <!--    {{$parent.user.id}} this wouldn't load automatically, it needed a refresh :/ --> 
      <!--     {{user_id}} -->



      <!-- cccccccc  OLD ccccccccccc-->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      post: {},
      errors: [],
      user_id: localStorage.getItem('user_id'),
      text: "", 
      reply_text: "",
    };
  },
  created: function() {
    axios.get("/api/posts/" + this.$route.params.id).then(response => {
      this.post = response.data;
      console.log(this.post);
    });    
  },
  methods: {
    submit: function() {
      var params = {
      text: this.text,
      post_id: this.post.id 
      // this would also work this.$route.params.id 
    };
    axios
      .post("/api/comments", params)
      .then(response => {
        console.log(response.data); 
        this.post.comments.push(response.data);
        this.text = "";
      })
      .catch(error => {
        this.errors = error.response.data.errors;
    });

    },
    submit_reply: function(comment) {
      var params = {
      text: this.reply_text,
      comment_id: comment.id 
      // this would also work this.$route.params.id 
    };
    axios
      .post("/api/replies", params)
      .then(response => {
        console.log(response.data); 
        comment.replies.push(response.data);
        this.reply_text = "";
      })
      .catch(error => {
        this.errors = error.response.data.errors;
    });

    },    
    editComment: function(comment) {
      var params = {
      text: this.text,
    };
      axios
      .patch("/api/comments/" + this.comment.id).then(response => {
        console.log("Comment Updated");
    });
    },

    destroyPost: function() {
      axios
      .delete("/api/posts/" + this.$route.params.id)
      .then(response => {
        console.log("Post Deleted");
        this.$router.push("/posts");   
      });
    },
    destroyReply: function(comment, reply) {
      axios
      .delete("/api/replies/" + reply.id)
      .then(response => {
        console.log("Reply Deleted");
        var index = comment.replies.indexOf(reply);
          comment.replies.splice(index, 1);    
      });
    },    
    destroyComment: function(comment) {
      axios
      .delete("/api/comments/" + comment.id)
      .then(response => {
        console.log("Comment Deleted"); 
        var index = this.post.comments.indexOf(comment);
          this.post.comments.splice(index, 1);        
      });
    },   
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