// alert('hi');

let key = '6Mjctd2xmBfr5X0rAPFyaCJGxpff5SmO78f80jSx';
let api = 'https://api.nasa.gov/planetary/apod?api_key=' + key


// http://youmightnotneedjquery.com/#json
let request = new XMLHttpRequest();
request.open("GET", api, false);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    let data = JSON.parse(request.responseText);
    console.log(data.url)

    if (data.url.length > 0) {
      let imgElement = document.getElementById('apod-picture');
      imgElement.src = data.url;
    }
  } else {
    // We received an error from the api!
  }
};

request.onerror = function () {
  // There was another error, not from the api,
  alert('Error');
};

request.send();
