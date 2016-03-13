 var React = require('react');
 var Link = require('react-router').Link
 var _ = require('lodash');

     var Login = React.createClass({
      getInitialState: function(){
    return{
           email: '',
           password: ''
    };
  },

  handleChange:function(userdata, event){
    var newState={};
    newState[userdata]=event.target.value;
    this.setState(newState);

  },
  handleSubmit:function(e){
    e.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password.trim();
    if(!email || !password) {
      alert("please input email or password")
      return;
    }

  //var words = ["Hi", this.state.email, this.state.password];
  //alert(words.join(""));
  var self = this;

    $.ajax({
    url: "http://localhost:3000/users",
    type: 'GET',
    dataType: 'json',
    success: function(data) {
       var result =  _.find(data, { 'email': email, 'password': Number(password) });
      if(result) {
        alert('Logged In');
        localStorage.setItem('user',email);
        window.location.href = "http://127.0.0.1:8080/apps/dogWorld";
      }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(self.props.url, status, err.toString());
      }.bind(this)
    });
  },

      render: function(){
      return (

<form style={{"textAlign": "center"}}>
<div className="col-md-4">
<br/><br/>
<h1>LOG IN</h1>
  <div class="input-group">
    <span className="input-group-addon" id="sizing-addon2">Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <input type="text" className="form-control" placeholder="Enter email" aria-describedby="sizing-addon2"
          value={this.state.email} onChange={this.handleChange.bind(this,'email')} />
  </div>
  <br/>
  <div class="input-group">
    <span className="input-group-addon" id="sizing-addon2">Password</span>
    <input type="password" className="form-control" placeholder="Password" aria-describedby="sizing-addon2"
           value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
  </div>
  
  <br/>
  <button type="submit" className="btn btn-primary btn-lg" onClick={this.handleSubmit} value="SignUp" >Login</button>
  <br/>
  <li><Link to="/signup">Create an new account?</Link></li></div>
</form>

);
}
     });

module.exports = Login; 