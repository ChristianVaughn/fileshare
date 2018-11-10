
dew.on( "show", function() {
  var zindex = 10;

  $("div.card").click(function(e){
    e.preventDefault();
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

      var input = encodeURIComponent(searchInput.value);
      if ((this).textContent == "New") {
        updateScreen('https://alpha.dewritohub.com/api/fetch?q='+ input +'?s=new Date()');
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

      var input = encodeURIComponent(searchInput.value);
      if (currentSort == "New") {
        updateScreen('https://alpha.dewritohub.com/api/fetch?q='+ input +'?s=new Date()');
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

