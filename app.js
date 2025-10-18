const map = L.map('map').setView([46.8139, -71.2080], 13); // Centered on Quebec City by default
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const rangeSlider = document.getElementById('range');
const carList = document.getElementById('car-list');

let userMarker;
let notifiedCars = new Set();

function init() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 15);
            userMarker = L.marker([latitude, longitude]).addTo(map)
                .bindPopup('Your Location')
                .openPopup();
            fetchAndDisplayCars();
            setInterval(fetchAndDisplayCars, 30000);
        }, () => {
            alert('Could not get your location. Please allow location access.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }

    Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
            alert('Please allow desktop notifications to be notified of new cars.');
        }
    });

    rangeSlider.addEventListener('input', debounce(fetchAndDisplayCars, 500));
}

function fetchAndDisplayCars() {
    if (!userMarker) return;

    const userLatLng = userMarker.getLatLng();
    const range = rangeSlider.value;

    fetch('/api/vehicles')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!data.d.Success) {
                throw new Error('API returned an error');
            }
            const vehicles = data.d.Vehicles;
            const nearbyCars = vehicles.filter(car => {
                const distance = haversineDistance(userLatLng.lat, userLatLng.lng, car.Latitude, car.Longitude);
                return distance <= range;
            });

            updateCarList(nearbyCars);
            updateMapMarkers(nearbyCars);
            notifyForNewCars(nearbyCars);
        })
        .catch(error => {
            console.error('Error fetching vehicles:', error);
            carList.innerHTML = '<li class="car-item">Could not fetch car data. Please try again later.</li>';
        });
}

function updateCarList(cars) {
    carList.innerHTML = '';
    cars.forEach(car => {
        const listItem = document.createElement('li');
        listItem.className = 'car-item';
        listItem.textContent = `${car.CarBrand} ${car.CarModel} (${car.CarPlate})`;
        carList.appendChild(listItem);
    });
}

let carMarkers = [];
function updateMapMarkers(cars) {
    carMarkers.forEach(marker => map.removeLayer(marker));
    carMarkers = [];

    cars.forEach(car => {
        const marker = L.marker([car.Latitude, car.Longitude]).addTo(map)
            .bindPopup(`${car.CarBrand} ${car.CarModel}`);
        carMarkers.push(marker);
    });
}

function notifyForNewCars(cars) {
    cars.forEach(car => {
        if (!notifiedCars.has(car.CarId)) {
            new Notification('New Car Nearby!', {
                body: `A ${car.CarBrand} ${car.CarModel} is now available near you.`,
            });
            notifiedCars.add(car.CarId);
        }
    });
}

init();
