Router.route('/', {
             template : 'home',
             name : 'home'
             });

Router.route('/signup', {
             layoutTemplate : 'signupLayout',
             template : 'signup',
             name : 'signUp'
});

Router.route('/profile', {
             layoutTemplate : 'profileLayout',
             template : 'profile',
             name : 'profile'
});