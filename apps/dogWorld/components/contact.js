
var React = require('react');
var api =  require ('../stubAPI').api; 
var buttons = require('./buttonsConfig' ).buttons ;

    var ContactForm = React.createClass({
       getInitialState : function() {
               return {
                addname: "",
                add_address: "",
                add_phone_number: ""
               } ;
            },
        handlerAdd: function(e){
          e.preventDefault();
          var name = this.state.addname.trim();
          var address = this.state.add_address.trim();
          var phone_number = this.state.add_phone_number.trim();
          if (!name || !address || !phone_number) {
                  return;
          }
          this.props.addHandler(name,address,phone_number);
          this.setState({addname: "",add_address: "",add_phone_number: ""});
        },
        handleNameChange: function(e) {
                this.setState({addname: e.target.value});
        },
        handleAddressChange: function(e) {
           this.setState({add_address: e.target.value});
        },
        handlePhoneNumChange: function(e) {
           this.setState({add_phone_number: e.target.value});
        },
        
        render: function(){
          return (
            <tr>
              <td key={'addname'}>
              <input type="text" className="form-control" onChange={this.handleNameChange} value={this.state.addname} />
              </td>
              <td key={'add_address'}>
              <input type="text" className="form-control" onChange={this.handleAddressChange} value={this.state.add_address} />
              </td>
              <td key={'add_phone_number'}>
              <input type="text" className="form-control" onChange={this.handlePhoneNumChange} value={this.state.add_phone_number}/>
              </td>
              <td>
              <input type="button" className="btn btn-primary" value="Add" onClick={this.handlerAdd}/>
              </td>
            </tr>
            )
        }
      });
     var Contact = React.createClass({
      getInitialState : function() {
               return {
                status : '',
                name: this.props.contacts.name,
                address: this.props.contacts.address,
                phone_number: this.props.contacts.phone_number
               } ;
            },
             
          render: function(){
               
               var fields = [
                     <td key={'name'} >{this.props.contacts.name}</td>,
                      <td key={'address'}>{this.props.contacts.address}</td>,
                      <td key={'phone_number'}>{this.props.contacts.phone_number}</td>
                   ] ;
              
              return (
                    <tr >
                      {fields}
                      
                      </tr>
                   ) ;
                }
          });


    

    var ContactList = React.createClass({
          render: function(){
               var contactRows = this.props.contacts.map(function(contact){
                    return (
                     <Contact key={contact.phone_number}  contacts={contact}  />
                      ) ;
                  }.bind(this) );
              return (
                  <tbody >
                      {contactRows}
                      <ContactForm addHandler={this.props.addHandler} />
                  </tbody>
                ) ;
            }
          });

    var ContactsTable = React.createClass({
          render: function(){
              return (
                <table className="table table-bordered">
                      <thead>
                        <tr>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th></th>
                       
                        </tr>
                      </thead>
                      <ContactList contacts={this.props.contacts} 
                             addHandler={this.props.addHandler}/>
                </table>
                );
          }
      });

       var ContactsApp = React.createClass({
          
          addContact : function(n,a,p){
                api.add(n,a,p) ;
                this.setState({});
          },
	      	render: function(){
            var contacts = api.getAll() ;
	          return (
	                <div>
	                   <h1>Contact List.</h1>
	                   <ContactsTable contacts={contacts} 
                         addHandler={this.addContact} /> 
	                </div>
	          );
	      }
	  });
exports.ContactsApp = ContactsApp; 
 