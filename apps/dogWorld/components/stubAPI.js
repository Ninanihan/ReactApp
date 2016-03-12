 var _ = require('lodash');

    var comment = [
             {  id: 1 ,
                username : 'jbloggs',
                comment : 'dsfa',
                upvotes : 10
              },
             { 
                id: 2,
                username : 'notme',
                comment : 'afdf',
                upvotes : 12
              }
              
              
          ] ;


     var stubAPI = {
          getAll : function() {
              return comment ;
          },
         add : function(c,u) {
              var id = 1 ;
              var last = _.last(comment) ;
              if (last) {
                 id = last.id + 1 ;
              }
              console.log( 'Id =  ' + id);
              comment.push({ 'id': id,  
                  comment: c, username : u,   upvotes: 0 }) ;

              },
         upvote : function(id) {
                 var index = _.findIndex(comment, function(comment) {
                        return comment.id == id;
                      } );      
                   if (index != -1) {                 
                      comment[index].upvotes = comment[index].upvotes + 1 ;
                      }
              },
          
          getComment : function(id) {
               var result = null ;
                 var index = _.findIndex(comment, function(comment) {
                        return comment.id == id;
                      } );      
                   if (index != -1) {                 
                      result = comment[index];
                      }
              return result ;
              },
         addComment : function(commentId,c,u) {
              comment = this.getComment(commentId ) ;
              var id = 1 ;
              var last = _.last(comment.comment) ;
              if (last) {
                 id = last.id + 1 ;
              }
              comment.comment.push({ 'id': id,  
                       comment: c , username: u, upvotes: 0 } ) ;

              },
         upvoteComment : function(commentId,usernameId) {
              comment = this.getComment(commentId ) ;
              var index = _.findIndex(comment.comment, function(c) {
                        return c.id == commentId;
                      } );      
               if (index != -1) {                 
                   comment.comment[index].upvotes += 1 ;
                  }
              }
          }
    exports.api = stubAPI ;