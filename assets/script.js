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

const knownCities = [];

/* If statement
Form posting from the page with the city that will be assigned to the variable */

function searchCity(event){
    event.preventDefault();
    city = $('#city').val();
    console.log(city);

    for(i=0; i < localStorage.length; i++){
        
    }
    

    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast',
        data: {
            //lat:44.34,
            //lon:10.99,
            q: city,
            //zip: 78249,
            units: 'imperial',
            appid: '2bb1e323f7191a4d567a9b1d99bc3ee0',
        },
        dataType: 'json',
        success: function(apiResponse) {
            //console.log(apiResponse);
    
            var holdThis = JSON.stringify(apiResponse);
            localStorage.setItem(city, holdThis)
        }
    });

    if(localStorage.getItem(city) != null){
        var havethis = localStorage.getItem(city);
        console.log('This is the data: ');
        var data = JSON.parse(havethis);
        console.log(data);
        console.log('This is the first item in the list inside data');
        console.log(data.list[0]);
    }
    
}







