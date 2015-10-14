if(Meteor.isCordova){
	
	Template.backgroundSettings.events({
		'touchstart #back' : function(){
			window.history.back();
		},
		
		'touchstart #photos' : function(){
			var options = {
				quality : 100,
				allowEdit : true,
				sourceType : Camera.PictureSourceType.PHOTOLIBRARY
			}
			
			MeteorCamera.getPicture(options, function(err,data){
				if(data){
					if(Tempo.find({}).count() == 0){
						Tempo.insert({
						userId : Meteor.userId(),
						image : data
						})
					
					}
					else{
						Tempo.update({userId : Meteor.userId()}, {$set : {image : data}});
				
					}
					Router.go('/wallpaperTry');
					
				}
			})
				
		},
		
		'swiperight #listed' : function(e){
			e.preventDefault();
			window.history.back();
		}
	})
	
	
}