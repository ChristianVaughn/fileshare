dew.on("show", function() {
    
    dew.command('Game.HideH3UI 1');
    loadLists();



});
$(document).ready(function(){
    $(document).keyup(function (e) {
        if (e.keyCode === 27) {
            closeBrowser();
        }
        if (e.keyCode == 44) {
            dew.command('Game.TakeScreenshot');  
        }
    });
    $(document).keydown(function(e){
        if(e.keyCode == 192 || e.keyCode == 223){
            dew.show('console');
        }
    });
    $(document).on("click", "div.card" , function() {
        var maptoload = $(this).attr("data");

        dew.command('Game.map ' + "\"" + maptoload + "\"");
        closeBrowser();
    });
    });