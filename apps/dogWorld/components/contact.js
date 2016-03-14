
var React = require('react');
var api =  require ('../stubAPI').api; 
var buttons = require('./buttonsConfig' ).buttons ;

    var ContactForm = React.createClass({
       getInitialState : function() {
               return {
                addemail: "",
                add_problem: ""
                
               } ;
            },
        handlerAdd: function(e){
          e.preventDefault();
          var email = this.state.addemail.trim();
          var problem = this.state.add_problem.trim();
          if (!email || !problem ) {
                  return;
          }
          this.props.addHandler(email,problem);
          this.setState({addemail: "",add_problem: ""});
        },
        handleEmailChange: function(e) {
                this.setState({addemail: e.target.value});
        },
        handleProblemChange: function(e) {
           this.setState({add_problem: e.target.value});
        },
        
        
        render: function(){
          return (
            <tr>
              <td key={'addemail'}>
              <input type="text" className="form-control" onChange={this.handleEmailChange} value={this.state.addemail} />
              </td>
              <td key={'add_problem'}>
              <input type="text" className="form-control" onChange={this.handleProblemChange} value={this.state.add_problem} />
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
                email: this.props.contacts.emial,
                problem: this.props.contacts.problem
               } ;
            },
             
          render: function(){
               
               var fields = [
                     <td key={'email'} >{this.props.contacts.email}</td>,
                      <td key={'problem'}>{this.props.contacts.problem}</td>,
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
                     <Contact key={contact.emial}  contacts={contact}  />
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
                        <th>Problem</th>
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
          
          addContact : function(e,p){
                api.add(e,p) ;
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
 