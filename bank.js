var chase = require('chase-bank');
var _ = require('underscore');
 
chase.login('alex1dinsmore',"!Weare138",'emb.deviceSigCookieValue').then(function(profile){
        console.log(JSON.stringify(profile,null,2));
});