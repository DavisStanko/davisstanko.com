// When the user clicks on Monero, open the Monero popup
function moneropopup() {
  var popup = document.getElementById("moneropopup");
  popup.classList.toggle("show");
  var popup = document.getElementById("dimmer");
  popup.classList.toggle("show");
}

// When the user clicks on Bitcoin, open the Bitcoin popup
function bitcoinpopup() {
    var popup = document.getElementById("bitcoinpopup");
    popup.classList.toggle("show");
    var popup = document.getElementById("dimmer");
    popup.classList.toggle("show");
}

//  When the user clicks on PayPal, open the PayPal popup
  function paypalpopup() {
    var popup = document.getElementById("paypalpopup");
    popup.classList.toggle("show");
    var popup = document.getElementById("dimmer");
    popup.classList.toggle("show");
}

// Close ALL popups if the user clicks outside of it
function hideall () {
  var elems = document.querySelectorAll(".show");

  [].forEach.call(elems, function(el) {
      el.classList.remove("show");
  });
}