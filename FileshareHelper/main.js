
http = require('http');
//fs = require('fs');
var AdmZip = require('adm-zip');
const download = require('download');
var randomstring = require("randomstring");
var path = require('path');
const fs = require('fs-extra');
var haserror = false;
var firstlaunch = true;
var exec = require('child_process').execFile;

var fun =function(){
   console.log("fun() start");
   exec('ConsoleApplication2.exe', function(err, data) {  
        console.log(err)
        console.log(data.toString());                       
    });  
}
function downloadImage(image_url, imageDest) {
    download(image_url).then(data => {
       
        fs.writeFileSync(imageDest+'/mapimage.jpg', data);
        return;
    });
}
function extractfiles(image_url) {
    try {
    var zip = new AdmZip("../../../../../mods/temp.zip");
    var zipEntries = zip.getEntries(); // an array of ZipEntry records

    zipEntries.forEach(function(zipEntry) {
        //console.log(zipEntry.toString()); // outputs zip entries information
        //console.log(zipEntry.header.size);
       if (zipEntry.name == "sandbox.map") {
            if (zipEntry.header.size == 61440) {
                if (zipEntry.entryName == "sandbox.map") {
                    zip.extractEntryTo(/*entry name*/zipEntry.entryName, "../../../../../mods/maps/" +randomstring.generate(10) , true, true);
                }
                else {
                    zip.extractEntryTo(/*entry name*/zipEntry.entryName, "tmp", true, true);
                    var folderName = path.dirname("tmp/" + zipEntry.entryName);
                    var pfolderName = path.basename(folderName);
                    fs.copySync(folderName, "../../../../../mods/maps/" + pfolderName);
                    downloadImage(image_url, "../../../../../mods/maps/" + pfolderName);

                      
                    //fs.copy(folderName, "../../../../../mods/maps/");
                    fs.removeSync('tmp');
                    fun();

                }
            }
            else {
                haserror = true;
            }
        }
        else if (zipEntry.name == "variant.ctf" || zipEntry.name == "variant.slayer" || zipEntry.name == "variant.oddball"|| zipEntry.name == "variant.koth" || zipEntry.name == "variant.forge" || zipEntry.name == "variant.vip" || zipEntry.name == "variant.jugg" || zipEntry.name == "variant.terries" || zipEntry.name == "variant.assault" || zipEntry.name == "variant.zombiez") {
            if (zipEntry.header.size == 4096) {
                if(zipEntry.entryName == "variant.ctf" || zipEntry.entryName == "variant.slayer" || zipEntry.entryName == "variant.oddball"|| zipEntry.entryName == "variant.koth" || zipEntry.entryName == "variant.forge" || zipEntry.entryName == "variant.vip" || zipEntry.entryName == "variant.jugg" || zipEntry.entryName == "variant.terries" || zipEntry.entryName == "variant.assault" || zipEntry.entryName == "variant.zombiez"){
                    zip.extractEntryTo(/*entry name*/zipEntry.entryName, "../../../../../mods/variants/" +randomstring.generate(10) , true, true);
                }
                else {
                    zip.extractEntryTo(/*entry name*/zipEntry.entryName, "../../../../../mods/variants", true, true);
                }
            }
            else {
                haserror = true;
            }
        }
    
    });
    fs.unlinkSync("../../../../../mods/temp.zip");
    }
    catch(error){
        haserror = true;
    }
}

server = http.createServer( function(req, res) {
    
    res.setHeader('Access-Control-Allow-Origin', 'http://christianvaughngames.com');
    
    console.dir(req.param);

    if (req.method == 'POST') {
        try {
        //console.log("POST");
        var body = '';
        req.on('data', function (data) {
            body += data;
            var nameArr = body.split(',');
            var file_url = nameArr[0];
           var image_url = nameArr[1];

          download(file_url).then(data => {
              console.log(file_url.slice(-3));

            if (file_url.slice(-4) == ".map") {
                if (!fs.existsSync('../../../../../mods/tmp/')){

                    fs.mkdirSync('../../../../../mods/tmp/');
                }

                fs.writeFileSync('../../../../../mods/tmp/sandbox.map', data);

                var folderName = path.dirname('../../../../../mods/tmp/sandbox.map');
                var folderName2 = path.dirname('../../../../../mods/tmp/mapimage.jpg');
                var pfolderName = path.basename(folderName);
                
                var ran = randomstring.generate(10);
                fs.copySync(folderName, "../../../../../mods/maps/" + ran);
                downloadImage(image_url, "../../../../../mods/maps/" + ran);

                //fs.copy(folderName, "../../../../../mods/maps/");
                fs.removeSync('../../../../../mods/tmp');
                fun();
            }
            else {

                fs.writeFileSync('../../../../../mods/temp.zip', data);
                extractfiles(image_url);
            }
            
            if(haserror == true) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('post received');
            haserror == false;
            }
            else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('post received');        
            }
            
            });
        });
        req.on('end', function () {
     
          
        });
        }
        catch(error) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('post received');
            haserror == false;
        }
  
            
        
        
    }
    else
    {
        
    }

});

port = 3000;
host = '127.0.0.1';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
if(firstlaunch) {
    fun();
    firstlaunch = false;
}