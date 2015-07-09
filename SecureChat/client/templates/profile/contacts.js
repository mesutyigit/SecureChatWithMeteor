if(Meteor.isCordova){
    
    Meteor.startup(function(){

    });
    
    Template.contacts.helpers({
        lists : function(){
            return Contacts.find({}, {sort : {name : 1}});
        }
    });
}
