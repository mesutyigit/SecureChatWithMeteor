//*TODO* Resim gonderirken ki divler icin stylelar classlara ayrilacak
//*TODO* Android icin resim secme kaliteli hale getirilecek suan data olarak almak mumkun fakat almiyorum NATIVE_URI sorunu cozulmeli!
//*TODO* Mesaj ekraninda video cekim            

if(Meteor.isCordova){
    var destinationType;
    var pictureSource;
    var messages = [];
    Session.setDefault('messagesCounter', 0);/*secilen mesaj sayisini reaktif olarak bildirmek icin */
    var sendButtonControl;
    
    Template.messageScreen.helpers({
        img : function(){
            return Background.findOne({userId : Meteor.userId()}).image;//arka plan resmi
        },       
        
		height : function(){
			return $(window).height();// arka plan resmi yuksekligi her ekrana gore uyumlu olsun
		},
        
        random : function(){
            return Random.id();
        },
        
        counter : function(){
            return Session.get('messagesCounter');
        }
    })
    
    Template.messageScreen.rendered = function(){ 
        
        //$("#message").css("height", "100%");
        
        sendButtonControl = document.getElementById('message');//Textareayi degiskene atama
        
        
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
            
            
            
            else{
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
            alert(document.getElementById('message').height());
           
        }
        
        if(Platform.isAndroid()){//baslangicta klavye acilmasi icin
            cordova.plugins.Keyboard.show();
            document.getElementById('message').focus();
        }
        
        else{
            document.getElementById('message').focus();//iOS klavye otomatik acilsin diye  
        }
        
    }
    
    
    window.addEventListener('native.keyboardshow', function(event){//klavye acildigi zaman android height dusur ve en son mesaja scroll yap
        if(Platform.isAndroid()){
            $('div.insideAndroid').css('height', '93%');
            $('div.bubble:last').get(0).scrollIntoView();
        }
        
        else{
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);//ios done next back toolu klavye acildigi zaman gozukmemesi icin
            document.getElementById('message').focus();//klavye acilinca otomatik textarea focus ol
            $('div.bubble:last').get(0).scrollIntoView();//en son mesaja odaklan    
        }
        
        
        
    });
    
    window.addEventListener('native.keyboardhide', function(event){//klavye kapandiginda eger textarea da birsey yoksa height oranlarini dusur
        if(sendButtonControl.value == ""){
            $('#tab').css("height", '50px');   
            //$('#message').css("height", '35px');
            
        }
        
        if(Platform.isAndroid()){
            $('div.insideAndroid').css('height', '100%'); //android icin kucultulen div buyut
            
        }
                  
        
    });
    
    Template.messageScreen.events({
        /*'swiperight .chatAndroid ' : function(e){//ekranda saga kaydirdigin zaman geri gitme (Android)
           cordova.plugins.Keyboard.close();
           window.history.back();    
        },
        
        'swiperight .chat' : function(e){//ekranda saga kaydirdigin zaman geri gitme (iOS)
            cordova.plugins.Keyboard.close();
            window.history.back();
        },*/
        
        'keydown #message' : function(e){
            if(e.keyCode == 13){//eger yazi yazilirken enter basilirsa
                if(($(window).height() / 2) <= $('#message').height()){//eger tabin(textareanin oldugu kisim) height degeri ekranin toplam boyutunun yarisindan buyuk veya esit olursa 
                    return;
                }
                else{
                    $('#message').animate({height : '+=15px'}, 'fast');//eger olmaz ise her entera basildigi zaman tab ve mesaj kisminin heightini 15px arttir
                    $('#message').animate({height : '+=15px'}, 'fast');
                    $('insideAndroid').animate({height: '-=20px'}, 'fast');
                    $('insideAndroid').css('overflow', 'hidden');
                    $('insideAndroid').scrollTop($('insideAndroid')[0].scrollHeight);
                    $('insideAndroid').css('overflow', 'scroll');
                }
                
                
            }
                
                
        },
        
        'keyup #message' : function(){
            if(sendButtonControl.value !== ""){// eger textareada herhangi bir deger var ise send butonunu enable yap
                $('#sendAndroid').attr('disabled', false);
                $('#sendiOS').attr('disabled', false);
            } 
            else{//yok ise disable yap
                $('#sendAndroid').attr('disabled', true);
                $('#sendiOS').attr('disabled', true);
            }
                 
                  
        },
        
        'click #message' : function(){
            if(sendButtonControl.value !== "" || sendButtonControl.value !== " "){//eger textarea ya tiklandigi zaman textarea bos degil ise send butonu aktif hale getir
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
                       navigator.camera.getPicture()//Fotograf Cekim
                       
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
        
        "taphold .fromMe" : function(e){
            /* mesaj baloncuguna basili tutuldugu zaman ios icin secilen baloncugun arka plan resmi degisir
            ayni zaman da butun ic dive clicable classi eklenir 
            bu class sayesinde tek seferde click islemi yapip mesaj baloncugunu secebiliriz
            ust tabdan kisi isminin display none yapilir onun yerine secilen mesaj sayisini reaktif olarak gosteren counter gelir
            iOS icin : alt tarafa tab eklenir bu tablarda kisinin yapabilecegi eylemelr mevcuttur
            ** TODOS ** fromMe ve fromYou olarak degistir arka plan renklerinin farkliligindan dolayi!
            */
            
            if(Platform.isAndroid()){
                
            }   
            
            else{
                
                var message = e.currentTarget;
                messages.push(message.id);
                $('#' + message.id + '').css('background-color', '#607D8B');
                $('.bubble').addClass("clickable");
                Session.set('messagesCounter', messages.length);
                $('.friendName').css('display', 'none');
                $('.counter').css('display', 'block');
                $('#tabMessage').css('display', 'none');
                $('#tabButtons').css('display', 'block');
                
            }
        },
        
        "click .clickable" : function(e){
            /*Bu class sayesinde her tiklamada secilen mesaj baloncugu messages arrayine aktarilir
             */
             
            if(Platform.isAndroid()){
                
            }
            else{
                var message = e.currentTarget;
                /*Eger tiklanan mesaj baloncugunun arka plan rengi zaten daha onceden degismis ise bu mesaj baloncugu daha onceden secilmis demektir
                bu nedenden dolayi da o mesaj baloncugunun idsini messages arrayinden cikartip arka plan resmini de duzeltiriz
                ** TODO ** Benden giden ve karsidan gelen diye ayrim yapilmasi gerekli!*/
                
                if($('#' + message.id + '').css("background-color") === "rgb(255, 0, 0)"){
                    console.log('red');
                    var index = messages.indexOf(message.id);
                    messages.pop(index, 1);
                    $('#' + message.id + '').css("background-color", '#b9f6ca');
                    Session.set('messagesCounter', messages.length);
                }
                else{
                    messages.push(message.id);
                    $('#' + message.id + '').css('background-color', '#607D8B'); 
                    Session.set('messagesCounter', messages.length);
                }
                
            }
            
        },
        
         /*iOS ta tapholddan sonra alt tarafta cikan tabdaki secenekler*/
         
        "click .iosDelete" : function(e){
            
            console.log('clicked iosDelete'); 
        },
        
        "click .iosForward" : function(e){
            console.log('clicked iosForward');
        },
        
        "click .iosCopy" : function(e){
            console.log('clocked iosCopy');
        },
        
        "click .iosCancel" : function(e){
            /*Bu taba tiklandigi zaman tum tasarim eski haline donup messages arrayi bosaltilmalidir */
            console.log("clicked iosCancel");
            $('.bubble me').css('background-color', '#b9f6ca');
            $('.bubble you').css('background-color', 'white');
            messages = [];
            Session.set('messagesCounter', messages.length);
            $('#tabButtons').css('display', 'none');
            $('#tabMessage').css('display', '-webkit-flex');
        },
       
            /* Android icin gonder butonunda yapilacak islemler */
        "touchstart #sendAndroid" : function(e){
            /* her entera basildigi zaman tabin heighti yukseltildigi icin butona basildigi zaman tekrar eski haline getir */ 
            $('#message').css("height", '90%'); /* her entera basildigi zaman textareanin heighti yukseltildigi icin butona basildigi zaman tekrar eski haline getir */
            
            var insideAndroid = $("div.insideAndroid");
            var message = document.getElementById("message").value;
            message = message.replace(/\n/g, '<br>');//entera basildigi zaman ekrana bosluk koymasi icin /g butun elemanlari kontrol ediyor
            insideAndroid.append('<div class="bubble ' + localStorage.getItem('font') + ' me fromMe " id='+ Random.id() +'>'+ message + '</div>');/* Userin belirledigi font boyutu ile ekranda mesaji goster */
            insideAndroid.append('<div class="bubble ' + localStorage.getItem('font') + ' you fromYou" id =' + Random.id() +  '>'+ message + '</div>');
            document.getElementById("message").value=""; /* Textareanin icini bosalt */
            /* Android icin her send e basildigi zaman scrollu en alta kaydirma */
            insideAndroid.css('overflow', 'hidden');
            insideAndroid.scrollTop((insideAndroid[0].scrollHeight) + 5) ;
            insideAndroid.css('overflow', 'scroll');
            /* Gondere basildigi zaman bos mesaj yollanamamasi icin send butonunu disabled yap */
            $('#sendAndroid').attr('disabled', true);
            $('#message').focus();
            cordova.plugins.Keyboard.show();
            
        },
        
        "touchend #sendAndroid" : function(){
            /* Send butonundan el kalktigi zaman herhangi bir sey gerceklestirme */
            return;
        },
        
        "touchstart #sendiOS": function()
        {
            $('#tabMessage').css("height", '50px'); /* her entera basildigi zaman tabMessagein heighti yukseltildigi icin butona basildigi zaman tekrar eski haline getir */  
            $('#message').css("height", '35px'); /* her entera basildigi zaman textareanin heighti yukseltildigi icin butona basildigi zaman tekrar eski haline getir */ 
            var insideiOS = $("div.inside");
            var chatiOS = $("div.chat");
            var message = document.getElementById("message").value;
            message = message.replace(/\n/g, '<br>');//entera basildigi zaman ekrana bosluk koymasi icin /g butun elemanlari kontrol ediyor
            insideiOS.append('<div class="bubble ' + localStorage.getItem('font') + ' me fromMe" id='+ Random.id() +'>'+ message + '</div>'); /* Userin belirledigi font boyutu ile ekranda mesaji goster */
            insideiOS.append('<div class="bubble ' + localStorage.getItem('font') +' you fromYou" id='+ Random.id() + '>'+ message + '</div>');
            document.getElementById("message").value="";/* Textareanin icini bosalt */
            $('div.bubble:last').get(0).scrollIntoView(); /* iOS icin her send e basildigi zaman scrollu en alta kaydirma */
            $('#sendiOS').attr('disabled', true);/* Gondere basildigi zaman bos mesaj yollanamamasi icin send butonunu disabled yap */
            
            
        },    
        
        "touchend #sendiOS" : function(){
            //document.getElementById('message').focus();
            return;
        },
        
        "click #back" : function(e){
            e.preventDefault()
            cordova.plugins.Keyboard.close();
            Router.go('/profile');
        },
        
        /*"taphold .fromMe" : function(e){
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
                   
           
        },*/
        
      
    });
    
   

}
