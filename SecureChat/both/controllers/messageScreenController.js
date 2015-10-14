MessageScreenController = RouteController.extend({
    fastRender : true,
    
    onBeforeAction : function(){
        list = [];
        prime = 13;
        num = 6;
        random = (Math.random() * 5) + 10 ;
        random = Math.floor(random);
        keyHelper = (Math.pow(num, random)) % prime;
        Session.set('taked', false);
        list.push(this.params._id);
        sendKey(keyHelper, Meteor.userId(), list);  
        this.next(); 
    },
    
    action : function(){
        
        keyGen.on(Meteor.userId(), function(message){
            if(!Session.get('taked') ){
                var key = (Math.pow(message, random)) % prime; 
                Chats.insert({
                    owner : Meteor.userId(),
                    friend : list,
                    key : key,
                    createdAt : new Date,
                    body : ""
                });
                Chats.findOne({owner : Meteor.userId()}, {sort : { createdAt : -1}, limit : 1}).key;//en son kaydedilmis collecitondan key degerini alma
                Session.set('taked', true);
            }
            else{
                alert("I dont' want to live on this planet anymore");
            }
        });
        if(this.ready()){
            this.render();    
        }else{
            IonLoading.show({
                duration: 3000
            });
        }
                                                
    },
                                                 
    data : function(){
       // return Contacts.findOne({_id: this.params._id}); //tiklanan kisinin bilgilerini diger sayfaya yolluyoruz.
       //return Friends.findOne({friendId : this.params.friendId});
       return Meteor.users.findOne({_id : this.params._id});
    },
   
});

sendKey = function(message, ownerId, list){
    keyTaked.emit('key', message, ownerId, list);
};