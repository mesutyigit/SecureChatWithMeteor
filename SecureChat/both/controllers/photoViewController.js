PhotoViewController = RouteController.extend({
	fastRender : true,
	
	data : function(){
		return PhotoView.findOne({userId : Meteor.userId()});
	}
})