App.info({
         name: 'Secure',
         description: 'An app built with Meteor',
         version: '0.0.1',
         author : 'Fili Labs'
});

App.icons({
    //iOS
    'iphone' : 'public/icons/120x120.png',
    'iphone_2x' : 'public/icons/120x120.png',
    'iphone_3x' : 'public/icons/120x120.png',  
    
    //android  
    'android_ldpi' : 'public/icons/36x36.png',
    'android_mdpi' : 'public/icons/48x48.png',
    'android_hdpi' : 'public/icons/72x72.png',
    'android_xhdpi' : 'public/icons/96x96.png'
});

App.launchScreens({
    'android_ldpi_portrait' : 'public/splash/200x320.jpg',
    'android_ldpi_landscape' : 'public/splash/320x200.jpg',
    'android_mdpi_portrait' : 'public/splash/320x480.jpg',
    'android_mdpi_landscape' : 'public/splash/480x320.jpg',
    'android_hdpi_portrait' : 'public/splash/480x800.jpg',
    'android_hdpi_landscape' : 'public/splash/800x480.jpg',
    'android_xhdpi_portrait' : 'public/splash/720x1280.jpg',
    'android_xhdpi_landscape' : 'public/splash/1280x720.jpg'
    
})

App.setPreference("StatusBarOverlaysWebView", false);
App.setPreference("StatusBarBackgroundColor", "#00695C");



