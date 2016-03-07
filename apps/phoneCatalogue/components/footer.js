var React = require("react");
var Link = require('react-router').Link;

var Footer = React.createClass({
  render : function() {
    return (
      <footer className="footer">
          <nav>
            <ul>
               <li><Link to="/about">Help</Link></li>
               <li><Link to="/inbox">Contacts</Link></li>
               <li><a href="http://news.railstutorial.org/">News</a></li>
            </ul>
          </nav>
        </footer>
      ) ;
  }
});

module.exports = Footer; 