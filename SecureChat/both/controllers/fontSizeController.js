FontSizeController = RouteController.extend({
	data : function(){
		return Background.findOne({userId : Meteor.userId()}); 
	}
})