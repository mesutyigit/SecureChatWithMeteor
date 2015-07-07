var name;
var surname;
var phoneNumnber;

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
})

    control = function(){
        if(!isEmpty(name) && !isEmpty(surname) && !isEmpty(phoneNumber)){
            document.getElementById("done").removeAttribute("disabled");
            return true;
        }
    }