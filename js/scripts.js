const app = document.getElementById('root');

/*const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);*/

fetch('https://alpha.dewritohub.com/api/fetch').then(response => {
  return response.json();
}).then(data => {
  // Work with JSON data here
  console.log(data);
  data[0].forEach(usermap => {

    const card = document.createElement('div');

    card.setAttribute('class', 'card');

    const mapImage = document.createElement('img');
    mapImage.src = usermap.thumbnail;

    const cardTitle = document.createElement('div');
    cardTitle.setAttribute('class', 'card-title');
    const infoButton = document.createElement('a');
    //infoButton.setAttribute('href', '#');
    infoButton.setAttribute('class', 'toggle-info btn');
    const left = document.createElement('span');
    left.setAttribute('class', 'left');
    const right = document.createElement('span');
    right.setAttribute('class', 'right');

    const h2 = document.createElement('h2');
    h2.textContent = usermap.title;
    const small = document.createElement('small');
    small.textContent = usermap.username;

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
    download.setAttribute('href', '#');
    download.setAttribute('class', 'btn');
    download.textContent = "Download";

    app.appendChild(card);
    card.appendChild(mapImage);
    card.appendChild(cardTitle);
    cardTitle.appendChild(infoButton);
    infoButton.appendChild(left);
    infoButton.appendChild(right);
    cardTitle.appendChild(h2);
    h2.appendChild(small);
    card.appendChild(cardFlap1);
    cardFlap1.appendChild(cardFlap2);
    cardFlap2.appendChild(cardActions);
    cardActions.appendChild(download);

    
    /*
    const h1 = document.createElement('h1');
    h1.textContent = usermap.title;
    console.log(usermap.title);
    const p = document.createElement('p');
    //movie.excerpt = movie.excerpt.substring(0, 300);
    p.textContent = usermap.excerpt;

    container.appendChild(card);
    card.appendChild(h1);
    card.appendChild(p);*/
 
});
}).catch(err => {
  // Do something for an error here
});
