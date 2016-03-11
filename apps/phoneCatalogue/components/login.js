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
        window.location.href = "http://127.0.0.1:8080/apps/phoneCatalogue";
      }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(self.props.url, status, err.toString());
      }.bind(this)
    });
  },

      render: function(){
      return (
<form style={{"textAlign": "center"
          }}>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" name="email" id="exampleInputEmail1" placeholder="Enter email" 
    value={this.state.email} onChange={this.handleChange.bind(this,'email')} />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" name="password" id="exampleInputPassword1" placeholder="Password"
    value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
  </div>
  <button type="submit" class="btn btn-default" onClick={this.handleSubmit} value="SignUp" >Login</button>
  <li><Link to="/signup">Create an new account?</Link></li>
</form>
);
}
     });

module.exports = Login; 