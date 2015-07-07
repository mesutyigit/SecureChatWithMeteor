Template.newPerson.events({
    'keyup input.pp' :function(e, tmpl){
        var name = tmpl.find('#name').value;
        var surname = tmpl.find('#surname').value;
        name = name.toUpperCase();
        surname = surname.toUpperCase();
        $("#pic").html("");
        if(name !== null)   $("#pic").append(name[0]);
        
        if(surname !== null)    $("#pic").append(surname[0]);
                          
    }
})

