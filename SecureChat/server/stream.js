keyTaked.permissions.write(function(eventName){
    	return eventName == 'key';
	});
	
	keyTaked.permissions.read(function(eventName){
		return this.userId == eventName;
	});

	keyTaked.on('key', function(message, owner, list){	
    	list.forEach(function(userId){
    		keyTaked.emit(list, message, owner);
		});
	});

	keyGen.permissions.write(function(eventName){
		return eventName == 'keyGen';
	});
    
	keyGen.permissions.read(function(eventName){
		return this.userId == eventName; 
	});	

	keyGen.on('keyGen', function(message, owner){
    	owner.forEach(function(userId){
    		keyGen.emit(owner, message);
		});
	});