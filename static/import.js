function handleImport() {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
  
    // Add an event listener for the file selection
    fileInput.addEventListener('change', function (event) {
      const file = event.target.files[0];
  
      // Check if a file is selected
      if (file) {
        // Read the file contents as text
        const reader = new FileReader();
        reader.onload = function (e) {
          const contents = e.target.result;
  
          // Parse the GeoJSON contents
          const geoJson = JSON.parse(contents);
  
          // Create a feature group to hold the imported features
          const featureGroup = L.featureGroup().addTo(map);
  
          // Define a default style for the GeoJSON layer
          const defaultStyle = {
            fillColor: 'blue',
            color: 'blue',
          };
  
          // Create a GeoJSON layer and add it to the feature group
          L.geoJSON(geoJson, {
            style: defaultStyle
          }).addTo(featureGroup);

          const layerName = file.name;
          editableLayerControl.addOverlay(featureGroup, layerName);
  
          // Fit the map to the bounds of the feature group
          map.fitBounds(featureGroup.getBounds());
        };
  
        reader.readAsText(file);
      }
    });
  
    // Trigger a click event on the file input element to open the file selection dialog
    fileInput.click();
  }
  