
const map = L.map('map').setView([48.9171, 24.7158], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function addMarker(lat, lng, message) {
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(message).openPopup();
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const time = new Date().toLocaleTimeString();
            addMarker(latitude, longitude, `You are here: ${latitude}, ${longitude} (at ${time})`);
            map.setView([latitude, longitude], 13);
        },
        () => {
            alert('Unable to retrieve your location.');
        }
    );
} else {
    alert('Geolocation is not supported by your browser.');
}

document.getElementById('scroll-btn').addEventListener('click', () => {
    const lat = parseFloat(document.getElementById('lat-input').value);
    const lng = parseFloat(document.getElementById('lng-input').value);

    if (!isNaN(lat) && !isNaN(lng)) {
        map.setView([lat, lng], 13);
        addMarker(lat, lng, `Destination: ${lat}, ${lng}`);
    } else {
        alert('Please enter valid coordinates.');
    }
});
