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
             name : 'messages'
});

Router.route('/settings', {
             layoutTemplate : 'profileLayout',
             template : 'settings',
             name : 'settings'
});