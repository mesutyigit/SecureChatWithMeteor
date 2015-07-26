if(Meteor.isCordova){
    Template.messageScreen.events({
        'click #back' : function(){
           window.history.back();
        },
        
        "click #send": function()
        {
            
            var chatDiv = $("div.chat");
            var insideDiv = $("div.inside");
            var message = document.getElementById("message").value;
            insideDiv.append('<div class="bubble me">'+ message + '</div><br/><br/><br/>');
            insideDiv.append('<div class="bubble you">'+ message + '</div><br/><br/><br/>');
            document.getElementById("message").value="";
            chatDiv.scrollTop(insideDiv.outerHeight());
            
        }
    });
    

    
}