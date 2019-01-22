// TnTCgEPlVHqEX4CIuq77xr98jB1lIrfV

var topics = ["Critical Role", "Game Of Thrones", "Brooklyn 99", "My Hero Academia"];

var newgifnumber = 10;
var newgifmax = 15;

function renderButtons() {
  $("#buttonHolder").empty();
  for (var i = 0; i < topics.length; i++) {
    var button = $('<button>');
    button.addClass('btn btn-outline-success');
    button.addClass('search');
    button.attr("data-name", topics[i]);
    button.text(topics[i]);
    $("#buttonHolder").append(button);
  }
};

function displayGif() {
  var topic = $(this).attr("data-name");
  newgifmax = 15;
  newgifnumber = 10;
  $("#gifHolder").empty();
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+topic+"api_key=TnTCgEPlVHqEX4CIuq77xr98jB1lIrfV";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    for (var i = 0; i < 10; i++) {
      $("#gifHolder").append(
        `<div class="col">
        <span>
            <img src="${response.data[i].images.fixed_height_still.url}" data-still="${response.data[i].images.fixed_height_still.url}" data-animate="${response.data[i].images.fixed_height.url}" data-state="still" class="gif">
            <h4>rated:${response.data[i].rating}</h4>
        </span>
      </div>`
      );
    }
  });
};

function displayMoreGif() {
  // var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    for ( newgifnumber < newgifmax; newgifnumber++;) {
      $("#gifHolder").append(
        `<div class="col">
        <span>
            <img src="${response.data[newgifnumber].images.fixed_height_still.url}" data-still="${response.data[newgifnumber].images.fixed_height_still.url}" data-animate="${response.data[newgifnumber].images.fixed_height.url}" data-state="still" class="gif">
            <h4>rated:${response.data[newgifnumber].rating}</h4>
        </span>
      </div>`
      );
    }
    newgifmax = newgifmax + 10;
  });
};

function swichState() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
};






renderButtons();

$("#searchButton").on('click', function () {
  var input = $("#searchInput").val().trim();
  topics.push(input);
  renderButtons();
});

$("#moreButton").on('click', displayMoreGif);
$(document).on('click', ".search", displayGif);
$(document).on('click', ".gif", swichState);