if(Meteor.isCordova){
	Template.wallpaperTry.helpers({
		height : function(){
			return $(window).height();
		},
		
		font : function(){
			return localStorage.getItem('font');
		}
	});
	
	Template.wallpaperTry.events({
		'touchstart #cancel' : function(e){
			e.preventDefault();
			window.history.back();
		},
		
		'touchstart #set' : function(e){
			e.preventDefault();
			var pic = Tempo.findOne({userId : Meteor.userId()});
			
			try{
				Background.update({userId : Meteor.userId()}, {$set : {image : pic.image}});
				}
			catch(e){
				
			}
			window.history.back();
		}
		
		
	})
}