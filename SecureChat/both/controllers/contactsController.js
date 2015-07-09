ContactsController = RouteController.extend({
        
    action : function(){
        if(this.ready())
            this.render();
        else{
            IonLoading.show({
                duration: 3000
            });
        }
        
    }
    
})