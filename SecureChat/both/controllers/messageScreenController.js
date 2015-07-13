MessageScreenController = RouteController.extend({
                              
    action : function(){
        if(this.ready())
            this.render();
        else{
            IonLoading.show({
                duration: 3000
            });
        }
                                                
    },
                                                 
    data : function(){
       // return Contacts.findOne({_id: this.params._id}); //tiklanan kisinin bilgilerini diger sayfaya yolluyoruz.
       //return Friends.findOne({friendId : this.params.friendId});
       return Meteor.users.findOne({_id : this.params._id});
    }
})