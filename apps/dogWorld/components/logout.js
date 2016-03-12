var React = require('react');

var Logout = React.createClass({
       getInitialState : function() {
       		localStorage.clear();
               	window.location.href = "http://127.0.0.1:8080/apps/dogWorld/#/login";
               return {
               
               } ;
            },
           render: function(){
          return (
          	<div></div>
          	)}
      });
exports.Logout = Logout; 