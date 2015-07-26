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
             layoutTemplate : 'profileLayout',
             template : 'contacts',
             name : 'contacts'
});

Router.route('/profile', {
             layoutTemplate : 'profileLayout',
             template : 'profile',
             name : 'profile'
});

Router.route('/settings', {
             layoutTemplate : 'profileLayout',
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
