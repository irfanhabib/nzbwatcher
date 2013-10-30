/**
 * User: irfanhabib
 * Date: 30/10/2013
 * Time: 18:30
 */


var applescript = require('applescript')
var nconf = require('nconf')
var fs = require('fs')
var _ = require('underscore')

nconf.argv()
    .env()
    .file({ file: 'config.json' });

var script_start = 'tell application "Unison" to open POSIX file'

setInterval(function(){
    var files = fs.readdirSync(nconf.get('nzb-path'));
    _.each(files, function(file){
        if(file.search('.nzb')!=-1){
            console.log('Download nzb: ' + file)
           var script = script_start + "\"" + nconf.get('nzb-path') + file + "\"";
            applescript.execString(script, function(err, rtn) {
                if (err) {
                    console.log('Unable to add NZB ' + file)
                } else{
                    fs.unlinkSync(nconf.get('nzb-path') + file)
                }
              });
        }
    })
},5000)