if(Meteor.isCordova){
	
	Template.chatSettings.events({
		'touchstart #back' : function(e){
			e.preventDefault()
			window.history.back();
		},
		
		'swiperight #list' : function(e){
			e.preventDefault();
			window.history.back();
		}
		
		
	})
}