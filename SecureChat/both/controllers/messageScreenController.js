MessageScreenController = RouteController.extend({
                                                 
                    
    data : function(){
        return List.findOne({_id: this.params._id});
    }
})