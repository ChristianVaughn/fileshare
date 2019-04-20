var db = '<div class="card" data="slayer"><div class="card-title"><h2>Slayer</h2><small>Bungie</small></div></div>'
db += '<div class="card" data="team slayer"><div class="card-title"><h2>Team Slayer</h2><small>Bungie</small></div></div>'
db += '<div class="card" data="rockets"><div class="card-title"><h2>Rockets</h2><small>Bungie</small></div></div>'
db += '<div class="card" data="elimination"><div class="card-title"><h2>Elimination</h2><small>Bungie</small></div></div>'
var ed = '<div class="card" data="oddball"><div class="card-title"><h2>Oddball</h2><small>Bungie</small></div></div>'
ed += '<div class="card" data="team oddball"><div class="card-title"><h2>Team Oddball</h2><small>Bungie</small></div></div>'
ed += '<div class="card" data="lowball"><div class="card-title"><h2>Lowball</h2><small>Bungie</small></div></div>'
ed += '<div class="card" data="ninjaball"><div class="card-title"><h2>Ninjaball</h2><small>Bungie</small></div></div>'
ed += '<div class="card" data="rocketball"><div class="card-title"><h2>Rocketball</h2><small>Bungie</small></div></div>'
var gu = '<div class="card" data="crazy king"><div class="card-title"><h2>Crazy King</h2><small>Bungie</small></div></div>'
gu += '<div class="card" data="team king"><div class="card-title"><h2>Team King</h2><small>Bungie</small></div></div>'
gu += '<div class="card" data="mosh pit"><div class="card-title"><h2>Mosh Pit</h2><small>Bungie</small></div></div>'
var hi = '<div class="card" data="multi flag"><div class="card-title"><h2>Multi Flag</h2><small>Bungie</small></div></div>'
hi += '<div class="card" data="one flag"><div class="card-title"><h2>One Flag</h2><small>Bungie</small></div></div>'
hi += '<div class="card" data="tank flag"><div class="card-title"><h2>Tank Flag</h2><small>Bungie</small></div></div>'
hi += '<div class="card" data="attrition ctf"><div class="card-title"><h2>Attrition CTF</h2><small>Bungie</small></div></div>'
var ic = '<div class="card" data="assault"><div class="card-title"><h2>Assault</h2><small>Bungie</small></div></div>'
ic += '<div class="card" data="neutral bomb"><div class="card-title"><h2>Neutral Bomb</h2><small>Bungie</small></div></div>'
ic += '<div class="card" data="one bomb"><div class="card-title"><h2>One Bomb</h2><small>Bungie</small></div></div>'
ic += '<div class="card" data="attrition bomb"><div class="card-title"><h2>Attrition Bomb</h2><small>Bungie</small></div></div>'
var la = '<div class="card" data="juggernaut"><div class="card-title"><h2>Juggernaut</h2><small>Bungie</small></div></div>'
la += '<div class="card" data="mad dash"><div class="card-title"><h2>Mad Dash</h2><small>Bungie</small></div></div>'
la += '<div class="card" data="ninjanaut"><div class="card-title"><h2>Ninjanaut</h2><small>Bungie</small></div></div>'
var na = '<div class="card" data="infection"><div class="card-title"><h2>Infection</h2><small>bungie</small></div></div>'
na += '<div class="card" data="save one bullet"><div class="card-title"><h2>Save One Bullet</h2><small>bungie</small></div></div>'
na += '<div class="card" data="alpha zombie"><div class="card-title"><h2>Alpha Zombie</h2><small>bungie</small></div></div>'
na += '<div class="card" data="hide and seek"><div class="card-title"><h2>Hide and Seek</h2><small>bungie</small></div></div>'
var sa = '<div class="card" data="vip"><div class="card-title"><h2>VIP</h2><small>bungie</small></div></div>'
sa += '<div class="card" data="one sided vip"><div class="card-title"><h2>One Sided VIP</h2><small>bungie</small></div></div>'
sa += '<div class="card" data="escort"><div class="card-title"><h2>Escort</h2><small>bungie</small></div></div>'
sa += '<div class="card" data="influential vip"><div class="card-title"><h2>Influential VIP</h2><small>bungie</small></div></div>'

var image = "";
dew.command('bind F9 game.showscreen variantselector');



function clearLists(){
    document.getElementById("slayer").innerHTML = db;
    document.getElementById("oddball").innerHTML = ed;
    document.getElementById("koth").innerHTML = gu;
    document.getElementById("ctf").innerHTML = hi;
    document.getElementById("assault").innerHTML = ic;
    document.getElementById("jugg").innerHTML = la;
    document.getElementById("zombiez").innerHTML = na;
    document.getElementById("terries").innerHTML = "";
    document.getElementById("vip").innerHTML = sa;

}
function loadLists() {
    console.log('START SCRIPT');
   clearLists();
 $.getJSON("dew://screens/fileshare/variants.json", function(data) {    $.each(data, function(index, element) {

    if (element.BaseMode != "") {

    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('data', element.MapName);

    //const mapImage = document.createElement('img');  
   // let thumb = "dew://assets/maps/large/unknown.jpg";

    
    //mapImage.src = thumb;

    const cardTitle = document.createElement('div');
    cardTitle.setAttribute('class', 'card-title');
    const h2 = document.createElement('h2');
    h2.textContent = element.MapName;
    const small = document.createElement('small');
    small.textContent = element.Author;
    const uploaddate = document.createElement('small');
    uploaddate.setAttribute('class', 'time');
    uploaddate.textContent = element.Date;

    const app = document.getElementById(element.BaseMode);

    app.appendChild(card);
    //card.appendChild(mapImage);
    card.appendChild(cardTitle);
    cardTitle.appendChild(h2);
    cardTitle.appendChild(small); 
    cardTitle.appendChild(uploaddate);

	 
    }
    });
 });
}

function closeBrowser() {
    dew.hide();
    dew.command('Game.HideH3UI 0');
}    
