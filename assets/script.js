//Function to pull the keys from local storage and create buttons
var knownCities;
var cityID;
var data;

function makeButtons(){
    //pull all the keys from local storage
    knownCities = Object.keys(localStorage).sort();
    //console.log(knownCities);

    //loop through all the keys
    for(var i = 0; i < knownCities.length; i++ ){
        //check if button with key already exists
        var preCheck = document.getElementById(knownCities[i]);
        console.log('button check: ' + preCheck);
        //if not, create a button from the key
        if(preCheck === null){
            $('#savedCities').append('<button class="btn btn-secondary btn-block" id="'+knownCities[i]+'" onclick="getWeather(event)">'+knownCities[i]+'</button><br>');
        }
        
    }
}

function deleteLocal(event){
    //delete all the local storage keys and refresh the page
    event.preventDefault();
    //console.log(event);
    knownCities = Object.keys(localStorage).sort();
    for(var i = 0; i < knownCities.length; i++ ){
        localStorage.removeItem(knownCities[i]);
    }
    location.reload();
    //console.log('Reloaded');
}

//Pull the weather date from local storage based on which city button is clicked
function getWeather(event){
    event.preventDefault();
    //console.log(event);
    //console.log(event.target);
    //console.log(event.target.id);
    cityID = event.target.id;
    data = localStorage.getItem(cityID);
    data = JSON.parse(data);
    //console.log(data);
    displayWeather(data);
}

//Function to grab value of search field, call API with city name, retrieve data and put into local storage
function searchCity(event){
    event.preventDefault();
    //Get the city from the search
    city = $('#city').val();
    //console.log(city);

    //Ajax call to the weather API for the city
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
            //Dump data in string form to local storage
            var holdThis = JSON.stringify(apiResponse);
            localStorage.setItem(city, holdThis)

            //pass the data to the display function
            displayWeather(apiResponse);
            //make new city buttons on the fly
            makeButtons();
        }
    });

    //verify data is in the local storage and display it
    if(localStorage.getItem(city) != null){
        var havethis = localStorage.getItem(city);
        //console.log('This is the data: ');
        var data = JSON.parse(havethis);
        //console.log(data);
        displayWeather(data);
    }

}

//Grab divs and insert weather data from current data or local stored data
function displayWeather(data){
    //console.log('Running display weather');
    //console.log(data);

    //make 5 day forcast wording visible
    $('#forcast').css('display','block');
    
    //set data list items that needed (noon for each of the 6 days)
    const dayArray = [2,10,18,26,34,39];
    for(i = 0; i < dayArray.length; i++){

        //timestamp to date black magic
        const timestamp = data.list[dayArray[i]].dt; // example timestamp in seconds
        const date = new Date(timestamp * 1000); // convert seconds to milliseconds
        const month = date.getMonth() + 1; // add 1 to get 1-12 month range
        const day = date.getDate();
        const year = date.getFullYear();
        var formattedDate = `${month}/${day}/${year}`;
        //console.log(formattedDate); // output: "3/8/2023"

        //pull the weather icon data
        var dataSymbol = data.list[dayArray[i]].weather[0].icon;
        //console.log(dataSymbol);

        //grab the weather icon symbol from the weather site and display it
        var daySymbol =  '<figure><image src="https://openweathermap.org/img/wn/'+dataSymbol+'@2x.png"><figurecaption>'+data.list[dayArray[i]].weather[0].description+'</figurecaption></figure>';

        //get the other requested weather data
        var dayTemp = data.list[dayArray[i]].main.temp;
        var dayWind = data.list[dayArray[i]].wind.speed;
        var dayHumid = data.list[dayArray[i]].main.humidity;
        //console.log(dayTemp);

        //push data into the div tags
        if(i === 0){
            $('#day'+[i]).html('<h2>'+data.city.name+' ('+formattedDate+')</h2><p>'+daySymbol+'</p><p>Temp: '+dayTemp+' °F</p><p>Wind: '+dayWind+' MPH</p><p>Humidity: '+dayHumid+' %</p>');
        }else{
            $('#day'+[i]).html('<p>'+formattedDate+'</p><p>'+daySymbol+'</p><p>Temp: '+dayTemp+' °F</p><p>Wind: '+dayWind+' MPH</p><p>Humidity: '+dayHumid+' %</p>');
        }
        
    }
}

makeButtons();
