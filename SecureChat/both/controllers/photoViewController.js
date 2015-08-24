PhotoViewController = RouteController.extend({
	data : function(){
		return PhotoView.findOne({userId : Meteor.userId()});
	}
})