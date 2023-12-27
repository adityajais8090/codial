            {
            let createPost = function(){
                let newPostForm = $('#new-post-form');
                newPostForm.submit(function(e){
                    e.preventDefault();
                    

                    $.ajax({
                        type:'post',
                        url:'/posts/create',
                        data: newPostForm.serialize(),
                        success: function(data){
                            let newPost = newPostDom(data.data.post);
                            $('#post-list-container>ul').prepend(newPost);
                            deletePost($(' .delete-post-button', newPost));
                            
                        }, error: function(err){
                            console.log(err.responseText);
                        }
                    })
                })};

                let newPostDom = function (post) {
                    return $(`<li id="post-${post._id}">
                    <p>
                            <small>
                                <a class = "delete-post-button" href="/posts/destroy/${post._id}">X</a>
                            </small>
                            ${post.content}
                            <br>
                            <small>
                                ${post.user.name}
                            </small>
                            </p>
                            <div id="post-comment"> 
                                <form action="comments/create" id="new-comment-form" method="POST">
                                    <input type="text" name="comments" placeholder="Type Comment here">
                                    <input type="hidden" name="post" value="${post._id}">
                                    <input type="submit" value="Comment">
                                </form>
                            
                            <div class="post-comment-list">
                                <ul id="post-comments-${post._id}">
                                    <p>
                                    
                                    </p>
                                </ul>
                            </div>
                            </div>
                        </li>
                    `);
                }

                //method to delete a post from DOM
                let deletePost = function(deleteLink){
                    console.log("Delete post function called");

                $(deleteLink).click(function(e){
                    e.preventDefault();

                    $.ajax ({
                        type:'get',
                        url: $(deleteLink).prop('href'),
                        success: function(data){
                         $(`#post-${data.data.post_id}`).remove();

                        },error : function(err){
                            console.log(err.responseText);
                        },
                    });
                })
            }

            // let createComment = function(){
            //     let newCommentForm = $(`#new-comment-form`);
            //     newCommentForm.submit(function(e){
            //         e.preventDefault();

            //         $.ajax({
            //             type:'post',
            //             url:'comments/create',
            //             data: newCommentForm.serialize(),
            //             success: function(data){
            //                 console.log('Received data:', data);
            //                 let newComment = newCommentDom(data.data.post_comment);
            //                 console.log('New Comment:', newComment);
            //                 $(`#post-comments-${postId}`).prepend(newComment);
            //             }
            //             , error: function(err){
            //                 console.log('AJAX Error - Response Text:', err.responseText);
            //             }
            //         })
            //     })
            // }

            // //method to create a comment from DOM
            // let newCommentDom = function(comment){
            //     return (` <li id ="comment-${ comment._id }">
            //         <small>
            //                 <a class = "delete-comment-button"href = "/comments/destroy/${ comment._id }">X</a>
            //         </small>
                
            //         ${ comment.content } 
            //     <br>
            //     <small>
            //         ${ comment.user.name }
            //     </small>
            //     </li> 
            //     `);
            // }
            // createComment();
            createPost();
            
            }
