var React = require("react");
var Link = require('react-router').Link;

var Header = React.createClass({
  getInitialState: function(){
    return{
      
    };
  },
  render : function() {
    return (
      <div className="navbar navbar-fixed-top navbar-inverse" >
            <div className="container">
              <Link to="/" id="logo" >App</Link>
              <nav>
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/welcome">Welcome</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                     
                    <li className="dropdown">
                      <Link to="/logout" className="dropdown-toggle">
                        Logout
                      </Link>
                      <ul className="dropdown-menu">
                        <li><Link to="/about">Profile</Link></li>
                       
                                    
                      </ul>
                    </li>
                  </ul>
              </nav>
            </div>
          </div>
      );
  }
  });

 module.exports = Header; 