if(Meteor.isCordova){
    var List = new Meteor.Collection(null);
    
    Meteor.startup(function (){
        navigator.contacts.find(["name"], onSuccess);
            function onSuccess(contacts){
                for(var i = 0; i < contacts.length; i++)
                   List.insert({
                               name : contacts[i].name.formatted
                   })
        }
    });
    
    Template.contacts.helpers({
        lists : function(){
            return List.find();
        }
    })
}