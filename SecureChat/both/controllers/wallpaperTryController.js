WallpaperTryController = RouteController.extend({
	fastRender : true,
	
	data : function(){
		return Tempo.findOne({userId : Meteor.userId()});
	}
})