let map;

function initMap() {

    
  


    const mapOptions = {
        
        center: { lat: -31.462259639738043, lng: -64.21609408094824 }, // Coordenadas de Córdoba capital
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

    const infoWindow = new google.maps.InfoWindow({
        content: `<h5>${markerData.name}</h5><p>${markerData.address}</p>`
    });

    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}
