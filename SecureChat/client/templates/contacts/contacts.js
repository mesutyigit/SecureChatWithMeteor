if(Meteor.isCordova){
    
    
    Template.contacts.helpers({
        /*lists : function(){
            return Contacts.find({}, {sort : {name : 1}});
        }*/
        
        deneme : function(){
            return Meteor.users.find({}, {sort: {name : 1}});
        }
    });
    
    Template.contacts.events({
        "swipeleft .forSwipe" : function(e){
            e.preventDefault();
            Router.go('/profile');
            
        }
    })
    

}

