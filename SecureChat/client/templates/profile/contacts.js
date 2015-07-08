if(Meteor.isCordova){
    List = new Meteor.Collection(null);
    
<<<<<<< Updated upstream
    Meteor.startup(function() {
        
        var options = new ContactFindOptions();
        options.filter="";            // empty search string returns all contacts
        options.multiple=true;
        filter = ["name", "phoneNumbers"];
                   
        navigator.contacts.find(filter, onSuccess, onError, options);
            function onSuccess(contacts){
                for(var i = 0; i < contacts.length; i++){
                   if(contacts[i].name && contacts[i].phoneNumbers && contacts[i].phoneNumbers.length){
                        List.insert({
                            name : contacts[i].name.givenName,
                            surName : contacts[i].name.familyName,
                            number : contacts[i].phoneNumbers[0].value
                        })
                   }
                }
            }
            function onError(contacts){
                alert("Cannot Access Contacts.");
=======
    Meteor.startup(function(){
       // this.autorun(function(){
            
             navigator.contacts.find(["name","phoneNumbers","photos"], onSuccess);
            function onSuccess(contacts){
                for(var i = 0; i < contacts.length; i++)
                {
                   var id= List.insert({
                        name : contacts[i].name.formatted,
                        hasPhoto:false,
                        photoUrl:""
                        
                    });
                    if(contacts[i].photos && contacts[i].photos.length) {
			//s+= "<p><img src='"+contact.photos[0].value+"'></p>";
                    List.update({_id:id},{$set:{hasPhoto:true,photoUrl:contacts[i].photos[0].value}} );
                    alert(contacts[i].photos[0].value);
		         }
                   // alert(contacts[i].photos.length);
                    //for (var index = 0; index < contacts[i].photos.lenght; index++) {
                         
                        
                    //}
                }
                alert("list tamamlandı");
                    
>>>>>>> Stashed changes
            }
       // });
       
    });
    
    Template.contacts.helpers({
        lists : function(){
            return List.find();
        }
    })
}

