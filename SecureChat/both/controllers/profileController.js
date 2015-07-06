ProfileController = RouteController.extend({
                                        
    onBeforeAction : function(){
        if(!Meteor.user() && !Meteor.loggingIn()){
            Router.go('/signup');
        }else
            this.next();
    },
                            
    action : function(){
        if(this.ready()){
            this.render('profile');
        }
        else
            this.render('loadingProfile');
    }

})