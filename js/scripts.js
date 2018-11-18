const app = document.getElementById('root');
var currentSort = "New";
var Data;
var page;
var pages = 1;
var maxitems = 12;
var firstload = true;
var q = ''
var newData =[];

function updateScreen(p1, pagenumber) {
    fetch(p1).then(response => {
        return response.json();
    }).then(data => {
        page = 1;
        console.log(data);
        Data = data;
        render(q);
        changefocus(0);
    }).catch(err => {
        // Do something for an error here
    });
}

function timedifference(sdate) {
    let dt1 = new Date();
    let dt2 = new Date(sdate);
    let time = diff_months(dt2, dt1) - 1;

    if (time < 1) {
        time = 'this month';
    } else if (time < 2) {
        time = time + ' month ago';
    } else {
        time = time + ' months ago'
    }
    return time;
}

function changefocus(cid) {
    const star2 = document.createElement('div');
    star2.setAttribute('class', 'fas fa-star starRate centerstar');

    document.getElementById("img-slider").innerHTML = '<button class="w3-button w3-black w3-display-left" onclick="plusDivs(-1)">&#10094;</button><button class="w3-button w3-black w3-display-right"onclick="plusDivs(1)">&#10095;</button>'

    for (let i = 0; i < newData[cid]['imgCount']; i++) {
        let link = 'https://dew.dewritohub.com/file/dh-images/' + newData[cid]['_id'] + '_' + i + '.jpg';

        const img = document.createElement('img');
        img.setAttribute('class', 'imgSlider');
        img.setAttribute('src', link);

        if (i == 0) {
            img.style.display = "block";
        }

        document.getElementById("img-slider").appendChild(img);
    }

    document.getElementById("title").innerHTML = newData[cid]['title'].substr(0, 55) + '...';
    document.getElementById("author").innerHTML = 'By: ' + newData[cid]['username'] + ' - ' + timedifference(newData[cid]['date']);
    document.getElementById("link").href = 'https://dewritohub.com/map/' + newData[cid]['_id'] + '/' + newData[cid]['title'];

    document.getElementById("date").innerHTML = getdate(newData[cid]['date']);
    document.getElementById("downloads").innerHTML = newData[cid]['downloads'];
    document.getElementById("gamemode").innerHTML = newData[cid]['gameMode'];

    document.getElementById("rating").innerHTML = '';
    for (let i = 0; i < newData[cid]['starRating'].length; i++) {
        document.getElementById("rating").appendChild(star2.cloneNode(true));
    }

    document.getElementById("edit").innerHTML = getdate(newData[cid]['lastEdit']);
    document.getElementById("text").innerHTML = newData[cid]['excerpt'].substr(0, 170) + '...';
    document.getElementById("download-link").download = newData[cid]['dlMap'];
}

function diff_months(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7 * 4);
    return Math.abs(Math.round(diff));

}

function selected(x) {
    $("#" + currentSort).removeClass('selected');
    currentSort = x;
    $("#" + currentSort).addClass('selected');
}

function reload() {
    
    $("div.card").unbind().click(function() {
        let thisid = $(this).find('span').text();
        changefocus(thisid);
    });

    $("#download-link").unbind().click(function(e) {

        e.stopImmediatePropagation(); //prevents button from multi clicking on one click
        e.preventDefault(); //prevents button from multi clicking on one click
        console.log(this.download);

        //sends a post request to node app and if everything goes right it returns 200 and if an error happened 404
        $.post('http://localhost:3000', this.download).done(function() {
            dew.toast({
                body: 'Download was a Success!'
            });
        }).fail(function() {
            dew.toast({
                body: `<div>Download failed! Please Try again later.</div>
        <div>Report issue to Cvaughn55 if issue persists.</div>`
            });

        });

    });
}

function onSearch(query) {
    page = 1;
    q = query.toLowerCase();
    render(q);
}

function getdate(x) {
    date = new Date(x);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    
    return String(dt + '-' + month + '-' + year);
}

function render(q) {
    newData =[];
    Data.forEach(item => {
        if (item.gameMode == "Mods") {
            return;
        }
        if( !q || (item.title + item.username + item.excerpt).toLowerCase().indexOf(q) != -1) {
            newData.push(item);
        }
    });
    console.log(newData);
    let id = 0;
    document.getElementById("root").innerHTML = '';
    newData.slice(((page - 1) * maxitems), (page * maxitems)).forEach(usermap => {
        
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const rating = document.createElement('span');
            rating.setAttribute('class', 'rating');

            const star = document.createElement('div');
            star.setAttribute('class', 'fas fa-star starRate');

            const mapImage = document.createElement('img');
            mapImage.src = usermap.thumbnail;
            const cardTitle = document.createElement('div');
            cardTitle.setAttribute('class', 'card-title');
            const h2 = document.createElement('h2');
            h2.textContent = usermap.title.substring(0, 23);
            const small = document.createElement('small');
            small.textContent = usermap.username;

            const uploaddate = document.createElement('small');
            uploaddate.setAttribute('class', 'time');

            let time = timedifference(usermap.date);

            uploaddate.textContent = time;

            const cardFlap1 = document.createElement('span');
            cardFlap1.setAttribute('class', 'hidden');
            cardFlap1.textContent = id + ((page - 1) * maxitems);

            app.appendChild(card);
            card.appendChild(rating);
            
            for (let i = 0; i < usermap.starRating.length; i++) {
                rating.appendChild(star.cloneNode(true));
            }

            card.appendChild(mapImage);
            card.appendChild(cardTitle);
            cardTitle.appendChild(h2);
            cardTitle.appendChild(small);
            cardTitle.appendChild(uploaddate);
            card.appendChild(cardFlap1);

            reload();
            id++;
    });
    pages = Math.ceil(newData.length / maxitems);
    document.getElementById("pages").innerHTML = 'of ' + pages;
    document.getElementById("page").innerHTML = page;

}