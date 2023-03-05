/* $.ajax({
    url: 'http://api.weatherstack.com/current',
    data: {
      access_key: '55a4e62450d8adb97d69455ed3d00681',
      query: '78249',
      units: 'f'
    },
    dataType: 'json',
    success: function(apiResponse) {
        console.log(apiResponse);
        var holdThis = JSON.stringify(apiResponse);
        localStorage.setItem('holdThis', holdThis)
      console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
    }
  }); */
var havethis = localStorage.getItem('holdThis');
console.log(JSON.parse(havethis));