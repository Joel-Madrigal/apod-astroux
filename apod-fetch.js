alert('hi')

let key = '';
let api = '' + key


// http://youmightnotneedjquery.com/#json
let request = new XMLHttpRequest();
request.open("GET", api, false);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    let data = JSON.parse(request.responseText);
    console.log(data)
  } else {
    // We received an error from the api!
  }
};

request.onerror = function () {
  // There was another error, not from the api,
  alert('Error');
};

request.send();
