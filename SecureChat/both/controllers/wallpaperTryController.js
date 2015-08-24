WallpaperTryController = RouteController.extend({
	data : function(){
		return Tempo.findOne({userId : Meteor.userId()});
	}
})