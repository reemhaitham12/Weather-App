const KeyApi = `532b8e7ab4e74b1b9de231015242806`;
const Url = `https://api.weatherapi.com/v1/forecast.json`;
let SearchCountry = document.getElementById("CountrySearch");
let searchButton = document.getElementById("submitSearch");
let SpinnerLoading = document.getElementById("spinnerLoading");
let ReadMore = document.getElementById("ReadMore");
let ReadButton = document.getElementById("ReadButton");
let storedData;
async function Weather(country) {
    try {
        SpinnerLoading.innerHTML = `<div class="loader"></div>`;
        //let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4a57fe3f438d44d9915124803242706&q=${country}&days=12`);
        let response = await fetch(`${Url}?key=${KeyApi}&q=${country}&days=12`)
        let finalResponse = await response.json()
        displayData(finalResponse);
        storedData = finalResponse;

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
        });
        SearchCountry.value = '';
        SpinnerLoading.innerHTML = "";
    }
}

SearchCountry.addEventListener("change", function () {
    Weather(SearchCountry.value);
});

SearchCountry.addEventListener("keyup", function (btn) {
    if (btn.key == "Enter") {
        Weather(SearchCountry.value);
    }
});

searchButton.addEventListener("click", function () {
    Weather(SearchCountry.value);
});

function displayData(data) {
    console.log(data);
    let dataArray = data.forecast.forecastday;
    document.getElementById("country").innerHTML = data.location.country;
    document.getElementById("date").innerHTML = dataArray[0].date;
    document.getElementById("location").innerHTML = data.location.name;
    console.log(dataArray);
    document.getElementById("wind").innerHTML = `
    <h3 class="nav-link fw-bold text-dark fs-4 py-2" id="location">${data.location.name}</h3>
    <div class="AllDegree d-flex justify-content-center m-3 text-center rounded-2">
                        <div class="umbrella d-flex m2 p-2">
                            <img src="image/asset 2.png" alt=""
                                class="image">
                            <h5>${data.current.gust_kph}%</h5>
                        </div>
                        <div class="winds d-flex m2 p-2">
                            <img src="image/asset 3.png" alt=""
                                class="image">
                            <h5>${data.current.wind_kph}km/h</h5>
                        </div>
                    </div>
    `;

    let weatherBox = ``;
    for (var i = 0; i < dataArray.length / 4; i++) {
        const date = new Date(dataArray[i].date);
        const weekDay = date.toLocaleDateString('en-us', { weekday: "long" });
        weatherBox += `
        <div class="col-lg-3">
                    <div class="card bg-pink py-3">
                        <div class="text text-center">
                            <div class=".title">
                                <h4 class="fs-2 text-center">${weekDay}</h4>
                            </div>
                            <div class="degree py-3">
                                <div class="imageDegree">
                                    <img src="${dataArray[i].day.condition.icon}" alt=""
                                        class="image">
                                </div>
                                <div class="numDegree">
                                    <h5 class="fs-2">${dataArray[i].day.maxtemp_c}<sup>o</sup>C</h5>
                                </div>
                                <div class="custom py-4">
                                    <h5 class="fs-3">${dataArray[i].day.condition.text}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
        `;
    }
    document.querySelector(".weatherCard").innerHTML = weatherBox;
    ReadMore.classList.remove("d-none");
}


function displayMore(data) {
    console.log(data);
    let dataArray = data.forecast.forecastday;
    document.getElementById("country").innerHTML = data.location.country;
    document.getElementById("date").innerHTML = dataArray[0].date;
    document.getElementById("location").innerHTML = data.location.name;
    console.log(dataArray);
    document.getElementById("wind").innerHTML = `
    <h3 class="nav-link fw-bold text-dark fs-4 py-2" id="location">${data.location.name}</h3>
    <div class="AllDegree d-flex justify-content-center m-3 text-center rounded-2">
                        <div class="umbrella d-flex m2 p-2">
                            <img src="image/asset 2.png" alt=""
                                class="image">
                            <h5>${data.current.gust_kph}%</h5>
                        </div>
                        <div class="winds d-flex m2 p-2">
                            <img src="image/asset 3.png" alt=""
                                class="image">
                            <h5>${data.current.wind_kph}km/h</h5>
                        </div>
                    </div>
    `;

    let weatherBox = ``;
    for (var i = 0; i < dataArray.length - 5; i++) {
        const date = new Date(dataArray[i].date);
        const weekDay = date.toLocaleDateString('en-us', { weekday: "long" });
        weatherBox += `
        <div class="col-lg-3">
                    <div class="card bg-pink py-3">
                        <div class="text text-center">
                            <div class=".title">
                                <h4 class="fs-2 text-center">${weekDay}</h4>
                            </div>
                            <div class="degree py-3">
                                <div class="imageDegree">
                                    <img src="${dataArray[i].day.condition.icon}" alt=""
                                        class="image">
                                </div>
                                <div class="numDegree">
                                    <h5 class="fs-2">${dataArray[i].day.maxtemp_c}<sup>o</sup>C</h5>
                                </div>
                                <div class="custom py-4">
                                    <h5 class="fs-3">${dataArray[i].day.condition.text}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
        `;
    }
    document.querySelector(".weatherCard").innerHTML = weatherBox;
    ReadMore.classList.add("d-none");
}
ReadButton.addEventListener("click", () => {
    displayMore(storedData);
});







function Location(position) {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let countryPosition = `${latitude},${longitude}`;
    Weather(countryPosition);
    //console.log(latitude, longitude);
}
navigator.geolocation.getCurrentPosition(Location);



// Weather();
// let date = new Date();
// console.log(date);
// method name's --> toLocaleDateString
// let weekDay =date.toLocaleDateString('en-us', {weekday : "narrow"});
// console.log(weekDay);

// function User(fName,age, gender,salary , arr=[]){
//     this.fName=fName
//     this.age=age
//     this.gender=gender
//     this.salary=salary
//     this.eat = function(){
//         console.log('eat');
//     },
//     this.arr =arr;
// }
// User.prototype.sayHi = function(){
//     console.log(`hi ${this.fName}`);
// }
// User.prototype.sayBy = function(){
//     console.log(`by ${this.fName}`);
// }
// let marwa = new User('marwa', 30 , 'female , 60000');
// let malak = new User('malak', 35 , 'female , 70000');

// console.log (marwa);
// console.log(malak);


// class User {
//     #userName = 'test'
//     constructor(fname, age, gender, salary){
//         this.fname=fname
//         this.age=age
//         this.gender=gender
//         this.salary=salary;
//     };
//     sayHi(){
//         console.log(`hi${this.#userName}`);
//     }


// }
// class Enginerr extends User {
//     constructor(fname, age, gender, salary,special){
//         super(fname, age, gender, salary);
//         this.special=special;
//     }
//     sayHi(){
//         console.log(`hi${this.fname} is engineer`);
//     }
// }
// let marwa = new User('marwa', 30 , 'female' , 60000);
// let malak = new User('malak', 35 , 'female' , 70000);

// console.log (marwa);
// console.log(malak);