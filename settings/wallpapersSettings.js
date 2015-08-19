if(Meteor.isCordova){
	var timeOut, longTouch;
	/*Template.wallpapersSettings.helpers({
		templateGestures : {
			'swipeleft .forSwipe' : function(event, templateInstance){
				window.history.back();
			}
		}
	})*/
	Template.wallpapersSettings.events({
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
			
			}, 160);
			
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
