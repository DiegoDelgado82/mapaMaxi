let map;

function initMap() {

    
  


    const mapOptions = {
        
        center: { lat: -31.46031119189375, lng: -64.21557601663127 }, // Coordenadas  inicial -31.46031119189375, -64.21557601663127
        zoom: 17,
        disableDefaultUI: true, 
        mapTypeId: google.maps.MapTypeId.HYBRID, 
        styles
        : [
            {
                featureType: "transit",
                elementType: "all",
                stylers: [{ visibility: "off" }] // Ocultar todas las características de transporte público
            },
            {
                featureType: "poi",
                stylers: [{ visibility: "off" }] // Desactivar puntos de interés (POI), que incluyen parques y plazas
            },
            {
                featureType: "road",
                elementType: "labels",
                stylers: [{ visibility: "on" }]
            },
            
        ],
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

//////////////////////
directionsService = new google.maps.DirectionsService();
directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
    preserveViewport: true // Mantener el zoom y centro del mapa
});

    // Coordenadas del punto inicial, intermedio y final
    const startCoords = { lat: -31.4595, lng: -64.2158 }; // Coordenadas de ejemplo 
    const waypoint1Coords = { lat: -31.4587, lng: -64.2165 }; // Coordenadas de ejemplo 
    const waypoint2Coords= { lat: -31.4597, lng: -64.2177 };
    const endCoords = { lat: -31.4604, lng: -64.2168 }; // Coordenadas de ejemplo -31.46047297278201, -64.21686571017038

    // Calcular y mostrar la ruta
    calculateAndDisplayRoute(directionsService, directionsRenderer, startCoords, [waypoint1Coords, waypoint2Coords], endCoords);



////////////////////





    fetch('markers.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(marker => {
                addMarker(marker);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

      
           
       
}

function addMarker(markerData) {
    const iconBase = 'icons/';
    const icons = {
        maxi: iconBase + 'maxi.png',
        cartel: iconBase + 'cartel.png',
        semaforo: iconBase + 'semaforo.png'
    };

    const marker = new google.maps.Marker({
        map: map,
        position: { lat: markerData.lat, lng: markerData.lng },
        title: markerData.name,
        icon: icons[markerData.type]
    });

   
}

///////////////////////////////////////////////
function calculateAndDisplayRoute(directionsService, directionsRenderer, startCoords, waypointCoordsArray, endCoords) {
    const waypoints = waypointCoordsArray.map(coords => ({
        location: coords,
        stopover: true
    }));

    directionsService.route(
        {
            origin: startCoords,
            destination: endCoords,
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.DRIVING
        },
        function(response, status) {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );
}

//////////////////////////////////////////////