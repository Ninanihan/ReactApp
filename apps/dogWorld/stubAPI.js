var _ = require('lodash');
    var contacts = [
                    {
                        "email": "nihan1994@163.com",
                        
                        "problem": "I want to buy a bulldog."
                    },

                    {
                        "email": "906575003@qq.com",
                        "problem": "I want to buy a goleden."
                    },

                    {
                        "email": "1@qq.com",
                        "problem": "I want to buy a beagle."
                    }

                  ] ; 

    var stubAPI = {
         delete : function(k) {
                 var elements = _.remove(contacts, 
                     function(contact) {
                           return contact.email == k;
                        }); 
                        },
          getAll : function() {
              return contacts ;
          },
         add : function(e,p) {
                 contacts.push({
                     email: e, problem: p }) ;
              },
         update : function(key,e,p) {
                   var index = _.findIndex(contacts, function(contact) {
                        return contact.emial == key;
                      } );      
                   if (index != -1) {
                      contacts.splice(index, 1, {email: e,problem: p});
                    }
              }
          }
          exports.api = stubAPI ;