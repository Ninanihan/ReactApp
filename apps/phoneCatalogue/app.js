var ReactDOM = require('react-dom')
    var React = require('react')
    var phones = require('./data').allPhones ;

    var SelectBox = React.createClass({
      render: function(){
           return (
                <div className="col-md-10">
              <input type="text" placeholder="Search" />
              Sort by:
              <select>
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
              </select>
             </div>
               );
          }
       });


    // TODO (missing component)
    var PhoneItem= React.createClass({
          render: function(){
              return (
                 <li className="thumbnail phone-listing">
                <a href={'#/phones/'+this.props.phones.age} className="thumb">
                  <img src={this.props.phones.imageUrl}/> </a>
                <a href={'#/phones/'+this.props.phones.age}>{this.props.phones.id}</a>
                     <p>{this.props.phones.snippet}</p>
                 </li> 
                ) ;
          }
      });


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
      render: function(){
        
          return (
                <div className="view-container">
                <div className="view-frame">
                   <div className="container-fluid">
                   <div className="row">
                       <SelectBox />
                       <FilteredPhoneList phones={phones} />
                  </div> 
                  </div>                   
                </div>
              </div>
          );
      }
    });

    ReactDOM.render(
      <PhoneCatalogueApp phones={phones} />,
      document.getElementById('mount-point')
    );