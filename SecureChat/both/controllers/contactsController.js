ContactsController = RouteController.extend({
    fastRender : true, 
    
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