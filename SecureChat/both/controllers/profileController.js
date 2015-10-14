ProfileController = RouteController.extend({
    fastRender : true,
                                        
    onBeforeAction : function(){
        
        if(!Meteor.user() && !Meteor.loggingIn()){
            Router.go('/signup');
        }else{
            //fillFriend(); //key-exchange denemesi icin yapildi.
            
            this.next();
        }
        
    },
    
    action : function(){
        if(this.ready()){
            if(Background.find().count() == 0){
                Background.insert({
                    userId : Meteor.userId(),
                    image : '/messageBackground1.jpg'
                })
            }
            
            this.render();
        }
        else
            this.render('loadingProfile');
    }

});

//guvenli mesajlasma denemesi
function fillFriend(){

    var arr = new ReactiveArray();
    arr = Meteor.users.findOne({_id : Meteor.userId()}).profile.friends;
    
    alert("dbye yazacagim");
    for(var i =0; i < arr.length; i++){
        Friends.insert({
            myId : Meteor.userId(),
            friendId : arr[i],
            name : "Ebubekir" /*Meteor.users.findOne({_id : arr[i]}).profile.name*/
        })
       
    }
    alert("dbye yazdim");
};
