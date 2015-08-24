if(Meteor.isCordova){
	
	var chats = [];
	
	document.addEventListener("backbutton", onBack, false);
	
	function onBack(){
		if(Router.current().route.getName() === "profile"){
			/* android de back tusuna basildigi zaman eger liste secme aktif ise deaktif et*/
			var removeClick = $('#listAndroid').children();
			$('.roomAndroid').fadeTo(500, 1.0);
			removeClick.removeClass('clickItems');
			$('#doneAndroid').css('display', 'none');
			$('#cancel').css('display', 'none');
			$('.newChat').css('display', 'block');	
		}	
	}
	
	
	Template.profile.helpers({
		random : function(){
			return Random.id();
		},
		
		deneme : function(){
			return Meteor.users.find({}, {sort: {name : 1}});
		}
	})
	
	
	Template.profile.events({
		"swipeleft .roomiOS" : function(e){
			var chat = e.currentTarget;
			console.log(chat.attr('button'));
			$('#' + chat.id + '').animate({marginRight: '+=100px'});
			//$('.deleteButton').css('display', 'block');
			$('.deleteButton').animate({marginRight: '+=100px'});
			
		},
		
		"swiperight .roomiOS" : function(e){
			var chat = e.currentTarget;
			$('#' + chat.id + '').animate({marginRight: '-=100px'});
			$('.deleteButton').animate({marginRight: '-=100px'});
			
		},
		
		"taphold .roomAndroid" : function(e){
			/* this._id ile basili tutulan elemanin collectiondaki id sini cekebiliyoruz 
			bu sayede secilen elemani dbden rahatlikla silebiliriz */
			/* diger attributelere de ulasmak mumkun*/
			
			var room = e.currentTarget;
			var addClick = $('#listAndroid').children();
			chats.push(room.id);//deneme icin yapiliyor bu this._id ile degistirilecek
			$('#' + room.id + '').fadeTo(500, 0.5);
			addClick.addClass('clickItems');//basili tuttuktan sonra diger mesajlara tiklayabilme ozelligi icin class ekle
			$('.newChat').css('display', 'none');
			$('#doneAndroid').css('display', 'block');
			$('#cancel').css('display', 'block');
			
			
		},
		
		"click .clickItems" : function(e){
			var room = e.currentTarget;
			$('#' + room.id + '').fadeTo(0, 0.5);
			chats.push(room.id);
			
		},
		
		"click #cancel" : function(e){
			e.preventDefault();
			var removeClick = $('#listAndroid').children();
			$('.roomAndroid').fadeTo(500, 1.0);
			removeClick.removeClass('clickItems');
			$('#doneAndroid').css('display', 'none');
			$('#cancel').css('display', 'none');
			$('.newChat').css('display', 'block');
		},
		
		"click #doneAndroid" : function(e){
			e.preventDefault();
			alert(chats);	
		},
		
		"click #profileImg" : function(e){
			e.preventDefault();
			alert("clicked profile");	
		},
		
		"click .deleteIcons" : function(e){
			var button = e.currentTarget;
			var parent = $('#' + button.id+ '').parent();
			console.log(this._id);
			//console.log("first id : " + $('.deleteButton:first').attr('id')); /* secilen nesnenin idsini cekme
			IonActionSheet.show({
				buttons: [
					{ text : '<div style="color: red">Delete Chat</div>'}
				],
				cancelText: '<b>Cancel</b>',
				cancel : function(){
					IonActionSheet.close();
				},
				buttonClicked : function(index){
					if(index === 0){
						parent.remove();
						//Meteor.users.remove({_id : this._id});// this._id ile db den render olan datanin id sine direk erisebiliyoruz bu sayede direk silme islemini gerceklestirebiliyoruz
						IonActionSheet.close();
						$('.edit').css('display', 'block');
						$('.items').animate({marginLeft: '-=50px'});
						$('.deleteIcons').css('display', 'none');	
						$('.done').css('display', 'none');	
					}
				}
			})
			
			
		},
		
		"click .edit" : function(e){
			$('.edit').css('display', 'none');
			$('.deleteIcons').css('display', 'block');	
			$('.items').animate({marginLeft: '+=50px'});
			$('.done').css('display', 'block');
			
		},
		
		"click .done" : function(e){
			$('.edit').css('display', 'block');
			$('.items').animate({marginLeft: '-=50px'});
			$('.deleteIcons').css('display', 'none');	
			$('.done').css('display', 'none');
		},
		
		"click .e" : function(e){
			var pos = $('.deleteButton:last').position().top;
			pos = pos + 75;
			$('div.list').append("<div id="+ Random.id() +" ><i class='icon ion-minus-circled assertive deleteButton' style='display:none; font-size:1.75em; position:absolute; top: "+ pos +"' id=" + Random.id() + "></i> <a class='item item-avatar items'> <img src='messageBackground12.jpg'><h2>Muro</h2><p>Back off, man. I'm a scientist.</p></a></div>");
		}
		
		
	})
	
	
}