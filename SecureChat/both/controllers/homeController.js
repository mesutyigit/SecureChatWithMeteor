HomeController = RouteController.extend({
    fastRender : true,
    
    onBeforeAction : function(){
        if(isFirstTime()){
            Cookie.set('getStarted', 1, {
                expires : 9999
                       });              
            //fillContacts();
            localStorage.setItem('font', 'bubble-fontMedium');
            this.next(); 
        }
        else{
            localStorage.setItem('font', 'bubble-fontMedium');
            Router.go('/profile');
        }
        
    },
    
    
    
    action : function(){
        this.render();
    }
    
});

function fillContacts(){
    
    var options = new ContactFindOptions();
    options.filter ="";
    options.multiple=true;
    filter =["name", "phoneNumbers"];
    
    navigator.contacts.find(filter, onSuccess, onError, options);
    
    function onSuccess(contacts){
        for(var i = 0; i < contacts.length; i++){
            if(contacts[i].name && (contacts[i].name.formatted.length > 3) && contacts[i].phoneNumbers ){
                Contacts.insert({
                                name : contacts[i].name.formatted,
                                number : contacts[i].phoneNumbers[0].value
                                });
            }
        }
    };
    
    function onError(contacts){
        alert("Cannot Access Contacts");
    }
    
};

