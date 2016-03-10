// TODO
var ReactRouter = require('react-router')
    var Router = ReactRouter.Router
    var Route = ReactRouter.Route
    var Link = ReactRouter.Link
    var IndexRoute = ReactRouter.IndexRoute
var ReactDOM = require('react-dom')
    var React = require('react')
    var phones = require('./components/data').allPhones ;
    var _ = require('lodash');    //NEW
    var PhoneDetail = require('./components/phoneDetail.js' ).PhoneDetail ;
var Header = require('./components/header');
var Footer = require('./components/footer');
var Signup = require('./components/signup');
var ContactsApp = require('./components/contact').ContactsApp;

var About = React.createClass({  

  render: function() {
    return (
      <div>
      <h1> About </h1>
      </div>
      
    );
  } 
  }) ;


    var SelectBox = React.createClass({
      handleChange : function(e, type,value) {
           e.preventDefault();
           this.props.onUserInput( type,value);
      },
      handleTextChange : function(e) {
            this.handleChange( e, 'search', e.target.value);
      },
      handleSortChange : function(e) {
          this.handleChange(e, 'sort', e.target.value);
      },
      render: function(){
           return (
                <div className="col-md-10">
               <input type="text" placeholder="Search" 
                          value={this.props.filterText}
                          onChange={this.handleTextChange} />
                 Sort by:
                  <select id="sort" value={this.props.order } 
                         onChange={this.handleSortChange} >
                     <option value="name">Alphabetical</option>
                     <option value="age">Newest</option>
                 </select>
             </div>
               );
          }
       });

    // TODO (missing component)
    var PhoneItem = React.createClass({
      render: function(){
           return (
                <li className="thumbnail phone-listing">
                  <Link to={'/phones/' + this.props.phones.id} className="thumb">
                       <img src={this.props.phones.imageUrl} /> </Link>
                  <Link to={'/phones/' + this.props.phones.id}> {this.props.phones.name}</Link>
                  <p>{this.props.phones.snippet}</p>
                </li>
               ) ;
         }
     }) ;   

     var FilteredPhoneList = React.createClass({
          render: function(){
              var displayedPhones = this.props.phones.map(function(phone) {
                  return <PhoneItem key={phone.id} phones={phone} /> ;
              }) ;
              return (
                      <div className="col-md-10">
                        <ul className="phones">
                            {displayedPhones}
                        </ul>
                      </div>
                  ) ;
          }
      });

    var PhoneCatalogueApp = React.createClass({
      getInitialState: function() {
           return { search: '', sort: 'name' } ;
      },
      handleChange : function(type,value) {
            if ( type == 'search' ) {
                this.setState( { search: value } ) ;
              } else {
                 this.setState( { sort: value } ) ;
              }
      }, 
      render: function(){
           //console.log('Criteria: Search= ' + this.state.search + ' ; Sort= ' this.state.sort);
           var list = phones.filter(function(p) {
                  return p.name.toLowerCase().search(this.state.search.toLowerCase() ) != -1 ;
                }.bind(this) );
          var filteredList = _.sortBy(list, this.state.sort) ;
           return (
                <div className="view-container">
                <div className="view-frame">
                   <div className="container-fluid">
                   <div className="row">
                      <SelectBox onUserInput={this.handleChange } 
                             filterText={this.state.search} 
                             sort={this.state.sort} />
                       <FilteredPhoneList phones={filteredList} />
                  </div> 
                  </div>                   
                </div>
              </div>
          );
      }
    });

var App = React.createClass({
      render : function() {
        return (
          <div>
          <Header />
            <h1>Phone Catalogue </h1>
            {this.props.children}
            <Footer />
          </div>
        )
      }
    });

    ReactDOM.render( (
      <Router >
        <Route path="/" component={App}>
        <Route path="about" component={About} />
        <Route path="signup" component={Signup} />
        <Route path="contact" component={ContactsApp} />
        
           <IndexRoute component={PhoneCatalogueApp}/>
           <Route path="phones/:id" component={PhoneDetail} />
        </Route>
      </Router>
    ),
      document.getElementById('mount-point')
    );