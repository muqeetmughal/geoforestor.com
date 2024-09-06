var m2css=document.getElementById('m2').style;
var map2css=document.getElementById('map2').style;
var rowcss=document.getElementById('row').style;
var cursor1 = L.circleMarker([0,0], { radius: 25, fillOpacity: 0.2, color: '#FFF48D', fillColor: '#FFFFFF' });
var cursor2 = L.circleMarker([0,0], { radius: 25, fillOpacity: 0.2, color: '#FFF48D', fillColor: '#FFFFFF' });
var state = true;

function handlecss(){
  

  if (state==true){
    rowcss.cssText='display:flex';
    m2css.cssText=' position:sticky; border: 5px solid rgb(70, 64, 73);margin-right: 10px;box-shadow: 0px 1px 14px 8px;height: 94vh;border-radius: 25px; display:block; width:100%;margin-right:1px;margin-left:10px;'
    map2css.cssText="position: relative;width: inherit;height: inherit;outline: none;border-radius: 25px;"
    map.addLayer(cursor1);
    map2.addLayer(cursor2);
    map.on('mousemove', function (e) {
        cursor1.setLatLng(e.latlng);
        cursor2.setLatLng(e.latlng);
    });
    map2.on('mousemove', function (e) {
        cursor1.setLatLng(e.latlng);
        cursor2.setLatLng(e.latlng);
    });
    map.removeLayer(cursor1);
    map2.removeLayer(cursor2);
       
    state=false 
  }
  else{
    rowcss.cssText='display:block';
    m2css.cssText='  display:none;border: 0px; margin-right: 0px;box-shadow: none; height: 0vh; border-radius: 0px;'
    
    state=true
  }


  
//   $("body").on("shown.bs.tab", "#link3", function() {
//     map.invalidateSize(false);
//     map2.invalidateSize(false);    
// });
};

// $("body").on("shown.bs.tab", "#link3", function() {
//     map2.invalidateSize(false);    
// });

//Sync Maps
map.sync(map2); 
map2.sync(map);

// $("body").on('shown','#link3', function() { 
//   L.Util.requestAnimFrame(map2.invalidateSize,map2,!1,map2._container);
// });
