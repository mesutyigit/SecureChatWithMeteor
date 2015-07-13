keyTaked = new Meteor.Stream('key');
keyGen = new Meteor.Stream('keyGen');

if (Meteor.isClient) {
  // counter starts at 0
}

if (Meteor.isServer) {
  keyTaked.permissions.read(function(){
        return true;
    });
    
    keyTaked.permissions.write(function(){
        return true;
    });
    
    keyGen.permissions.read(function(){
        return true; 
    });
    
    keyGen.permissions.write(function(){
        return true;
    });   
    
}
