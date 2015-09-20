if(Meteor.isCordova){
	var timeOut, longTouch;
	
	Template.wallpapersSettings.events({
		'swiperight #forSwipe' : function(e){
			e.preventDefault();
			window.history.back();
		},
		
		'touchstart #back' : function(e){
			e.preventDefault();
			window.history.back();
		},
		
		'touchstart .aa' : function(e){
			var picture = e.currentTarget;
			
			timeOut = setTimeout(function(){
				
				longTouch = true;
				if(longTouch){
					$('#' + picture.id + '').fadeTo(10, 0.5);
					if(Tempo.find({}).count() == 0){
						Tempo.insert({
							userId : Meteor.userId(),
							image : picture.src
						})
						
					}
					else{
						Tempo.update({userId : Meteor.userId()}, {$set : {image : picture.src}});
						
					}
					Router.go('/wallpaperTry');	
				}
			
			}, 350);
			
		},
		
		'touchend .aa' : function(e){
			var picture = e.currentTarget;
			$('#' + picture.id + '').fadeTo(100, 1.0);
			longTouch = false;
			clearTimeout(timeOut);
			return;
		}
	})
}
