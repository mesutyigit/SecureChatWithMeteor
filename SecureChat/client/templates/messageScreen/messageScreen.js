if(Meteor.isCordova){
    Template.messageScreen.events({
        'click #back' : function(){
            window.history.back();
        }
    })
}