isFirstTime = function(){
    var result = Cookie.get('getStarted');
    
    if(result === null || result == "" || result == undefined)
        return true;
    
    return false;
};
