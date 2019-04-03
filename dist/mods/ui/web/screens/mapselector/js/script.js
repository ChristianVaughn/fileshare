var db = '<div class="card" data="s3d_avalanche"><img src="dew://assets/maps/large/s3d_avalanche.jpg"><div class="card-title"><h2>Diamondback</h2><small>Saber3d</small></div></div>'
var ed = '<div class="card" data="s3d_edge"><img src="dew://assets/maps/large/s3d_edge.jpg"><div class="card-title"><h2>Edge</h2><small>Saber3d</small></div></div>'
var gu = '<div class="card" data="guardian"><img src="dew://assets/maps/large/guardian.jpg"><div class="card-title"><h2>Guardian</h2><small>Bungie</small></div></div>'
var hi = '<div class="card" data="deadlock"><img src="dew://assets/maps/large/deadlock.jpg"><div class="card-title"><h2>High Ground</h2><small>Bungie</small></div></div>'
var ic = '<div class="card" data="s3d_turf"><img src="dew://assets/maps/large/s3d_turf.jpg"><div class="card-title"><h2>Icebox</h2><small>Saber3d</small></div></div>'
var la = '<div class="card" data="zanzibar"><img src="dew://assets/maps/large/zanzibar.jpg"><div class="card-title"><h2>Last Resort</h2><small>Bungie</small></div></div>'
var na = '<div class="card" data="chill"><img src="dew://assets/maps/large//chill.jpg"><div class="card-title"><h2>Narrows</h2><small>Bungie</small></div></div>'
var re = '<div class="card" data="s3d_reactor"><img src="dew://assets/maps/large/s3d_reactor.jpg"><div class="card-title"><h2>Reactor</h2><small>Saber3d</small></div></div>'
var sa = '<div class="card" data="shrine"><img src="dew://assets/maps/large/shrine.jpg"><div class="card-title"><h2>Sandtrap</h2><small>Bungie</small></div></div>'
var st = '<div class="card" data="Bunkerworld"><img src="dew://assets/maps/large/bunkerworld.jpg"><div class="card-title"><h2>Standoff</h2><small>Bungie</small></div></div>'
var th = '<div class="card" data="cyberdyne"><img src="dew://assets/maps/large/cyberdyne.jpg"><div class="card-title"><h2>The Pit</h2><small>Bungie</small></div></div>'
var va = '<div class="card" data="riverworld"><img src="dew://assets/maps/large/riverworld.jpg"><div class="card-title"><h2>Valhalla</h2><small>Bungie</small></div></div>'
var image = "";
dew.command('bind F10 game.showscreen mapselector');

function baseMaptoImage(bmap) {
    if (bmap == "diamondback") {
        image = "s3d_avalanche";
    }
    else if(bmap == "edge") {
        image = "s3d_edge";
    }
    else if(bmap == "guardian") {
        image = "guardian";
    }
    else if(bmap == "highground") {
        image = "deadlock";

    }
    else if(bmap == "icebox") {
        image = "s3d_turf";

    }
    else if(bmap == "lastresort") {
        image = "zanzibar";

    }
    else if(bmap == "narrows") {
        image = "chill";

    }
    else if(bmap == "reactor") {
        image = "s3d_reactor";

    }
    else if(bmap == "sandtrap") {
        image = "shrine";

    }
    else if(bmap == "standoff") {
        image = "bunkerworld";

    }
    else if(bmap == "thepit") {
        image = "cyberdyne";

    }
    else if(bmap == "valhalla") {
        image = "riverworld";

    }
    else {
        image = "unknown";

    }
}

function clearLists(){
    document.getElementById("diamondback").innerHTML = db;
    document.getElementById("edge").innerHTML = ed;
    document.getElementById("guardian").innerHTML = gu;
    document.getElementById("highground").innerHTML = hi;
    document.getElementById("icebox").innerHTML = ic;
    document.getElementById("lastresort").innerHTML = la;
    document.getElementById("narrows").innerHTML = na;
    document.getElementById("reactor").innerHTML = re;
    document.getElementById("sandtrap").innerHTML = sa;
    document.getElementById("standoff").innerHTML = st;
    document.getElementById("thepit").innerHTML = th;
    document.getElementById("valhalla").innerHTML = va;

}
function loadLists() {
    console.log('START SCRIPT');
   clearLists();
 $.getJSON("dew://screens/fileshare/maps.json", function(data) {    $.each(data, function(index, element) {

    if (element.BaseMap != "") {

    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('data', element.FolderName);

    var mapImage = document.createElement('img');  
    baseMaptoImage(element.BaseMap);
    console.log(image);

    mapImage.src = "dew://assets/maps/customs/"+ element.MapName +".jpg";
    mapImage.href = "dew://assets/maps/large/"+ image +".jpg";
    mapImage.onload = function(e) {
        console.log(element.MapName);

        return;
    };
    mapImage.onerror = function(e) {
        console.log(element.MapName);
        mapImage.src = mapImage.href;
        return;
    };

    
    //mapImage.src = thumb;

    const cardTitle = document.createElement('div');
    cardTitle.setAttribute('class', 'card-title');
    const h2 = document.createElement('h2');
    h2.textContent = element.MapName;
    const small = document.createElement('small');
    small.textContent = element.Author;

    const app = document.getElementById(element.BaseMap);

    app.appendChild(card);
    card.appendChild(mapImage);
    card.appendChild(cardTitle);
    cardTitle.appendChild(h2);
    cardTitle.appendChild(small); 
	 
    }
    });
 });
}

function closeBrowser() {
    dew.hide();
    dew.command('Game.HideH3UI 0');
}    
