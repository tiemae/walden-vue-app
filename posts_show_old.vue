    <div>
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


     <!--  <button v-if="comment.user.id == user_id" v-on:click="editComment(comment)">EDIT</button> -->

      <form v-if="comment.user.id == user_id" v-on:submit.prevent="editComment()">
        <h1>Edit Comment</h1>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
          <textarea v-model= "comment.text" placeholder="Write response here..."></textarea> <br>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>      

      <button v-if="comment.user.id == user_id" v-on:click="destroyComment(comment)">DELETE</button>
    <!-- 
      {{comment.user.id}}
      {{user_id}} -->

    </div>


    <div class="container">
      <form v-if="isLoggedIn()" v-on:submit.prevent="submit(comment)">
        <h1>NEW COMMENT</h1>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
          <textarea v-model= "text" required placeholder="Write your comment here..."></textarea> <br>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>

    <router-link v-if="post.user.id == user_id" v-bind:to="'/posts/' + post.id + '/edit'"><button>EDIT YOUR POST</button></router-link>

    <button v-if="post.user.id == user_id" v-on:click="destroyPost()">DELETE YOUR POST</button>

      <!-- v-if="post.user.id = $parent.user_id" -->

      <!--  {{post.user.id}} -->
      <!--    {{$parent.user.id}} this wouldn't load automatically, it needed a refresh :/ --> 
      <!--     {{user_id}} -->



      <!-- cccccccc  OLD ccccccccccc-->