chat = new Meteor.Stream('chat');
keyTaked = new Meteor.Stream('key');
keyGen = new Meteor.Stream('keyGen');

if (Meteor.isClient) {
    var prime = 23;
    var num = 3;
    var random = Math.random();
    var keyHelper = (Math.pow(num, random)) % prime;
    keyHelper = Math.floor(keyHelper);
    Session.set('taked', false);
    
    sendChat = function(message){
        chat.emit('messageBody', message.toString());
    };
    
    sendKey = function(message){
        keyTaked.emit('key', message);
        
    };
    
    sendActKey = function(message){
        keyGen.emit('keyGen', message);
    };

    keyTaked.on('key', function(message){
        if(!Session.get('taked')){
            sendActKey(keyHelper, message);
            var key = (Math.pow(message, random)) % prime;
            /*Chats.insert({
                userId : Meteor.userId(),
                friendId : ,
                key : key,
                created : new Date
            })*/
                alert(Chats.findOne({userId : Meteor.userId()}).key);
                Session.set('taked', true);
            
        }
    });
    
    Template.hello.events({
        'click #create' : function(e, tmpl){
            e.preventDefault();
            sendKey(keyHelper);
            keyGen.on('keyGen', function(message, mesaj){
                if(!Session.get('taked')){
                    var key = (Math.pow(message, random)) % prime;
                      alert(mesaj);
                    Chats.insert({
                        userId : Meteor.userId(),
                        key : key,
                        created : new Date
                    })
                    alert(Chats.findOne({userId : Meteor.userId()}).key);
                    Session.set('taked', true);
                }
            });
        },
        
        'click #send' : function(e,tmpl){
            e.preventDefault();
            var messageFrom = tmpl.find('#message').value;
            var key = Chats.findOne({userId : Meteor.userId()}).key;
            var encrypted = CryptoJS.AES.encrypt(messageFrom, key.toString());
                         
            $('#messages').append('<div> benim yolladigim normal olan :' + messageFrom + '</div>');
            $('#messages').append('<div> benim yolladigim sifreli olan :' + encrypted + '</div>');
            sendChat(encrypted);
             alert("benim kullandigim key = " + key);
        }
    });
    
    chat.on('messageBody', function(message){
        var key = Chats.findOne({userId : Meteor.userId()}).key;
        var decrypted = CryptoJS.AES.decrypt(message, key.toString());
        Chats.insert({
            body : decrypted.toString(CryptoJS.enc.Utf8)
        })
        //$('#messages').append('<div> adamin yolladigi sifreli olan :' + message + '</div>');
        //$('#messages').append('<div> adamin yolladigi cozulmus olan:' + decrypted.toString(CryptoJS.enc.Utf8) + '</div>');
            $('#messages').append('<div> adamin yolladigi sifreli olan :' + Chats.find({}) + '</div>');
    });

}
if (Meteor.isServer) {
    
    chat.permissions.read(function(){
        return true;
    });
    
    chat.permissions.write(function(){
        return true;
                    
    });
    
    keyTaked.permissions.read(function(){
        return true;
    });
    
    keyTaked.permissions.write(function(){
        return true;
    });
    
    keyGen.permissions.read(function(){
        return true;
    });
    
    keyGen.permissions.write(function(){
        return true;
    });
    
    Meteor.publish("key", function(){
        if(this.userId)
            return Chats.find({});
    });
                         
}