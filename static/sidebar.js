
//Sidebar

var sidebar = L.control
  .sidebar({
    autopan: false,
    container: "sidebar",
    position: "left"
  })
  .addTo(map);

  sidebar.addPanel({
  id: 'icon-panel',
  tab: '<i class="fi fi-ca mt-2 mr-1 country-icon"></i>',
  disabled: true,
});

sidebar.addPanel({
  id: 'home-panel',
  tab: '<i class="fa fa-home mt-2 mr-1"></i>',
  title: 'Reset Zoom',
  button: togglehome
});

sidebar.addPanel({
  id: 'fullscreen-panel',
  tab: '<i class="fas fa-expand mt-2 mr-1"></i>',
  title: 'Full Screen',
  button: toggleFullScreen,
  
});


sidebar.addPanel({
  id: 'layers-panel',
  tab: '<i class="fa fa-layer-group mt-2 mr-1"></i>',
  title: 'Layers',
  pane: document.getElementById('layercontrol')
});

sidebar.addPanel({
  id: 'legend-panel',
  tab: '<i class="fa fa-map mt-2 mr-1"></i>',
  title: 'Map Legend',
  pane: document.getElementById('legend')
});

sidebar.addPanel({
    id: 'featureinfo-panel', 
    tab: '<i class="fas fa-info-circle mt-2 mr-1"></i>', 
    title: 'Feature Info', 
    pane: document.getElementById('info'),
  });
    

sidebar.addPanel({
    id: 'edit-panel',
    tab: '<i class="fa fa-pen mt-2 mr-1"></i>',
    title: 'Edit Layers',
    pane: document.getElementById('edit'),
  });

  sidebar.addPanel({
    id: 'search-panel',
    tab: '<i class="fa fa-search mt-2 mr-1"></i>',
    title: 'Search Layers',
    pane: document.getElementById('search'),
  });

  sidebar.addPanel({
    id: 'import-panel',
    tab: '<i class="fa fa-file-import mt-2 mr-1"></i>',
    title: 'Import Data',
    button: handleImport,
  });


sidebar.addPanel({
    id: 'settings-panel',
    tab: '<i class= "fa fa-wrench mt-2 mr-1"></i>',
    title: 'Settings',
    position:'bottom'
});

sidebar.addPanel({
  id: 'cssbutton',
  tab: '<i class= "fas fa-clone mt-2 mr-1"></i>',
  title: 'Duplicate Map Window',
  button : handlecss,
});

function togglehome(){
    map.fitBounds(bounds);
};

function toggleFullScreen() {
  var mapElement = document.getElementById('map');
  if (!document.fullscreenElement) {
    if (mapElement.requestFullscreen) {
      mapElement.requestFullscreen();
    } else if (mapElement.mozRequestFullScreen) { // Firefox
      mapElement.mozRequestFullScreen();
    } else if (mapElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
      mapElement.webkitRequestFullscreen();
    } else if (mapElement.msRequestFullscreen) { // IE/Edge
      mapElement.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  }
}

