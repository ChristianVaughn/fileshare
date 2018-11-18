dew.on("show", function() {
    
    dew.command('Game.HideH3UI 1');
    
    if(firstload) {
        // updates the screen since this is the first load of the menu and sets the sort to new
        currentSort = "New";
        updateScreen('https://dewritohub.com/api/altfetch?r=' + new Date());
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
    
    let listFilterTextbox = document.getElementById('sarch');
    listFilterTextbox.addEventListener('input', function(e) {
        onSearch(e.target.value);
    });

    /*
    var enterDisabled = false;
    //function to se ewhen enter key is pressed down.
    $(document).keydown(function(e) {

        //if cooldown for enterkey spam is not done then just stop
        if (enterDisabled) {
            return;
        }

        //get the text from the searchbar and if the enter key was pressed on the search bar so a search
        var searchInput = document.getElementById('sarch');
        if (e.keyCode === 13 && document.activeElement == searchInput) {

            console.log('clicked');

            e.stopImmediatePropagation(); //prevents enter spam causing repeat maps to show
            e.preventDefault(); //prevents enter spam causing repeat maps to show

            //remove all current cards on the screen
            //get input from searchbar and update screen with the input and whatever the current sort method is.
            var input = encodeURIComponent(searchInput.value);
            if (currentSort == "New") {
                updateScreen('https://dewritohub.com/api/altfetch?q=' + input + '?s=new', page);
                currentSort = "New";
            }
            if (currentSort == "Top") {
                updateScreen('https://dewritohub.com/api/altfetch?q=' + input + '?s=top', page);
                currentSort = "Top";
            }
            if (currentSort == "Featured") {
                updateScreen('https://dewritohub.com/api/altfetch?q=' + input + '?s=featured', page);
                currentSort = "Featured";
            }
            if (currentSort == "Updated") {
                updateScreen('https://dewritohub.com/api/altfetch?q=' + input + '?s=updated', page);
                currentSort = "Updated";
            }

            enterDisabled = true; //disable enter button and re-enables it 2 seconds later with next line.
            setTimeout(function() {
                enterDisabled = false;
            }, 2000); //used to prevent enter key from triggering search multiple times with one press
        }

    });
    */

    reload();

});