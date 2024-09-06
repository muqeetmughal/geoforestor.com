new L.basemapsSwitcher([
        {
      layer: L.tileLayer(
          "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
          {
            name:"Basemap",
            minZoom: 2,
            maxZoom: 19,
            id: "google.hybrid"
          }
        ).addTo(map2),
      icon: '/static/assets/googlehybrid.png',
      name: 'Hybrid'
    },
    // {
    //   layer: L.tileLayer(
    //       "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
    //       {
    //         minZoom: 2,
    //         maxZoom: 19,
    //         id: "google.street"
    //       }),
    //   icon: '/static/assets/googlemap.png',
    //   name: 'Google'
    // },
    {
        layer:  L.tileLayer(
              "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              {
                name:"Basemap",
                minZoom: 2,
                maxZoom: 19,
                id: "osm.streets"
              }
            ),
        icon: '/static/assets/osm.png',
        name: 'OSM'
      },
      {
        layer:  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        }),
        icon: '/static/assets/worldtopo.png',
        name: 'World Topo'
      },
      {layer: L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 18,
      
      }),
        icon: '/static/assets/terrain.png',
        name: 'Terrain'
      },
  ], { position: 'bottomright' }).addTo(map2);

