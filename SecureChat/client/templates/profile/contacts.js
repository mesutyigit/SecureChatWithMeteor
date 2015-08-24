/* global Template */
/* global Session */
/* global owner */
/* global keyHelper */
/* global random */
/* global num */
/* global prime */
/* global list */
/* global Meteor */
/* global sendActKey */
/* global sendKey */
if(Meteor.isCordova){
    
    Template.contacts.helpers({
        /*lists : function(){
            return Contacts.find({}, {sort : {name : 1}});
        },*/
        
       deneme : function(){
           return Meteor.users.find({}, {sort: {name : 1}});
         }
    });
     
    owner = [];
    prime = 13;
    num = 6;
    random = (Math.random() * 5) + 10 ;
    random = Math.floor(random);
    keyHelper = (Math.pow(num, random)) % prime;
    Session.set('taked', false);

    sendActKey = function(message, senderID){
        keyGen.emit('keyGen', message, senderID);
        alert("key tekrar yollandi");
    };
    
    keyTaked.on(Meteor.userId(), function(message, ownerId){
        if(!Session.get('taked')){
            owner.push(ownerId);
            sendActKey(keyHelper, owner);
            var key = (Math.pow(message, random)) % prime;
            Chats.insert({
                owner : ownerId,
                friend : Meteor.userId(),
                key : key,
                createdAt : new Date,
                body : ""            
            });
            Chats.findOne({friend : Meteor.userId()}, {sort : {createdAt : -1}, limit : 1}).key;
            Session.set('taked', true);
        }
        else{
            alert("I don't want to live on this planet anymore");
        }
    });

    

}

