if(Meteor.isCordova){
     var prime = 23; 
     var num = 3;
     var random = (Math.random() * 11) + 10;                   
     var keyHelper = (Math.pow(num, random)) % prime;
     keyHelper = Math.floor(keyHelper);
     Session.set('taked', false);
     
     sendKey = function(message, senderID, takerID){
                keyTaked.emit('key', message, senderID, takerID);     
                alert("yolladim");                       
     };
            
     sendActKey = function(message, senderID, takerID){
                keyGen.emit('keyGen', message, senderID, takerID);
     };
    
     keyTaked.on('key', function(message, senderID, myId){
                alert("keyi aldim");
                if(!Session.get('taked') && myId === Meteor.userId()){
                    
                    sendActKey(keyHelper, Meteor.userId(), senderID);
                    var key = (Math.pow(message, random)) % prime;
                    /*Chats.insert({
                        myId : Meteor.userId(),
                        friendId : senderID,
                        key : key,
                        body : "",
                        created : new Date
                    })
                    alert(Chats.findOne({userId : Meteor.userId()}).key);*/
                    
                    alert(key);
                    Session.set('taked', true);
                                                                 
                }
                else{
                    alert("I don't want to live on this planet anymore");
                }
     });
                                
     Template.contacts.events({//Diffie-Hellman Key Exchange
       'click button.pp' : function(e, tmpl){
            e.preventDefault();

            sendKey(keyHelper, Meteor.userId(), this._id);
                   
            keyGen.on('keyGen', function(message, senderID, myId){
                alert("yolladigim keye karsilik aldim");
                if(!Session.get('taked') && myId === Meteor.userId()){
                      
                    var key = (Math.pow(message, random)) % prime;
                   /* Chats.insert({
                        userId : Meteor.userId(),
                        friendId : senderID,
                        key : key,
                        body : "",
                        created : new Date
                    })
                      
                    alert(Chats.findOne({userId : Meteor.userId()}).key);*/
                    alert(key);
                    Session.set('taked', true);
                }
                else{
                    alert("I dont' want to live on this planet anymore");
                }
            });
       } 
        
        
    });
    
    Template.contacts.helpers({
        /*lists : function(){
            return Contacts.find({}, {sort : {name : 1}});
        },*/
        
        deneme : function(){
            return Meteor.users.find({}, {sort: {name : 1}});
        }
    });
}
