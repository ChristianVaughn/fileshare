
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
   exec('FileshareTool.exe', function(err, data) {  
        console.log(err)
        console.log(data.toString());                       
    });  
}



function downloadVariant(data, gametype) {

    if (!fs.existsSync('../../../../../mods/variants/pmetpmet')){

        fs.mkdirSync('../../../../../mods/variants/pmetpmet');
    }

    fs.writeFileSync('../../../../../mods/variants/pmetpmet/variant'+ gametype, data);
    fun();
     
}
function downloadPrefab(data, fabname) {

    if (!fs.existsSync('../../../../../mods/prefabs/' )){

        fs.mkdirSync('../../../../../mods/prefabs/');
    }

    fs.writeFileSync('../../../../../mods/prefabs/'+ fabname, data);
}
function downloadMap(image_url, data) {
    var ran = randomstring.generate(10);

    if (!fs.existsSync('../../../../../mods/maps/pmetpmet')){

        fs.mkdirSync('../../../../../mods/maps/pmetpmet');
    }

    fs.writeFileSync('../../../../../mods/maps/pmetpmet/sandbox.map', data);
    download(image_url).then(data => {
       
        fs.writeFileSync('../../../../../mods/maps/pmetpmet/mapimage.jpg', data);
        fun();
    });
     
}
function extractfiles(image_url) {
    try {
    var zip = new AdmZip("../../../../../mods/temp.zip");
    var zipEntries = zip.getEntries(); // an array of ZipEntry records
    var mapcount = 0;
    var idk = false;
    var varcount = 0;
    zipEntries.forEach(function(zipEntry) {
        //console.log(zipEntry.toString()); // outputs zip entries information
        //console.log(zipEntry.header.size);
        console.log (zipEntry.entryName);
       if (zipEntry.name == "sandbox.map") {
           idk = true;
            if (zipEntry.header.size == 61440) {
               
                    zip.extractEntryTo(/*entry name*/zipEntry.entryName, "../../../../../mods/maps/pmetpmet"+mapcount, false, true);
                    console.log ("Extracted " +zipEntry.entryName);
                    mapcount++;
                  //  download(image_url).then(data => {
                      //  console.log ("downloaded image for " +zipEntry.entryName);

                    //    fs.writeFileSync('../../../../../mods/maps/pmetpmet/mapimage.jpg', data);
                     //   console.log ("downddloaded image for " +zipEntry.entryName);
                      //     fun();
                  //  });
                    


                
            }
            else {
                haserror = true;
            }
        }
        else if (zipEntry.name == "variant.ctf" || zipEntry.name == "variant.slayer" || zipEntry.name == "variant.oddball"|| zipEntry.name == "variant.koth" || zipEntry.name == "variant.forge" || zipEntry.name == "variant.vip" || zipEntry.name == "variant.jugg" || zipEntry.name == "variant.terries" || zipEntry.name == "variant.assault" || zipEntry.name == "variant.zombiez") {
            if (zipEntry.header.size == 4096) {

                    zip.extractEntryTo(/*entry name*/zipEntry.entryName, "../../../../../mods/variants/pmetpmet"+varcount, false, true);
                    varcount++;
                    if(!idk) {
                        fun();
                    }
                
            }
            else {
                haserror = true;
            }
        }
        else if (zipEntry.name.slice(-7) == ".prefab") {
            zip.extractEntryTo(/*entry name*/zipEntry.entryName, "../../../../../mods/prefabs", false, true);

        }
        if(idk) {

            console.log ("mapcount " +mapcount);
            download(image_url).then(data => {
                console.log ("mapcount2 " +mapcount);
                for(i = 0; i < mapcount; i++) {
                    console.log ("mapcount3 " +mapcount);

                    fs.writeFileSync('../../../../../mods/maps/pmetpmet'+ i +'/mapimage.jpg', data);
                }
                fun();
            });
         
        }
    
    });
    fs.unlinkSync("../../../../../mods/temp.zip");
    }
    catch(error){
        haserror = true;
    }
}

server = http.createServer( function(req, res) {
    
    res.setHeader('Access-Control-Allow-Origin', 'http://dewshare.org');
    
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
                downloadMap(image_url, data);
            }
            else if (file_url.slice(-4) == ".zip") {

                fs.writeFileSync('../../../../../mods/temp.zip', data);
                extractfiles(image_url);
            }
            else if (file_url.slice(-7) == ".prefab"){
                var fabname = path.basename(file_url);
                downloadPrefab(data, fabname);
            }
            else {
                var gametype = path.extname(file_url);

                downloadVariant(data, gametype);
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