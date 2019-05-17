dew.on("show", function() {
    
    
    dew.command('Game.HideH3UI 1');
    
    if(firstload) {
        // updates the screen since this is the first load of the menu and sets the sort to new
        currentSort = "New";
        updateScreen('https://dewritohub.com/api/altfetch?r=' + new Date());
        swal("New Update 5/17/19", "Probably last update for awhile unless any you guys have any feature requests or bugs.");
        firstload = false;
    }
    
    //when clicking on a sort category on top any text in the search bar is used to sort that search. 
    //Empty search bar is just the default new, top, featured, and updated
    $("a.new").click(function(e) {
        var searchInput = document.getElementById('sarch');
        e.preventDefault();

        //if the current sort is the one you clicked just ignore it.
        if ((this).textContent == currentSort) {
            return;
        }

        //if current sort is not same as clicked, remove all cards and update screen with new sort and whatever is in the searchbar
        else {
            var input = encodeURIComponent(searchInput.value);
            if ((this).textContent == "New") {
                selected((this).textContent);
                updateScreen('https://dewritohub.com/api/altfetch?q=' + input + '?s=new', page);
            }
            if ((this).textContent == "Top") {
                selected((this).textContent);
                updateScreen('https://dewritohub.com/api/altfetch?q=' + input + '?s=top', page);
            }
            if ((this).textContent == "Featured") {
                selected((this).textContent);
                updateScreen('https://dewritohub.com/api/altfetch?q=' + input + '?s=featured ', page);
            }
            if ((this).textContent == "Updated") {
                selected((this).textContent);
                updateScreen('https://dewritohub.com/api/altfetch?q=' + input + '?s=updated', page);
            }
        }

    });

    $("#next").unbind().click(function(e) {
        e.preventDefault();
        if (page < pages) {
            page++;
            render(q);
        }
    });
    $("#previous").unbind().click(function(e) {
        e.preventDefault();
        if (page > 1) {
            page--;
            render(q);
        }
    });
    
    $(document).keyup(function(e) {
     if (e.key === "Escape") { // escape key maps to keycode `27`
        closeBrowser();
    }
    });
    
    let listFilterTextbox = document.getElementById('sarch');
    listFilterTextbox.addEventListener('input', function(e) {
        onSearch(e.target.value);
    });

    reload();

});
