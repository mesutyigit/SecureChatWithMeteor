if(Meteor.isCordova){
	Template.settings.rendered = function(){
		swipeRight('#list');
	}
}