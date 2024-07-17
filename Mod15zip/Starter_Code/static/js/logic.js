let map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let colors = [
    "#a5f600",
    "#dbf403",
    "#f8db11",
    "#ffb72a",
    "#fca35e",
    "#fe5f65"
  ];

function getColor(depth) {

    if (depth < 10) color = colors[0];
    else if (depth < 30) color = colors[1];
    else if (depth < 50) color = colors[2];
    else if (depth < 70) color = colors[3];
    else if (depth < 90) color = colors[4];
    else color = colors[5];
  
    return color;
  }

function markerSize(magnitude) {
    return magnitude * 10000;
}

let legend = L.control({ position: "bottomright" });

legend.onAdd = function() {

  let div = L.DomUtil.create("div", "info legend");

  div.innerHTML = `<div class="box" style="background-color: ${colors[0]};"></div><span>-10-10</span><br>` +
    `<div class="box" style="background-color: ${colors[1]};"></div><span>10-30</span><br>` +
    `<div class="box" style="background-color: ${colors[2]};"></div><span>30-50</span><br>` +
    `<div class="box" style="background-color: ${colors[3]};"></div><span>50-70</span><br>` +
    `<div class="box" style="background-color: ${colors[4]};"></div><span>70-90</span><br>` +
    `<div class="box" style="background-color: ${colors[5]};"></div><span>90+</span><br>`

  return div
};

legend.addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then((data) =>{
    
    data.features.forEach(earthquake => {
        let coords = earthquake.geometry.coordinates;
         L.circle([coords[1], coords[0]], {
            color: "black",
            fillColor: getColor(coords[2]),
            fillOpacity: 1,
            weight: 0.75,
            radius: markerSize(earthquake.properties.mag)
        }).bindPopup(`<strong>Location: ${earthquake.properties.place}</strong><br><strong>Magnitude: ${earthquake.properties.mag}</strong><br><strong>Depth: ${coords[2]}</strong>`).addTo(map);
        
        console.log(earthquake)


    });

    
})


