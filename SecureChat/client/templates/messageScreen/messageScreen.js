//*TODO* Resim gonderirken ki divler icin stylelar classlara ayrilacak
//*TODO* Android icin resim secme kaliteli hale getirilecek suan data olarak almak mumkun fakat almiyorum NATIVE_URI sorunu cozulmeli!
//*TODO* Mesaj ekraninda video cekim            

if(Meteor.isCordova){
    var destinationType;
    var pictureSource;
    
    Template.messageScreen.helpers({
        img : function(){
            return Background.findOne({userId : Meteor.userId()}).image;//arka plan resmi
        },       
        
		height : function(){
			return $(window).height();// arka plan resmi yuksekligi her ekrana gore uyumlu olsun
		}
    })
    
    Template.messageScreen.rendered = function(){ 
        
        pictureSource = navigator.camera.PictureSourceType;//cordova photo kullanabilmek icin
        destinationType = navigator.camera.DestinationType;//cordova photo kullanabilmek icin
        
        var height = localStorage.getItem('photoHeight');//kullanicinin karsi tarafa gondermek icin sectigi resmin height orani
        var width = localStorage.getItem('photoWidth');//kullanicinin karsi tarafa gondermek icin sectigi resmin width orani
        
        if(localStorage.getItem('full') === 'true'){//eger kullanici karsi tarafa gondermek icin sectigi resmi onaylar ise true olur 
            
            /*Bundan sonraki if durumlari kullanicinin sectigi resmin height/width oranlarina gore belirlenir height/width orani belli bir oranda oldugu zaman
            resmin gonderilecegi mesaj balonu o orana gore olusur*/
            
            
            
            if(Platform.isAndroid()){//android ise
                
                if(localStorage.getItem('photoHeight') / localStorage.getItem('photoWidth') < 0.70){// height/width orani 0.70 ten kucuk ise
                    $('div.insideAndroid').append('<div class="bubblePhoto me fromMe" id='+ Random.id() +' style="height:150px; width:75px;"><img src="' + localStorage.getItem('selectedPhoto') + '" class="img"></img></div>');
                    $('div.insideAndroid').css('overflow', 'hidden');
                    $('div.insideAndroid').scrollTop($('div.insideAndroid')[0].scrollHeight);
                    $('div.insideAndroid').css('overflow', 'scroll');  
                    localStorage.setItem('full', 'false');  
                }
                                  
            }
            
            
            
            if((height / width) < 0.64){//height/width 0.64 ten kucuk ise
                console.log("lower than 0.64");
                $('div.inside').append('<div class="bubble64 me" ><div class="bubblePhoto64 me fromMePhoto" id='+ Random.id() +' style="background-image : url(' + localStorage.getItem('selectedPhoto') + '); "></div></div>');
                localStorage.setItem('full', 'false');
            }
            else if((height / width) < 0.66){//height/width 0.66 ten kucuk ise
                console.log("lower than 0.66");
                $('div.inside').append('<div class="bubble66 me""><div class="bubblePhoto me fromMePhoto" id='+ Random.id() +' style="height:100px; width:150px; background-image : url(' + localStorage.getItem('selectedPhoto') + '); background-size: cover; zoom:110%; border:0.5px solid #b9f6ca; background-clip : content-box;"></div></div>');
                localStorage.setItem('full', 'false');
                
            }
            else if((height / width) < 0.70){//height/width 0.70 ten kucuk ise
                console.log("lower than 0.70");
                $('div.inside').append('<div class="bubble70 me" style="max-width: 69%;"><div class="bubblePhoto me fromMePhoto" id='+ Random.id() +' style="height:125px; width:250px; background-image : url(' + localStorage.getItem('selectedPhoto') + '); background-size: cover; border:0.5px solid #b9f6ca"></div></div>');
                localStorage.setItem('full', 'false');
            }
            else{//height/width orani yuksek oranda ise
                console.log("else");
                $('div.inside').append('<div class="bubbleHigh me" style="max-width:77%;"><div class="bubblePhoto me fromMePhoto" id='+ Random.id() +' style="height:200px; width:275px; background-image : url(' + localStorage.getItem('selectedPhoto') + '); background-size: cover; border:0.5px solid #b9f6ca;zoom: 103%;"></div></div>');
                localStorage.setItem('full', 'false');
            }
            
            
            
        }
        
        if(Platform.isAndroid()){//baslangicta klavye acilmasi icin
            try{cordova.plugins.Keyboard.show();
            document.querySelector('#message').focus();
            }
        catch(e){
        }
        
        document.getElementById('message').focus();//iOS klavye otomatik acilsin diye
        }
        
    }
    
    
    window.addEventListener('native.keyboardshow', function(event){//klavye acildigi zaman android height dusur ve en son mesaja scroll yap
        if(Platform.isAndroid()){
            $('div.insideAndroid').css('height', '93%');
            $('div.bubble:last').get(0).scrollIntoView();
           
        }
        
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);//ios done next back toolu klavye acildigi zaman gozukmemesi icin
        document.getElementById('message').focus();//klavye acilinca otomatik textarea focus ol
        $('div.bubble:last').get(0).scrollIntoView();//en son mesaja odaklan
        
    });
    
    window.addEventListener('native.keyboardhide', function(event){//klavye kapandiginda eger textarea da birsey yoksa height oranlarini dusur
        if(document.getElementById('message').value == ""){
            $('#tab').css("height", '50px');   
            $('#message').css("height", '35px');
            
        }
        
        if(Platform.isAndroid()){
            $('div.insideAndroid').css('height', '100%'); //android icin kucultulen div buyut
            
        }
                  
        //keyboardHeight = event.keyboardHeight;
        
    });
    
    Template.messageScreen.events({
        'swiperight .chatAndroid ' : function(e){//ekranda saga kaydirdigin zaman geri gitme (Android)
           cordova.plugins.Keyboard.close();
           window.history.back();    
        },
        
        'swiperight .chatiOS' : function(e){//ekranda saga kaydirdigin zaman geri gitme (iOS)
            cordova.plugins.Keyboard.close();
            window.history.back();
        },
        
        'keydown #message' : function(e){
            if(e.keyCode == 13){//eger yazi yazilirken enter basilirsa
                if(($(window).height() / 2) <= $('#tab').height()){//eger tabin(textareanin oldugu kisim) height degeri ekranin toplam boyutunun yarisindan buyuk veya esit olursa 
                    return;
                }
                else{
                    $('#tab').animate({height : '+=15px'}, 'fast');//eger olmaz ise her entera basildigi zaman tab ve mesaj kisminin heightini 15px arttir
                    $('#message').animate({height : '+=15px'}, 'fast');
                    $('insideAndroid').animate({height: '-=20px'}, 'fast');
                    $('insideAndroid').css('overflow', 'hidden');
                    $('insideAndroid').scrollTop($('insideAndroid')[0].scrollHeight);
                    $('insideAndroid').css('overflow', 'scroll');
                }
                
                
            }
                
                
        },
        
        'keyup #message' : function(){
            if(document.getElementById('message').value !== ""){// eger textareada herhangi bir deger var ise send butonunu enable yap
                $('#sendAndroid').attr('disabled', false);
                $('#sendiOS').attr('disabled', false);
            } 
            else{//yok ise disable yap
                $('#sendAndroid').attr('disabled', true);
                $('#sendiOS').attr('disabled', true);
            }
                 
                  
        },
        
        'click #message' : function(){
            if(document.getElementById('message').value !== ""){//eger textarea ya tiklandigi zaman textarea bos degil ise send butonu aktif hale getir
                $('#sendAndroid').attr('disabled', false);
                $('#sendiOS').attr('disabled', false);
            } 
            else{//deger yok ise disable yap
                $('#sendAndroid').attr('disabled', true);
                $('#sendiOS').attr('disabled', true);
            }
        },
        
        /*'click .img' : function(e){
            var image = e.currentTarget;
            Router.go('/photoView');
        },*/
        
        'click #attachment' : function(){
            /* video cekim duzenlenecek var optionsCamera = {
                width : '100',
                height : '100',
                quality : 100
            }
            
            var captureSuccess = function(mediaFiles){
                var i, path, len;
                    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                        path = mediaFiles[i].fullPath;
                        // do something interesting with the file
                }
            }*/
            
            IonActionSheet.show({/* attachment butonuna basildigi zaman olusacak ActionSheet menusu*/
                
                buttons: [
                    { text: '<i class="icon ion-camera">&nbsp;Take Photo</i>' },
                    { text: '<i class="icon ion-videocamera">&nbsp;Take Video</i> ' },
                    { text: '<i class="icon ion-images">&nbsp;Photo/Video Library</i> ' }
                    
                ],
                cancelText: '<b>Cancel</b>',
                cancel: function() {
                    IonActionSheet.close();
                },
                buttonClicked: function(index) {
                    if (index === 0) {
                       navigator.camera.getPicture()//Video Cekim
                       
                    }
                    
                    if(index === 1){
                        //navigator.device.capture.captureVideo(captureSuccess, captureError);    
                    }
                    
                    if (index === 2) {
                        function onPhotoURISuccess(imageURI){
                            /*Native URI alindigi zaman guvenlik icin kendi local dosyalarini kullanamiyoruz. Bu yuzden kendimize yeni bir URI ayirt ettirip
                            aldigimiz URI i oraya aktariyoruz*/
                            
                            /* Suan sadece iOS ta calisiyor*/
                            
                            window.resolveLocalFileSystemURI(imageURI, function(fileEntry){
                                if(PhotoView.find({}).count() == 0){//eger photoView collectioninda data yok ise secilen resmin nativeURL ini insert et
                                    PhotoView.insert({
                                        userId : Meteor.userId(),
                                        img : fileEntry.nativeURL
                                    })
                                }
                                else{//data varsa suankini guncelle
                                    PhotoView.update({userId : Meteor.userId()}, {$set : {img : fileEntry.nativeURL}});
                                    
                                }
                                Router.go('/photoView');//photoView linkine git
                            })
                        
                            }
                            
                        function onFail(){
                            
                        }
                        navigator.camera.getPicture(onPhotoURISuccess, onFail,{
                            quality : 100,
                            destinationType : destinationType.NATIVE_URI,//fotografin native_URI al
                            sourceType : pictureSource.PHOTOLIBRARY,//Nerden alinacagi (Gallery)
                            mediaType : Camera.MediaType.ALLMEDIA//Ne tur datalar goruntulenecegi (Hepsi)
                        });
                        
                    }
                    
                    return true;
                },
                
                });
        },
       
        "touchstart #sendAndroid" : function(e){
            $('div.insideAndroid').css('height', '100%');
            $('#tab').css("height", '50px');   
            $('#message').css("height", '35px');
            var id = Random.id();
            var insideAndroid = $("div.insideAndroid");
            var message = document.getElementById("message").value;
            message = message.replace(/\n/g, '<br>');//entera basildigi zaman ekrana bosluk koymasi icin /g butun elemanlari kontrol ediyor
            insideAndroid.append('<div class="bubble ' + localStorage.getItem('font') + ' me fromMe " id='+ id +'>'+ message + '</div>');
            insideAndroid.append('<div class="bubble ' + localStorage.getItem('font') + ' you fromYou" id =' + (id + 1) +  '>'+ message + '</div>');
            document.getElementById("message").value="";
            insideAndroid.css('overflow', 'hidden');
            insideAndroid.scrollTop(insideAndroid[0].scrollHeight);
            insideAndroid.css('overflow', 'scroll');
            $('#sendAndroid').attr('disabled', true);
            
        },
        
        "touchend #sendAndroid" : function(){
            return;
        },
        
        "touchstart #sendiOS": function()
        {
            $('#tab').css("height", '50px');   
            $('#message').css("height", '35px');
            var id = Random.id();
            var insideiOS = $("div.inside");
            var chatiOS = $("div.chat");
            var message = document.getElementById("message").value;
            message = message.replace(/\n/g, '<br>');//entera basildigi zaman ekrana bosluk koymasi icin /g butun elemanlari kontrol ediyor
            insideiOS.append('<div class="bubble ' + localStorage.getItem('font') + ' me fromMe" id='+ id +'>'+ message + '</div>');
            insideiOS.append('<div class="bubble ' + localStorage.getItem('font') +' you fromYou" id='+ (id + 1) + '>'+ message + '</div>');
            document.getElementById("message").value="";
            $('div.bubble:last').get(0).scrollIntoView();
            $('#sendiOS').attr('disabled', true);
            
            
        },    
        
        "touchend #sendiOS" : function(){
            document.getElementById('message').focus();
            return;
        },
        
        "click #back" : function(e){
            e.preventDefault()
            cordova.plugins.Keyboard.close();
            window.history.back();
        },
        
        "taphold .fromMe" : function(e){
           var bubble = e.currentTarget;
           //e.preventDefault();
           
                   IonPopup.show({
                        title : 'Choose an Action For',
                        template : ' ' + bubble.innerText + '' ,
                        buttons:[{
                            text: 'Delete',
                            type :'button-delete',
                            onTap : function(){
                                $('#' + bubble.id + '').remove();
                                IonPopup.close(); 
                            }
                            
                        },
                        {
                            text : 'Copy',
                            type : 'button-calm',
                            onTap : function(){
                                cordova.plugins.clipboard.copy(bubble.innerText);
                                IonPopup.close();
                                
                            }
                        },
                        {
                            
                            text : 'Reply',
                            type : 'button-reply',
                            onTap : function(){
                                document.getElementById('message').value = bubble.innerText;
                                IonPopup.close();
                            }
                        
                        }
                        ]
                    });
                   
               
           
           
        },
       
        "taphold .fromMePhoto" : function(e){
           var bubble = e.currentTarget;
           //e.preventDefault();
                   IonPopup.show({
                        title : 'Choose an Action For',
                        template : ' Photo ' ,
                        buttons:[{
                            text: 'Delete',
                            type :'button-delete',
                            onTap : function(){
                                //$(this).remove();
                                $('#' + bubble.id + '').parent().remove();
                                IonPopup.close(); 
                            }
                            
                        },
                        {
                            text : 'Copy',
                            type : 'button-calm',
                            onTap : function(){
                                cordova.plugins.clipboard.copy(bubble.style.backgroundImage);
                                IonPopup.close();
                                
                            }
                        },
                        {
                            
                            text : 'Reply',
                            type : 'button-reply',
                            onTap : function(){
                                document.getElementById('message').value = bubble.innerText;
                                IonPopup.close();
                            }
                        
                        }
                        ]
                    });
                   
         
        },
        
        "taphold .fromYou" : function(e){
            var bubble = e.currentTarget;
            
                   IonPopup.show({
                        title : 'Choose an Action',
                        template : '',
                        buttons:[{
                            text: 'Delete',
                            type :'button-delete',
                            onTap : function(){
                                $("#" + bubble.id + '').detach();
                                $("#" + bubble.id + '').remove();
                                IonPopup.close(); 
                                
                            }
                            
                        },
                        {
                            text : 'Copy',
                            type : 'button-calm',
                            onTap : function(){
                                cordova.plugins.clipboard.copy(bubble.innerText);
                                IonPopup.close();
                                
                                
                            }
                        },
                        {
                            
                            text : 'Reply',
                            type : 'button-reply',
                            onTap : function(){
                                document.getElementById('message').value = bubble.innerText;
                                IonPopup.close();
                            }
                        
                        }
                        ]
                    });
                   
           
        },
        
      
    });
    
   

}
