var name;
var surname;
var phoneNumber;

control = function(){
    if(!isEmpty(name) && !isEmpty(surname) && !isEmpty(phoneNumber)){
        document.getElementById("done").removeAttribute("disabled");
        return true;
    }
    return false;
}


Template.newPerson.events({
    'keyup input.pp' :function(e, tmpl){
        name = tmpl.find('#name').value;
        surname = tmpl.find('#surname').value;
        name = name.toUpperCase();
        surname = surname.toUpperCase();
        $("#pic").html("");
        if(!isEmpty(name))   $("#pic").append(name[0]);
        
        if(!isEmpty(surname))    $("#pic").append(surname[0]);
                          
    },
                          
    'keyup #phoneNumber' : function(e, tmpl){
        phoneNumber = tmpl.find('#phoneNumber').value;
        if(!control())
            document.getElementById("done").setAttribute("disabled");
        else
            document.getElementById("done").removeAttribute("disabled");
                          
                          
    }
});

if(Meteor.isCordova){
    
    Template.newPerson.events({
        'click #done' : function(e){
            e.preventDefault();
            var contact = navigator.contacts.create();
            var phoneNumbers = [];
                              
            phoneNumbers[0] = new ContactField('mobile', phoneNumber, true);
            contact.phoneNumbers = phoneNumbers;
            
            var userName = new ContactName();
            userName.givenName = name;
            userName.familyName = surname;
            contact.name = userName;
                              
            contact.save(onSuccess, onError);
                              
            function onSuccess(contact){
                Contacts.insert({
                    name : contact.name.formatted,
                    number : contact.phoneNumbers[0].value
                })
                    IonModal.close();
                
            };
                              
            function onError(contact){
                alert("olmadi");
            };
        }
    });
   
}

