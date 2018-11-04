
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
    e.preventDefault(); 
    console.log((this).textContent);
    if ((this).textContent == currentSort) {
      console.log("samepage");
      return;
    }
    else {
      console.log("diffpage");
      while (app.firstChild) {
        app.removeChild(app.firstChild);
      }
      if ((this).textContent == "New") {
        updateScreen('https://alpha.dewritohub.com/api/fetch');
        currentSort = "New";
      }
      if ((this).textContent == "Top") {
        updateScreen('https://alpha.dewritohub.com/api/fetch?q=?s=top');
        currentSort = "Top";
      }
      if ((this).textContent == "Featured") {
        updateScreen('https://alpha.dewritohub.com/api/fetch?q=?s=featured');
        currentSort = "Featured";
      }
      if ((this).textContent == "Updated") {
        updateScreen('https://alpha.dewritohub.com/api/fetch?q=?s=updated');
        currentSort = "Updated";
      }
    }
    
  });
});

