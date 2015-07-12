keyTaked = new Meteor.Stream('key');
keyGen = new Meteor.Stream('keyGen');

if(Meteor.isCordova){
    Template.contacts.events({//Diffie-Hellman Key Exchange --- Normalde messagescreen in onBeforeAction inda key exchange yapilacakti fakat karsi tarafinda ayni ekranda olmasi gerektigi icin bu hale getirildi.
       'click button.pp' : function(e, tmpl){
            e.preventDefault();
            var prime = 23; 
            var num = 3;
            var random = (Math.random() * 11) + 10;
                                                
            var keyHelper = (Math.pow(num, random)) % prime;
            keyHelper = Math.floor(keyHelper);
            Session.set('taked', false);
            
            alert(keyHelper);
            sendKey = function(message, senderID, takerID){
                keyTaked.emit('key', message, senderID, takerID);                            
            };
           
            sendKey(keyHelper, Meteor.userId(), this.params.friendId);
                                                     
            keyTaked.on('key', function(message, senderID, myId){
                alert("sa");
                if(!Session.get('taked') && myId === Meteor.userId()){
                    alert("sa");
                    sendActKey(keyHelper, Meteor.userId(), senderID);
                    var key = (Math.pow(message, random)) % prime;
                    Chats.insert({
                        myId : Meteor.userId(),
                        friendId : senderID,
                        key : key,
                        created : new Date
                    })
                    alert(Chats.findOne({userId : Meteor.userId()}).key);
                    Session.set('taked', true);
                                                                 
                }
                else{
                    alert("I don't want to live on this planet anymore");
                }
            });
            
             sendActKey = function(message, senderID, takerID){
                keyGen.emit('keyGen', message, senderID, takerID);
            };
                                                     
            keyGen.on('keyGen', function(message, senderID, myId){
                if(!Session.get('taked') && Meteor.userId() === myId){
                      
                    var key = (Math.pow(message, random)) % prime;
                    Chats.insert({
                        userId : Meteor.userId(),
                        friendId : senderID,
                        key : key,
                        created : new Date
                    })
                      
                    alert(Chats.findOne({userId : Meteor.userId()}).key);
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
            return Friends.find({});
        }
    });
}

