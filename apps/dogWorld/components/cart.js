var React = require('react')

var dog = require('./data').allDogs ;

var DogItem = React.createClass({
      
      render: function(){
           return (

              <li>{this.props.dog}
              </li>
               ) ;
         }
     }) ;  

var Dogs = React.createClass({
  render: function(){
     var displayedDogs = this.props.dogs.map(function(dog,index) {
                  return <DogItem key={index} dog={dog}/>
     }); 
    return(
      <ul>
          {displayedDogs}
      </ul>
    )
  }
});

var Cart = React.createClass({
  render: function(){
    var dogs = JSON.parse(localStorage.getItem('carts')).cartsarray;
    console.log(dogs);
    return (
      <div>
        <h1>Shop Cart</h1>
        <Dogs dogs={dogs}/>
      </div>
    );
  }
});

 exports.Cart = Cart ;