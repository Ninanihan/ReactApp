var _ = require('lodash');
    var contacts = [
                    {
                        "name": "nihan1994@163.com",
                        "address": "19 Lismore Park, Waterford",
                        "phone_number": "0873996191"
                    },

                    {
                        "name": "906575003@qq.com",
                        "address": "91 Lisomre Park,Waterford",
                        "phone_number": "0873996192"
                    },

                    {
                        "name": "1@qq.com",
                        "address": "9 Lisomre Park,Waterford",
                        "phone_number": "0873996189"
                    }

                  ] ; 

    var stubAPI = {
         delete : function(k) {
                 var elements = _.remove(contacts, 
                     function(contact) {
                           return contact.phone_number == k;
                        }); 
                        },
          getAll : function() {
              return contacts ;
          },
         add : function(n,a,p) {
                 contacts.push({
                     name: n, address : a, phone_number: p }) ;
              },
         update : function(key,n,a,p) {
                   var index = _.findIndex(contacts, function(contact) {
                        return contact.phone_number == key;
                      } );      
                   if (index != -1) {
                      contacts.splice(index, 1, {name: n, address: a, phone_number: p});
                    }
              }
          }
          exports.api = stubAPI ;