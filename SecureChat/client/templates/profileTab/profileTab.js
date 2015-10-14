if(Meteor.isCordova){
	Template.profileTab.events({
		"swiperight .androidTab" : function(e){
			e.preventDefault();
			if(Router.current().route.getName() === "profile"){
				Router.go('/contacts');
			}
			
			if(Router.current().route.getName() === "settings"){
				Router.go('/profile');
			}
			
		},
		
		"swipeleft .androidTab" : function(e){
			e.preventDefault();
			if(Router.current().route.getName() === "contacts"){
				Router.go('/profile');
			}
			
			if(Router.current().route.getName() === "profile"){
				Router.go('/settings');
			}
		}
	})
}