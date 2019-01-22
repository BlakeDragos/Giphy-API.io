var topics = ["Critical Role", "Game Of Thrones", "Brooklyn 99", "My Hero Academia"];

var topic = "";
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
  topic = $(this).attr("data-name");
  $("#gifHolder").empty();
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=TnTCgEPlVHqEX4CIuq77xr98jB1lIrfV&limit=50";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    for (var i = 0; i < 10; i++) {
      $("#gifHolder").append(
        `<div class="col">
        <span>
            <img src="${response.data[i].images.fixed_height_still.url}" data-still="${response.data[i].images.fixed_height_still.url}" data-animate="${response.data[i].images.fixed_height.url}" data-state="still" class="gif">
            <h4>${response.data[i].title} Rated: ${response.data[i].rating}</h4>
        </span>
      </div>`
      );
    }
    $("#moreButton").show();
  });
};

function displayMoreGif() {
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=TnTCgEPlVHqEX4CIuq77xr98jB1lIrfV&limit=50";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    for (var i = 10; i < 50; i++) {
      $("#gifHolder").append(
        `<div class="col">
        <span>
            <img src="${response.data[i].images.fixed_height_still.url}" data-still="${response.data[i].images.fixed_height_still.url}" data-animate="${response.data[i].images.fixed_height.url}" data-state="still" class="gif">
            <h4>${response.data[i].title} Rated:${response.data[i].rating}</h4>
        </span>
      </div>`
      );
    }
    $("#moreButton").hide();
  });
};

function swichState() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
};






renderButtons();
$("#moreButton").hide();

$("#moreButton").on('click', displayMoreGif);
$(document).on('click', ".search", displayGif);
$(document).on('click', ".gif", swichState);
$(document).ready(function() {
  $(document).on('submit', '#my-form', function() {
    var input = $("#searchInput").val().trim();
    topics.push(input);
    renderButtons();
    return false;
   });
});