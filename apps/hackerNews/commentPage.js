var api =  require ('./stubAPI').api;
    var React = require('react') ;
    var _ = require('lodash') ;

    var Form = React.createClass({
           getInitialState: function() {
               return { comment: '', name: ''};
            },
            handleCommentChange: function(e) {
                 this.setState({comment : e.target.value});
             },
             handleNameChange: function(e) {
                 this.setState({name: e.target.value});
             },
             onSubmit : function(e) {
                  e.preventDefault();
                  var comment = this.state.comment.trim();
                  var name = this.state.name.trim();
                  if (!comment ) {
                      return;
                  }
                  this.props.commentHandler(comment ,name );
                  this.setState({comment: '', name: ''});
             },
            render : function() {
                 return (
                   <form  style={{marginTop: '30px'}}>
                    <h3>Add a new comment</h3>

                    <div className="form-group">
                      <input type="text"  className="form-control"
                            placeholder="Comment" value={this.state.comment}
                            onChange={this.handleCommentChange} ></input>
                    </div>     
                    <div className="form-group">
                      <input type="text"  className="form-control"
                            placeholder="Your name" value={this.state.name}
                            onChange={this.handleNameChange} ></input>
                    </div>
                    <button type="submit" className="btn btn-primary"
                            onClick={this.onSubmit}>Submit</button>
                  </form>
                  );
              }
       });

       var Comment = React.createClass({
        handleVote : function() {
             this.props.upvoteHandler(this.props.comment.id);
        },
        render : function() {
            var lineStyle = {
                 fontSize: '20px', marginLeft: '10px'  };
            return (
               <div>
                  <span className="glyphicon glyphicon-thumbs-up"
                        onClick={this.handleVote}></span>
                    {this.props.comment.upvotes} - by {this.props.comment.author}
                  <span style={lineStyle} >
                    {this.props.comment.comment}
                  </span>
                </div>                
               );
          }
     }) ;

    var CommentList = React.createClass({
        render : function() {
          var items = this.props.comments.map(function(comment,index) {
                 return <Comment key={index} comment={comment} 
                          upvoteHandler={this.props.upvoteHandler}  /> ;
             }.bind(this) )
          return (
                <div>
                  {items}
                </div>
            );
        }
    }) ;  

    var CommentView = React.createClass({
        addComment : function(c,n) {
          api.addComment(this.props.params.postId,c,n);
          this.setState({});
      }, 
      incrementUpvote : function(commentId) {
           api.upvoteComment(this.props.params.postId,commentId) ;
           this.setState({});
      },    
      render: function(){
           var post = api.getPost(this.props.params.postId );
           if (post.link ) {
               line = <a href={post.link} >
                            {post.title} </a> ;
            } else {
               line = <span>{post.title} </span> ;
            }
          var comments = _.sortBy(post.comments, function(comment) {
                                 return - comment.upvotes;
                            }
                        ); 
          return (  
           <div className="container">
               <div className="row">
                  <div className="col-md-6 col-md-offset-3">
                     <div className="page-header">
                       <h3>{line} </h3>
                       <CommentList comments={comments} 
                            upvoteHandler={this.incrementUpvote } />
                       <Form post={post}  commentHandler={this.addComment} /> 
                     </div>
                   </div>
                </div>
              </div>
          );
      }
    });

    exports.CommentView = CommentView ;