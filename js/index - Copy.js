
dew.on( "show", function() {
  $("div.cards").removeClass("showing");
      while (app.firstChild) {
        app.removeChild(app.firstChild);
      }
  updateScreen('https://alpha.dewritohub.com/api/fetch?q=?s='+ new Date());

  var zindex = 10;
 // var downloadDisabled = false;

  $("div.card a").off().click(function(e){
    //if (downloadDisabled == true) {
      //return;
    //}
    e.stopPropagation();
    console.log(this.download);
    $.post('http://localhost:3000', this.download).done(function() {
      dew.toast({body:'Download was a Success!'});
    }).fail(function() {
      dew.toast({body:`<div>Download failed! Please Try again later.</div>
        <div>Report issue to Cvaughn55 if issue persists.</div>`
    });

    });
  
  });
  $("div.card").click(function(e){

    var isShowing = false;

    if ($(this).hasClass("show")) {
      isShowing = true
    }

    if ($("div.cards").hasClass("showing")) {
      // a card is already in view
      $("div.card.show")
        .removeClass("show");

      if (isShowing) {
        // this card was showing - reset the grid
        $("div.cards")
          .removeClass("showing");
      } else {
        // this card isn't showing - get in with it
        $(this)
          .css({zIndex: zindex})
          .addClass("show");

      }

      zindex++;

    } else {
      // no cards in view
      $("div.cards")
        .addClass("showing");
      $(this)
        .css({zIndex:zindex})
        .addClass("show");

      zindex++;
    }
    
  });



  $("a.new").click(function(e){
    var searchInput = document.getElementById('sarch');
    e.preventDefault(); 
    if ((this).textContent == currentSort) {
      return;
    }
    else {


      $("div.cards").removeClass("showing");
      while (app.firstChild) {
        app.removeChild(app.firstChild);
      }
      zindex = 10;
      var input = encodeURIComponent(searchInput.value);
      if ((this).textContent == "New") {
        updateScreen('https://alpha.dewritohub.com/api/fetch?q='+ input +'?s=' + new Date());
        currentSort = "New";
      }
      if ((this).textContent == "Top") {
        updateScreen('https://alpha.dewritohub.com/api/fetch?q='+ input +'?s=top');
        currentSort = "Top";
      }
      if ((this).textContent == "Featured") {
        updateScreen('https://alpha.dewritohub.com/api/fetch?q='+ input +'?s=featured ');
        currentSort = "Featured";
      }
      if ((this).textContent == "Updated") {
        updateScreen('https://alpha.dewritohub.com/api/fetch?q='+ input +'?s=updated');
        currentSort = "Updated";
      }
    }
    
  });
  var enterDisabled = false;
  $(document).keydown(function (e) {
    if (enterDisabled){
        return;
    }
    var searchInput = document.getElementById('sarch');
    if (e.keyCode === 13 && document.activeElement == searchInput) {

        $("div.cards").removeClass("showing");
      while (app.firstChild) {
        app.removeChild(app.firstChild);
      }
      zindex = 10;
      var input = encodeURIComponent(searchInput.value);
      if (currentSort == "New") {
        updateScreen('https://alpha.dewritohub.com/api/fetch?q='+ input +'?s='+ new Date());
        currentSort = "New";
      }
      if (currentSort == "Top") {
        updateScreen('https://alpha.dewritohub.com/api/fetch?q='+ input +'?s=top');
        currentSort = "Top";
      }
      if (currentSort == "Featured") {
        updateScreen('https://alpha.dewritohub.com/api/fetch?q='+ input +'?s=featured');
        currentSort = "Featured";
      }
      if (currentSort == "Updated") {
        updateScreen('https://alpha.dewritohub.com/api/fetch?q='+ input +'?s=updated');
        currentSort = "Updated";
      }
      //updateScreen('https://alpha.dewritohub.com/api/fetch?q='+ input +'?s='+ currentSort);

    enterDisabled = true;
    setTimeout(function(){enterDisabled = false;}, 2000);
    }

  });

});

$( "div.card" ).load(function() {
 

  
});
