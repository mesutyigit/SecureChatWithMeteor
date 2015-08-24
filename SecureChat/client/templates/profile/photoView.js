if(Meteor.isCordova){
	Template.photoView.helpers({
		width : function(){
			return $(window).width();
		},
		
	})
	
	Template.photoView.events({
		'click #cancel' : function(e){
			e.preventDefault();
			window.history.back();
		},
		
		'click #ok' : function(e){
			e.preventDefault();
			
			if(Platform.isAndroid()){
				
			}
			
			localStorage.setItem('selectedPhoto', document.getElementById('imageiOS').src);//secilen fotorgrafin sourceunu localStorage kaydet
			localStorage.setItem('full', 'true');//fotograf secildigini chatMessage ekranina belirt
			localStorage.setItem('photoHeight', document.getElementById('imageiOS').height);//fotografin height oranini al	(Mesaj baloncugu icin)
			localStorage.setItem('photoWidth', document.getElementById('imageiOS').width);//fotografin width oranini al	(Mesaj baloncugu icin)
			window.history.back();
				
			
		}
		
		
	})
	
	
	
}
