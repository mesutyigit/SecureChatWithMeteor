isFirstTime = function(){
    var result = Cookie.get('getStarted');
    
    if(result === null || result == "" || result == undefined)
        return true;
    
    return false;
};

isOpened = function(){
    var result = Cookie.get('getOpened');
    
    if(result === null || result == "" || result == undefined)
        return false;
        
    return true;
}