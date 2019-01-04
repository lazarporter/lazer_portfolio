$(document).ready(function() {
    //When "search" button is clicked:
    $("#searchButton").click(function() {
      //get the search term from the input box
      var searchTerm = $("#searchTerm").val();
      //create the URL to call the API with the searchTerm
      var url =
        "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
        searchTerm +
        "&callback=?";
  
      //Call the Wikipedia API
      $.getJSON(url, function(response) {
        //and do some stuff with the response
        //$('#results').html("");
        //$('#results').prepend(
         // "<div class="
      //  )
        $('#resultsList').html("");
        for (var i = 0; i < response[1].length; i++) {
          $("#resultsList").append(
            "<li><a href=" +
              response[3][i] +
              ">" +
              response[1][i] +
              "</a><p>" +
              response[2][i] +
              "</p></li>"
          ); //end of parsing single result into <li>
        } //end of for loop parsing all results into <li>s
        $('#searchTerm').val("");
      }); //end of getJSON function
    }); //end of "search click" function
    
    $("#searchTerm").on('keyup', function(e){
      if(e.keyCode === 13)
        $("#searchButton").click();
    });//enter button event handler
  });
  
  
  //add code for if there are no results