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
    Template.contacts.rendered = function(){
        alert(Meteor.userId());
    }
    Template.contacts.helpers({
        /*lists : function(){
            return Contacts.find({}, {sort : {name : 1}});
        },*/
        
       deneme : function(){
           return Meteor.users.find({}, {sort: {name : 1}});
         }
    });
     
    owner = [];
    list = [];
    prime = 13;
    num = 6;
    random = (Math.random() * 5) + 10 ;
    random = Math.floor(random);
    keyHelper = (Math.pow(num, random)) % prime;
    Session.set('taked', false);
     
    sendKey = function(message, ownerId, list){
        keyTaked.emit('key', message, ownerId, list);
        alert("sended");
    };
    
    sendActKey = function(message, senderID){
        keyGen.emit('keyGen', message, senderID);
        alert("keyi tekrar yolladigim kisi = " + senderID);
    };
    
    keyTaked.on(Meteor.userId(), function(message, ownerId){
        alert("taked");
        if(!Session.get('taked')){
            owner.push(ownerId);
            sendActKey(keyHelper, owner);
            var key = (Math.pow(message, random)) % prime;
            alert("bendeki key = " + key);
            Session.set('taked', true);
        }
        else{
            alert("I don't want to live on this planet anymore");
        }
    });

    Template.contacts.events({//Diffie-Hellman Key Exchange
        'click button.pp' : function(e, tmpl){
            e.preventDefault();
            list.push(this._id);
            sendKey(keyHelper, Meteor.userId(), list);       
            keyGen.on(Meteor.userId(), function(message){
                if(!Session.get('taked') ){
                    var key = (Math.pow(message, random)) % prime; 
                    alert("Bende ki key = " + key);
                    Session.set('taked', true);
                }
                else{
                    alert("I dont' want to live on this planet anymore");
                }
            });
       }      
    });

}

