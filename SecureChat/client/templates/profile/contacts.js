if(Meteor.isCordova){
    List = new Meteor.Collection(null);
    
    Meteor.startup(function() {
        
        var options = new ContactFindOptions();
        options.filter="";            // empty search string returns all contacts
        options.multiple=true;
        filter = ["name", "phoneNumbers"];
                   
        navigator.contacts.find(filter, onSuccess, onError, options);
            function onSuccess(contacts){
                for(var i = 0; i < contacts.length; i++){
                   if(contacts[i].name && contacts[i].phoneNumbers && contacts[i].phoneNumbers.length){
                        List.insert({
                            name : contacts[i].name.givenName,
                            surName : contacts[i].name.familyName,
                            number : contacts[i].phoneNumbers[0].value
                        })
                   }
                }
            }
            function onError(contacts){
                alert("Cannot Access Contacts.");
            }
    });
    
    Template.contacts.helpers({
        lists : function(){
            return List.find();
        }
    })
}