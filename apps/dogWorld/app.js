// TODO
var ReactRouter = require('react-router')
    var Router = ReactRouter.Router
    var Route = ReactRouter.Route
    var Link = ReactRouter.Link
    var IndexRoute = ReactRouter.IndexRoute
var ReactDOM = require('react-dom')
    var React = require('react')
    var dogs = require('./components/data').allDogs ;
    var _ = require('lodash');    //NEW
    var DogDetail = require('./components/dogDetail.js' ).DogDetail ;
var Header = require('./components/header');
var Signup = require('./components/signup');
var Login = require('./components/login');
var ContactsApp = require('./components/contact').ContactsApp;
var Logout = require('./components/logout').Logout;
var Cart = require('./components/cart').Cart;


var Welcome = React.createClass({  
  render: function() {
    return (
      
        <div className ="background"> 
        <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> 
        <br/> <br/> <br/> <br/> <br/> <br/><br/> <br/>       
        <div className="row">
        <div className="col-md-3 col-md-offset-7" >  

      <h2><Link to = "/login"><button type= "submit" className="btn btn-primary btn-lg"> LOG IN </button></Link></h2>  
        <br/> <br/> <br/> <br/> <br/><br/> <br/> <br/> <br/>
       </div>
       </div>
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
            <form className="form-inline" style={{"textAlign": "center"}}>
               <div className="form-group">
               <input type="text" className="form-control" id="exampleInputName2" placeholder="Search" 
                          value={this.props.filterText}
                          onChange={this.handleTextChange} />
              </div>
              <div className="form-group">
              <label for="exampleInputEmail2">&nbsp;&nbsp;&nbsp;&nbsp;Sort by:&nbsp;&nbsp;</label>       
                  <select id="sort" className="form-control" value={this.props.order } 
                         onChange={this.handleSortChange} >
                     <option value="name">Alphabetical</option>
                     <option value="price">Price:Low to High</option>
                 </select>
             </div>
             <br/>
            <br/>
            </form>

               );
          }
       });

    // TODO (missing component)
    var DogItem = React.createClass({

      addToCart: function(){
       var flag = false;
        if(localStorage.getItem('carts')){  
        var that = this; 
          var updatedarray = 
            JSON.parse(localStorage.getItem('carts')).cartsarray;
            updatedarray.map(function(item){
              if(item == that.props.dogs.id){
                flag = true;
              }
            });
          if(flag == false){
            updatedarray.push(this.props.dogs.id);
            
            updatedarray = JSON.stringify({"cartsarray": updatedarray});
            localStorage.setItem('carts',updatedarray);
            this.props.refs();
            alert("Added successfully!");
          }else{
            alert("You have added!");
          }        
        }else{
          var carts = { "cartsarray" : []};
          carts.cartsarray.push(this.props.dogs.id);
          carts = JSON.stringify(carts);
          localStorage.setItem('carts',carts);
          this.props.refs();
          alert("Added successfully!");
          this.setState({});
        }
      },
      render: function(){
           return (
               
                <li className="thumbnail dog-listing">
                  <Link to={'/dogs/' + this.props.dogs.id} className="thumb">
                       <img src={this.props.dogs.imageUrl} className="img-circle"/></Link>
                  <Link to={'/dogs/' + this.props.dogs.id} className="font1">{this.props.dogs.name}</Link>
                  <br/>
                  <br/>
                  <p>Price: €{this.props.dogs.price}</p>

                  <button type="button" className="btn btn-default" onClick={this.addToCart}>Add To Cart</button>
                </li>
                
               ) ;
         }
     }) ;   

     var FilteredDogList = React.createClass({
      test: function() {
        this.setState({itemNumber: this.state.itemNumber+1});
        num = JSON.stringify(this.state.itemNumber + 1);
        localStorage.setItem('itemnumber',num);
      },

      getInitialState: function(){
        return{
          itemNumber: 0
        };
      },
          render: function(){
            var self = this;
              var displayedDogs = this.props.dogs.map(function(dog) {
                  return <DogItem key={dog.id} dogs={dog} refs={self.test}/> ;
              }) ;
              var num = JSON.parse(localStorage.getItem('itemnumber'));

              return (
                      <div className="col-md-10">
                       <Link to={'/cart'}>
                       <button className="btn btn-primary" type="button"
                          style={{"position":"fixed","marginLeft":"1000px"}} >Shop Cart <br/>
                      <span class="badge">{num}</span>
                      </button>
                      </Link>
                        <ul className="dogs">
                            {displayedDogs}
                        </ul>
                      </div>
                  ) ;
          }
      });

    var DogWorldApp = React.createClass({
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
           var list = dogs.filter(function(p) {
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
                      <FilteredDogList dogs={filteredList} />
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
            {this.props.children}
          </div>
        )
      }
    });

    ReactDOM.render( (
      <Router >
        <Route path="/" component={App}>
        <Route path="signup" component={Signup} />
        <Route path="login" component={Login} />
        <Route path="contact" component={ContactsApp} />
        <Route path="logout" component={Logout} />
        <Route path="dog" component={DogWorldApp} />
        <Route path="cart" component={Cart} />
           <IndexRoute component={Welcome}/>
           <Route path="dogs/:id" component={DogDetail} />
        </Route>
      </Router>
    ),
      document.getElementById('mount-point')
    );