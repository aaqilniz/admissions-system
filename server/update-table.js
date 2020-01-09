'use strict';

var server = require('./server');
var ds = server.dataSources.mysql;
var lbTables = [
    'AccessToken', 
    'ACL', 
    'RoleMapping', 
    'Role', 
    'bankDetails', 
    'educationalDetails', 
    'extraCurricularActivities', 
    'familyDetails', 
    'fundDetails', 
    'hobbies', 
    'language', 
    'researchInterests', 
    'studentAddress', 
    'studentAptitudeTests', 
    'Student',
    'degree',
    'department',
    'degreedepartment'
];
ds.isActual(lbTables, function(err, actual) {
    if (!actual) {
        ds.autoupdate(lbTables, function(err) {
            if (err){
                throw (err);
            }
            console.log(`Loopback tables ${lbTables} created in `, ds.adapter.name);
            ds.disconnect();
        });
    } else {
        console.log('Loopback tables1');
    }
});

