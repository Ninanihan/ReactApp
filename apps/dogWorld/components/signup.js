 var React = require('react');
 
     var Link = require('react-router').Link
     var Signup = React.createClass({
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
    type: 'POST',
    dataType: 'json',
    data: {
      email: email,
      password: password.toString()
    },
    success: function(data) {
        
        alert("Register successful")
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(self.props.url, status, err.toString());
      }.bind(this)
    });
  },

      render: function(){
      return (
      
      <div className ="background1">
      <br/> <br/> <br/> <br/> <br/> <br/><br/> <br/>
      <div className ="row">
      <div className="col-md-3 col-md-offset-7">
        
        <h1>SIGN UP</h1>
          <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2">Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input type="text" className="form-control" placeholder="Email" aria-describedby="sizing-addon2"
          value={this.state.email} onChange={this.handleChange.bind(this,'email')}/>
          </div>
          <br/>
          <div className="input-group">
            <span className="input-group-addon" id="sizing-addon2">Password</span>
            <input type="password" className="form-control" placeholder="Password" aria-describedby="sizing-addon2"
          value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
          </div>
          
          <br/>
          <br/>
          <div style={{"textAlign": "center"}}>
            <Link to = "/login"><button type= "submit" className="btn btn-primary btn-lg" onClick={this.handleSubmit} value="SignUp"
        >Sign up</button></Link>
          </div>
        </div>
        </div>
  <br/> <br/> <br/> <br/> <br/> <br/><br/> <br/> <br/> <br/> 
  </div>
      
      
     
);
}
     });

module.exports = Signup; 