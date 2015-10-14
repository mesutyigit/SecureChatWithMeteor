FontSizeController = RouteController.extend({
	fastRender : true,
	
	data : function(){
		return Background.findOne({userId : Meteor.userId()}); 
	}
})