let turnOn = document.getElementById('turn-on'),
    turnOff = document.getElementById('turn-off'),
    noDistractionsActive = localStorage.getItem('noDistractionsActive');

let disableDistractedBrowsing = () => {
  localStorage.setItem('noDistractionsActive', true);
  var query = { active: true, currentWindow: true };
  function callback(tabs) {
    var currentTab = tabs[0]; // there will be only one in this array
    var hideBody = 'document.body.style.display = "none"';
    chrome.tabs.executeScript({
      code: hideBody
    });
  }
  chrome.tabs.query(query, callback);
}

let enableDistractedBrowsing = () => {
  localStorage.setItem('noDistractionsActive', false);
  var query = { active: true, currentWindow: true };
  function callback(tabs) {
    var currentTab = tabs[0]; // there will be only one in this array
    var displayBody = 'document.body.style.display = "block"';
    chrome.tabs.executeScript({
      code: displayBody
    });
  }
  chrome.tabs.query(query, callback);
}

if (noDistractionsActive === true) {
  disableDistractedBrowsing()
} else {
  enableDistractedBrowsing()
}

let toggleState = (button) => {
  console.log(`Clicked button ${button}, turned noDistraction Mode ${button}`)
  if (button === 'on') {
    disableDistractedBrowsing()
  } else if (button === 'off') {
    enableDistractedBrowsing()
  }
}

if (turnOn !== null) {turnOn.addEventListener('click', function() {toggleState('on')})}
if (turnOff !== null) {turnOff.addEventListener('click', function() {toggleState('off')})}