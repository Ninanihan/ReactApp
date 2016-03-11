var React = require("react");
var Link = require('react-router').Link;

var Header = React.createClass({
  render : function() {
    return (
      <div className="navbar navbar-fixed-top navbar-inverse" >
            <div className="container">
              <Link to="/" id="logo" >App</Link>
              <nav>
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/">Home</Link></li>
                    
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                     <li><Link to="/signup">Signup</Link></li>
                     <li><Link to="/login">Login</Link></li>
                    <li className="dropdown">
                      <Link to="#" className="dropdown-toggle" data-toggle="dropdown">
                        Account <b className="caret"></b>
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