const app = document.getElementById('root');
var currentSort = "New";

function updateScreen(p1) {
fetch(p1).then(response => {
  return response.json();
}).then(data => {
  // Work with JSON data here
  console.log(data);
  data[0].forEach(usermap => {
    if (usermap.gameMode == "Mods") {
      return;
    }
    
    const card = document.createElement('div');

    card.setAttribute('class', 'card');
    //card.setAttribute('id', usermap.title.substring(0, 25));
    //card.setAttribute('onclick', 'theFunction(event)');

    const mapImage = document.createElement('img');
    mapImage.src = usermap.thumbnail;

    const cardTitle = document.createElement('div');
    cardTitle.setAttribute('class', 'card-title');



    const h2 = document.createElement('h2');
    h2.textContent = usermap.title.substring(0, 25);
    const small = document.createElement('small');
    small.textContent = usermap.username;
    const rating = document.createElement('span');
    rating.setAttribute('class', 'right');
    for(i = 0; i < usermap.rating.length; i++){
      if(usermap.rating[i] == "X") {
        const stars = document.createElement('div');
        stars.setAttribute('class', 'fa fa-star starRate');
        rating.prepend(stars);
      }
    }
    const cardFlap1 = document.createElement('div');
    cardFlap1.setAttribute('class', 'card-flap flap1');
    const description = document.createElement('div');
    description.setAttribute('class', 'card-description');
    description.textContent = usermap.excerpt;
    cardFlap1.appendChild(description);
    const cardFlap2 = document.createElement('div');
    cardFlap2.setAttribute('class', 'card-flap flap2');
    const cardActions = document.createElement('div');
    cardActions.setAttribute('class', 'card-actions');
    const download = document.createElement('a');
    download.setAttribute('download', usermap.mapFile);
    download.setAttribute('class', 'btn');
    download.textContent = "Download";

    app.appendChild(card);
    card.appendChild(mapImage);
    card.appendChild(cardTitle);
    cardTitle.appendChild(h2);
    h2.appendChild(small);
    h2.appendChild(rating);
    card.appendChild(cardFlap1);
    cardFlap1.appendChild(cardFlap2);
    cardFlap2.appendChild(cardActions);
    cardActions.appendChild(download);

    
 
});
}).catch(err => {
  // Do something for an error here
});
}
updateScreen('https://alpha.dewritohub.com/api/fetch?q=?s='+ new Date());
currentSort = "New";
