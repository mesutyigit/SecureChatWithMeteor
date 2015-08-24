isEmpty = function(message){
    if(message === null)
        return true;

    return false;
}

swipeRight = function(name){//swipe function normalde baslangicta butun sayfalara otoamtik entegre edilecekti fakat intro yuzunden sorun cikti
    $(name).swipe({
        swipeRight:function(e){
            e.preventDefault();
            window.history.back();
        }
    })
    
    if(cordova.plugins.Keyboard.isVisible == true){
        cordova.plugins.Keyboard.close();
    }
}
