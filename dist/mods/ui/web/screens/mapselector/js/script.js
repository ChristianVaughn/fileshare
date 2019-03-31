var db = '<div class="card" data="s3d_avalanche"><img src="./img/diamondback.jpg"><div class="card-title"><h2>Diamondback</h2></div></div>'
var ed = '<div class="card" data="s3d_edge"><img src="./img/edge.jpg"><div class="card-title"><h2>Edge</h2></div></div>'
var gu = '<div class="card" data="guardian"><img src="./img/guardian.jpg"><div class="card-title"><h2>Guardian</h2></div></div>'
var hi = '<div class="card" data="deadlock"><img src="./img/highground.jpg"><div class="card-title"><h2>High Ground</h2></div></div>'
var ic = '<div class="card" data="s3d_turf"><img src="./img/icebox.jpg"><div class="card-title"><h2>Icebox</h2></div></div>'
var la = '<div class="card" data="zanzibar"><img src="./img/lastresort.jpg"><div class="card-title"><h2>Last Resort</h2></div></div>'
var na = '<div class="card" data="chill"><img src="./img/narrows.jpg"><div class="card-title"><h2>Narrows</h2></div></div>'
var re = '<div class="card" data="s3d_reactor"><img src="./img/reactor.jpg"><div class="card-title"><h2>Reactor</h2></div></div>'
var sa = '<div class="card" data="shrine"><img src="./img/sandtrap.jpg"><div class="card-title"><h2>Sandtrap</h2></div></div>'
var st = '<div class="card" data="Bunkerworld"><img src="./img/standoff.jpg"><div class="card-title"><h2>Standoff</h2></div></div>'
var th = '<div class="card" data="cyberdyne"><img src="./img/thepit.jpg"><div class="card-title"><h2>The Pit</h2></div></div>'
var va = '<div class="card" data="riverworld"><img src="./img/valhalla.jpg"><div class="card-title"><h2>Valhalla</h2></div></div>'

dew.command('bind F10 game.showscreen mapselector');

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
    card.setAttribute('data', element.MapName);

    const mapImage = document.createElement('img');  
    let thumb = "./img/"+ element.BaseMap +".jpg";

    
    mapImage.src = thumb;

    const cardTitle = document.createElement('div');
    cardTitle.setAttribute('class', 'card-title');
    const h2 = document.createElement('h2');
    h2.textContent = element.MapName;
    //const small = document.createElement('small');This is for the future when i get author names working
    //small.textContent = element.BaseMap;This is for the future when i get author names working

    const app = document.getElementById(element.BaseMap);

    app.appendChild(card);
    card.appendChild(mapImage);
    card.appendChild(cardTitle);
    cardTitle.appendChild(h2);
    //cardTitle.appendChild(small); This is for the future when i get author names working
	 
    }
    });
 });
}

function closeBrowser() {
    dew.hide();
    dew.command('Game.HideH3UI 0');
}    
