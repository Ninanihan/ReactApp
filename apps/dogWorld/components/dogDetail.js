var React = require('react')
var request = require('superagent') ; 
var api =  require ('./stubAPI').api;
var _ = require('lodash');
var Form = React.createClass({
               getInitialState: function() {
                   return { comment: '', username: ''};
                },
                addComment: function(e) {
                    this.setState({comment: e.target.value});
                },
                addUsername: function(e) {
                    this.setState({username: e.target.value});
                },
                addRecord: function(e){
                    e.preventDefault();
                    var comment = this.state.comment.trim();
                    var username = this.state.username.trim();
                    if (!comment) {
                            return;
                    }
                    this.props.addCommentHandler(comment,username);
                    this.setState({comment: "",username: ""});
                },
                render : function() {
                     return (
                       <form style={{marginTop: '30px'}}>
                          <h3>Add a new comment</h3>
                          <div className="form-group">
                            <input type="text"
                              className="form-control" placeholder="comment"
                              value={this.state.comment} onChange={this.addComment} ></input>
                          </div>
                          <div className="form-group">
                            <input type="text"
                               className="form-control" placeholder="username"
                               value={this.state.username} onChange={this.addUsername} ></input>
                          </div>
                          <button type="submit" className="btn btn-primary" onClick={this.addRecord} >comment</button>
                        </form>
                      );
                  }
           });

        var NewsItem = React.createClass({
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
                    {this.props.comment.upvotes} - by {this.props.comment.username}
                  <span style={lineStyle} >
                    {this.props.comment.comment}
                  </span>
                </div>                
               );
                }
           }) ;

           var NewsList = React.createClass({
                render : function() {
                  var items = this.props.comment.map(function(comment,index) {
                         return <NewsItem key={index} comment={comment} 
                                  upvoteHandler={this.props.upvoteHandler}  /> ;
                     }.bind(this) )
                  return (
                    <div>
                          {items}
                          </div>
                    );
                }
           }) ;  

          var HackerApp = React.createClass({ 
              incrementUpvote : function(id) {
                   api.upvote(id) ;
                   this.setState({});
              }, 
              addComment : function(comment,username){
                   api.add(comment,username) ;
                   this.setState({});
              },   
              render: function(){
                  var comment = _.sortBy(api.getAll(), function(comment) {
                          return - comment.upvotes;
                       }
                    );
                  return (
                  <div >
                    <NewsList comment={comment} 
                    upvoteHandler={this.incrementUpvote} />
                    <Form addCommentHandler={this.addComment}  />
                  </div>
                  );
              }
          });

 


    var ImagesSection = React.createClass({
          render: function(){
                var thumbImages = this.props.dog.images.map(function(img,index) {
                  return (
                          <li>
                           <img key={index} src={img} />
                        </li>
                        ) ;
                    }.bind(this) );
                var mainImage = (
                      <div className="dog-images">
                      <img src={this.props.dog.images[0]} 
                            className="dog" />
                    </div>
                    ) ;
              return (
                  <div>
                       {mainImage}
                       <h1>{this.props.dog.name}</h1>
                       <p>Price: € {this.props.dog.price}</p>
                       
                       <ul className="dog-thumbs">
                           {thumbImages}
                       </ul>
                   </div>
                   );
          }
    })

    
    var DogDetail = React.createClass({
           getInitialState: function() {
               return { dog: null };
           },
         componentDidMount: function() {
            request.get(
                 'assets/dogs/' + this.props.params.id + '.json', function(err, res) {
                     var json = JSON.parse(res.text);
                    if (this.isMounted()) {
                        this.setState({ dog : json});
              }
            }.bind(this));
          } ,
          render: function(){
              var display = <p>No dog details</p> ; 
                var dog = this.state.dog ;
              if (dog) {
                  display =  (
                        <div>
                      <ImagesSection dog={dog} />
                      <HackerApp />
                      
                       </div>
                       ) ;
              }
                return (
                        <div>
                      {display}
                    </div>
                    );
          }
        });

    exports.DogDetail = DogDetail ;