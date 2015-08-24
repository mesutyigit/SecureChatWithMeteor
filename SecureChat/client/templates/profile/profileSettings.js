if(Meteor.isCordova){
	Template.profileSettings.events({
		'click #back' : function(e){
			e.preventDefault()
			window.history.back();
	}
	});
	
	Template.profileSettings.helpers({
		name : function(){
			return Meteor.users.findOne({_id : Meteor.userId()}).profile.name;
		}
	})
}