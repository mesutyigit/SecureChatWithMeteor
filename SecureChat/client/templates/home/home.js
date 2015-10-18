if(Meteor.isCordova){
	Meteor.startup(function(){
        console.log("started");
		
    })
    
	Template.home.events({
		'click .button-colorAndroidTwo' : function(e){
			e.stopPropagation();
			e.preventDefault();
			Router.go('/signup');
		}
	})
}