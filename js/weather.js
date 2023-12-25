const cityInput = document.getElementById('countries');
const suggestions = document.querySelector('.suggestions');

cityInput.addEventListener('input', () => {
    const input = cityInput.value;
    if(input == '') {
        suggestions.innerHTML = '';
        return;
    }
    else {
        fetch(`http://api.weatherapi.com/v1/search.json?key=b301fae74e5c4e42926164325232512&q=${input}`)
        .then(data => data.json())
        .then(data => showAutocomplete(data))
    }
});

showAutocomplete = (data) => {
    suggestions.innerHTML = '';
    data.forEach(city => {
        const { name, region } = city;
        suggestions.innerHTML += `
        <li class="city-item">${name}, ${region}</li>
        `;
    });
    const cities = document.querySelectorAll('.city-item');
    cities.forEach((city) => {
        city.addEventListener('click', (e) => {
            cityInput.value = e.target.textContent;
            fetch(`http://api.weatherapi.com/v1/current.json?key=b301fae74e5c4e42926164325232512&q=${cityInput.value}&aqi=no`)
            .then(data => data.json())
            .then(data => showUI(data))
        })
    })
}

showUI = (city) => {
    console.log(city);
}