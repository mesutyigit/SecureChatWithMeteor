HomeController = RouteController.extend({
    onBeforeAction : function(){
        if(isFirstTime()){
            Cookie.set('getStarted', 1, {
                expires : 9999
                       });
            this.next();
                                    
        }
        else
            Router.go('/profile');
        }
})