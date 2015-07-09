MessageScreenController = RouteController.extend({
    onBeforeAction : function(){
                                                 
        keyTaked = new Meteor.Stream('key');
        keyGen = new Meteor.Stream('keyGen');
        
        var prime = 23;
        var num = 3;
        var random = Math.random();
        var keyHelper = (Math.pow(num, random)) % prime;
        keyHelper = Math.floor(keyHelper);
        Session.set('taked', false);
                                    
        sendKey(keyHelper, Meteor.userId(), this.params._id);

        sendKey = function(message, senderID, takerID){
            keyTaked.emit('key', message, senderID, takerID);
                                        
        };
                                                 
        sendActKey = function(message, senderID, takerID){
            keyGen.emit('keyGen', message, senderID, takerID);
        };
                                                 
        keyTaked.on('key', function(message, senderID, myId){
            if(!Session.get('taked') && myId === Meteor.userId()){
                sendActKey(keyHelper, Meteor.userId(), senderID);
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
                alert("Cannot take this anymore");
            }
        });

                                                 
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
                alert("Cannot take this anymore");
            }
        });

            this.next();
                                    
    },
                                                
    data : function(){
        return Contacts.findOne({_id: this.params._id});
    }
})