var map = L.map('map').setView([48.8706, 2.3163], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([48.8718, 2.3164]).addTo(map);

marker.bindPopup("10 rue de Penthièvre, Paris (75008)").openPopup();