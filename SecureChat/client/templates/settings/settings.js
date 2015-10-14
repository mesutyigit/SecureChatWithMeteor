if(Meteor.isCordova){
	Template.settings.events({
		'swiperight #list' : function(){
			Router.go('/profile');
		},
		
		'click #profile' : function(e){
			e.preventDefault();
			Router.go('/settings/profile');
		},
		
		'click #chat' : function(e){
			e.preventDefault();
			Router.go('/settings/chat');
		},
		
		'click #notifications' : function(e){
			e.preventDefault();
			Router.go('/settings/notifications');
		}
	})
	
	Template.settings.helpers({
		
	})
	
}
