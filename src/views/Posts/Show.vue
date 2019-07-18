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

                <span v-html="post.text"></span>

              </div>

            </div>
            <!-- /POST -->

            <!-- COMMENT SECTION-->
            <div class="comments" >
              <h4 class="comment-title font-alt">comments</h4>
              <div v-for="comment in post.comments">
              <!-- COMMENT -->

                <!-- COMMENT CONTENT-->
                <div class="comment clearfix">
               
                  <div class="circular-landscape">
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
                  
                <!-- /COMMENT CONTENT-->

                <!-- BUTTON TOOLBAR CONTAINER -->
                  <div class=btn-toolbar>

                  <!-- NEW REPLY BUTTON TRIGGER MODAL -->
                  <button v-if="isLoggedIn()" v-on:click="currentComment = comment" type="submit" class="btn btn-round btn-g btn-xs" data-toggle="modal" data-target="#exampleModalCenter">
                    Reply
                  </button>
                  <!-- /NEW REPLY BUTTON TRIGGER MODAL -->

                  <!-- DELETE COMMENT BUTTON -->

                  <button v-if="comment.user.id == user_id" v-on:click="destroyComment(comment)" type="submit" class="btn btn-round btn-d btn-xs">DELETE</button>

                  <!-- DELETE COMMENT BUTTON -->

                  <!-- EDIT COMMENT BUTTON TRIGGER MODAL -->
                  <button v-if="comment.user.id == user_id" v-on:click.once="currentComment = comment" type="submit" class="btn btn-round btn-g btn-xs" data-toggle="modal" data-target="#exampleModalCenter1">
                    EDIT
                  </button>
                  <!-- /EDIT COMMENT BUTTON TRIGGER MODAL -->

                  </div>
                    <!-- NEW REPLY MODAL -->
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
                            <form v-on:submit.prevent="submit()">
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
                            <button type="submit" class="btn btn-round btn-g btn-xs" data-dismiss="modal" v-on:click.once="submit_reply(currentComment)">Submit Reply</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- /BUTTON TOOLBAR CONTAINER -->

                     <!-- /NEW REPLY MODAL -->

                     <!-- EDIT COMMENT MODAL -->
                     <div class="modal fade comment-body" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                       <div class="modal-dialog modal-dialog-centered" role="document">
                         <div class="modal-content">
                           <div class="modal-header">
                             <h5 class="modal-title" id="exampleModalLongTitle">Edit This Comment</h5>
                             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                               <span aria-hidden="true">&times;</span>
                             </button>
                           </div>
                           <div class="modal-body">
                             <form v-on:submit.prevent="editComment(currentComment)">
                               <ul>
                                 <li v-for="error in errors">{{ error }}</li>
                               </ul>
                               <div class="form-group">
                                 <textarea class="form-control font-inc" rows="6" v-model= "currentComment.text" required placeholder="comment.text"></textarea>
                               </div>
                             </form>
                           </div>
                           <div class="modal-footer">
                             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                             <button type="submit" class="btn btn-round btn-g btn-xs" data-dismiss="modal">Submit</button>
                           </div>
                         </div>
                       </div>
                     </div>
                      <!-- /EDIT COMMENT MODAL -->

                      
                  </div>
                </div>
                <!-- REPLY SHOW-->
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

                    <button v-if="reply.user.id == user_id" v-on:click="destroyReply(comment, reply)" type="submit" class="btn btn-round btn-d btn-xs">DELETE</button>

                  </div>
                </div>
                <!-- /REPLY SHOW-->
              </div>

              <!-- /COMMENT -->
              </div>
            </div>
            <!-- /COMMENTS SECTION -->

            <!-- NEW COMMENT FORM -->
            <div class="comment-form">
              <h4 class="comment-form-title font-alt">Add your comment</h4>

              <form v-if="isLoggedIn()" v-on:submit.prevent="submit(comment)">

                <div class="form-group">
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                  <textarea class="form-control" rows="6" v-model= "text" required placeholder="Write your comment here..."></textarea>
                </div>

                <button type="submit" class="btn btn-round btn-g">Post comment</button>

              </form>

            </div>
            <!-- /NEW COMMENT FORM -->

          </div>

        </div>


        <div class="comment-form">

          <router-link v-if="post.user.id == user_id" v-bind:to="'/posts/' + post.id + '/edit'"><button type="submit" class="btn btn-round btn-g col-sm-4 col-sm-offset-2">EDIT YOUR POST</button></router-link>

          <button v-if="post.user.id == user_id" v-on:click="destroyPost()" type="submit" class="btn btn-round btn-d col-sm-4 col-sm-offset-0">DELETE YOUR POST</button>
        </div>
      </div>

    </section>
    <!-- /BLOG SINGLE -->


  </div>
</template>

<style>
  .circular-landscape {
    display: inline-block;
    position: relative;
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 50%;
    float: left;
    margin-top: 10px;
  }

  .circular-landscape img {
    width: auto;
    height: 100%;

  }
</style>

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
      currentComment: {}
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