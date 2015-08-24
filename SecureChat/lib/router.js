Router.route('/', {
             template : 'home',
             name : 'home'
             });

Router.route('/signup', {
             layoutTemplate : 'signupLayout',
             template : 'signup',
             name : 'signUp'
});

Router.route('/contacts', {
             layoutTemplate : 'contactsLayout',
             template : 'contacts',
             name : 'contacts'
});

Router.route('/profile', {
             layoutTemplate : 'profileLayout',
             template : 'profile',
             name : 'profile'
});

Router.route('/settings', {
             layoutTemplate : 'contactsLayout',
             template : 'settings',
             name : 'settings'
});

/*Router.route('/profile/:friendId' ,{
             layoutTemplate : 'messageScreenLayout',
             template : 'messageScreen',
             name : 'message.Screen'
});*/

Router.route('/profile/:_id' ,{
             layoutTemplate : 'messageScreenLayout',
             template : 'messageScreen',
             name : 'message.Screen'
});

Router.route('/settings/profile',{
    layoutTemplate : 'profileSettingsLayout',
    template : 'profileSettings',
    name : 'profileSettings'
});

Router.route('/settings/chat',{
    layoutTemplate : 'chatSettingsLayout',
    template : 'chatSettings',
    name : 'chatSettings',
});

Router.route('/settings/chat/backgroundSettings',{
    layoutTemplate : 'chatSettingsLayout',
    template : 'backgroundSettings',
    name : 'backgroundSettings'
});

Router.route('/settings/chat/backgroundSettings/wallpapers',{
    layoutTemplate : 'chatSettingsLayout',
    template : 'wallpapersSettings',
    name : 'wallpapersSettings'
});

Router.route('/wallpaperTry',{
   layoutTemplate : 'chatSettingsLayout',
   template : 'wallpaperTry',
   name : 'wallpaperTry' 
});

Router.route('/fontSize', {
    layoutTemplate : 'chatSettingsLayout',
    template : 'fontSize',
    name : 'fontSize'
});

Router.route('/photoView', {
    layoutTemplate : 'chatSettingsLayout',
    template : 'photoView',
    name : 'photoView'
})

Router.route('/settings/notifications',{
    layoutTemplate: '',
    template : '',
    name : 'notificationsSettings'
});
