const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "5f130e7c739c9c5514f0ed22a03fbcca";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityinput.value;
    if(city){
        try{
            const weatherdata = await getweatherdata(city);
            displayweatherinfo(weatherdata);
        }
        catch(error){
            console.error(error)
            displayerror(error);
        }
    }
    else{
        displayerror("please enter a city");
    }

});
async function getweatherdata(city){
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response =  await fetch(apiurl);
    if(!response.ok){
        throw new Error("could not find city")
    }
    return await response.json();
};
function displayweatherinfo(data){
    const {name: city,
                 main: {temp , humidity},
                 weather: [{description , id}]} = data;
    
    card.textContent = "";
    card.style.display = "flex";
    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const emoji = document.createElement("p");

    citydisplay.textContent = city;
    citydisplay.classList.add("citydisplay");
    card.appendChild(citydisplay);

    tempdisplay.textContent = `${(temp - 273.15).toFixed(1)} °C`;
    tempdisplay.classList.add("tempdisplay");
    card.appendChild(tempdisplay);

    humiditydisplay.textContent = `Humidity: ${humidity}%`;
    humiditydisplay.classList.add("humiditydisplay");
    card.appendChild(humiditydisplay);

    descdisplay.textContent = description;
    descdisplay.classList.add("descdisplay");
    card.appendChild(descdisplay);

    emoji.textContent = displayweatheremo(id);
    emoji.classList.add("emoji");
    card.appendChild(emoji);
};
function displayweatheremo(weatherid){

        switch(true){
            case (weatherid >= 200 && weatherid < 300):
                return "⛈";
            case (weatherid >= 300 && weatherid < 400):
                return "🌧";
            case (weatherid >= 500 && weatherid < 600):
                return "🌧";
            case (weatherid >= 600 && weatherid < 700):
                return "❄";
            case (weatherid >= 700 && weatherid < 800):
                return "🌫";
            case (weatherid === 800):
                return "🌞";
            case (weatherid >= 801 && weatherid < 810):
                return "☁";    
            default:
                return "❓";
        }

};

function displayerror(message){

    const errordisplay = document.createElement('p');
    errordisplay.textContent = message;
    errordisplay.classList.add("error");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);

};