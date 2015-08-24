if(Meteor.isCordova){
	
	Template.fontSize.helpers({
		height : function(){
			return $(window).height();
		},
		
		selectLarge : function(){
			if(localStorage.getItem('font') == 'bubble-fontLarge'){
				return 'selected';
			}
		},
		
		selectMedium : function(){
			if(localStorage.getItem('font') == 'bubble-fontMedium'){
				return 'selected';
			}
		},
		
		selectSmall : function(){
			if(localStorage.getItem('font') == 'bubble-fontSmall'){
				return 'selected';
			}
		},
		
		font : function(){
			return localStorage.getItem('font');
		}
		
		
	})
	
	
	
	Template.fontSize.events({
		'touchstart #back' : function(e){
			e.preventDefault()
			window.history.back();
		},
		
		'change #sa' : function(e, tmpl){
			var s = e.currentTarget;
			//console.log(document.attributes);
			if(s.selectedIndex == 0){
				$('.bubble').css('font-size', '20px');
				localStorage.font = 'bubble-fontLarge';
			}
			
			if(s.selectedIndex == 1){
				$('.bubble').css('font-size', '14px');
				localStorage.font = 'bubble-fontMedium';
			}
			
			if(s.selectedIndex == 2){
				$('.bubble').css('font-size', '10px');
				localStorage.font = 'bubble-fontSmall';
			}
		}
		
	})
	
	
}
