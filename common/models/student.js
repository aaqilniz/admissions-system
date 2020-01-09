'use strict';

const path = require('path');
var config = require('../../server/config.json');

module.exports = function(Student) {

  //mehtod called on after user creation
  Student.afterRemote('create', function(context, user, next) {

    var options = {
      type: 'email',
      to: user.email,
      from: 'naqash.ahmad2@gmail.com',
      subject: 'Verification Email',
      host: 'localhost',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: 'host:4200/#/login',
      user: user
    };
    user.verify(options, function(err, response, next) {
      if (err) {
          user.deleteById(user.id);
          return next(err);
      }
      context.res.render('response', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link ' +
              'before logging in.',
              redirectTo: '/',
              redirectToLinkText: 'Log in'
      });
    });
    next();
  });
  
  //Method to send email to reset password
  Student.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':4200/#/resetpassword';
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '"><button style="margin-left: 7px;padding: 6px 12px;text-align: center;vertical-align: middle;cursor: pointer;border: 1px solid transparent;border-radius: 4px;color: #fff;background-color: #337ab7;" >Verify</button></a></a> to reset your password';
        
    //'here' in above html is linked to : 'http://<host:port>/reset-password?access_token=<short-lived/temporary access token>'
    Student.app.models.Email.send({
      to: info.email,
      from: 'naqash.ahmad2@gmail.com',
      subject: 'Password Reset',
      text: url,
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  //mehtod to get only plain email from database
  Student.getEmail = function(email, cb) {
    Student.findOne({where: {'email': email}}, function(err, instance) {
      var response = null; 
      if(instance !== null){
         response = {
           id:instance.id,
           email:instance.email,
           emailVerified:instance.emailVerified
          }
      }
      cb(null, response);
    });
  };
  Student.remoteMethod(
    'getEmail', {
      http: {path: '/getemail', verb: 'get'},
      accepts: {arg: 'email', type: 'string', http: { source: 'query' } },
      returns: {arg: 'email', type: 'string'}
    }
  );

};
