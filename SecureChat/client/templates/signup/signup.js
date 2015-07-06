popup = function(tem, tit){
    IonPopup.show({
        title : tit,
        template : tem,
        buttons: [{
            text:'OK',
            type: 'button-positive',
            onTap: function(){
                IonPopup.close();
            }
        }]
    });
}

popupSign = function(tem, tit){
    IonPopup.show({
        title : tit,
        template : tem,
        buttons: [{
            text:'OK',
            type: 'button-balanced',
            onTap: function(){
                IonPopup.close();
                Router.go('/profile');
            }
        }]
    });
}
trimInput = function(value){
    return value.replace(/^\s*$/g, '');
    
};

isNotEmpty = function(value){
    if(value !== '')
        return true;
   
    else{
        popup('Please Fill All Boxes', 'Warning');
    }
};

isEmail = function(value){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(filter.test(value))
        return true;
    
    else{
        popup('Email is not valid', 'Warning');
    }
};

isValidPassword = function(value){
    if(value.length  < 6){
        popup('Your password must be at least 6 characters', 'Warning');
    }
    return true;
};

areValidPassword = function(value, confirm){
    if(!isValidPassword(confirm))
        return false;
    
    if(value !== confirm){
        popup('Your passwords are not equal', 'Warning');
    }
    
    return true;
}

Template.signup.events({
    'click #sign' : function(e,tmpl){
        e.preventDefault();
        var name = trimInput(tmpl.find('#name').value);
        var surname = trimInput(tmpl.find('#surName').value);
        var email = trimInput(tmpl.find('#email').value.toLowerCase());
        var password = tmpl.find('#password').value;
        var rPassword = tmpl.find('#rPassword').value;
    
        if(isNotEmpty(name) && isNotEmpty(surname) && isNotEmpty(email) && isNotEmpty(password) && isNotEmpty(rPassword) && isEmail (email) && isValidPassword(password) && areValidPassword(password, rPassword)){
                       Accounts.createUser({email: email, password: rPassword,
                            profile : {
                                name : name,
                                surname : surname,
                                createdAt : new Date,
                                status : "Available",
                                online : false,
                                lastSeen : false,
                                friends : {
                                           
                                }
                            }
                        }, function(err){
                            if(err){
                                popup('This user is already exist!', 'Warning');
                            }
                            else{
                                Meteor.loginWithPassword(email, rPassword, function(err){
                                    if(err){
                                        popup("Can't Login System!", 'Warning');
                                    }
                                    else
                                    {
                                        popupSign('Signed Up!', 'Welcome!');
                                    }
                                });
                            }
                           }
                       )
        }
                    
    }
});
