
//--------------------------------------------------------------------------------------------------------------------
//TERRESTRIAL ECOREGION LAYER GEOJSON - POPUP
//--------------------------------------------------------------------------------------------------------------------

	function pop_ecoregion_layer(feature, layer) {

	var popupContent1 = '<center><i class="fa fa-map-marker fa-4x" aria-hidden="true"></i><p>TERRESTRIAL ECOREGION</p><hr><a href="#">'+feature.properties.eco_name+'</a></center><br><div id="container" style="min-width: 300px; height: 200px; margin: 0 auto">Loading...</div>';

	var t=function()
	{

	  return [{
                type: 'pie',
		name: 'title',
		data: [
                      ['protection', parseFloat(feature.properties.pa_cover)],
                      ['connection', parseFloat(feature.properties.connect)]
                      ]
               }]
	}

        layer.on('popupopen', function(e) {
          $('#container').highcharts({
            chart: {
                      type: 'pie',
                      options3d: {
                      enabled: true,
                      alpha: 45,
                      beta: 0
                      }
                    },

                      plotOptions: {
                      pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      depth: 35,
                      dataLabels: {
                          enabled: true,
                          format: '{point.name}'
                              }
                          }           
                      },

            series: t(feature)

          });
        });


    layer.on('popupclose', function(e){
      $('#container').html("Loading...");
    });
		    layer.on({
  		    'mouseover': function (e) {
  		      highlight(e.target);
  		    },
  		    'mouseout': function (e) {
  		      dehighlight(e.target);
  		    },
  			'click': function (e) {
  				  select(e.target);
  				}
  			});

	layer.bindPopup(popupContent1);




	}
//--------------------------------------------------------------------------------------------------------------------
//TERRESTRIAL ECOREGION LAYER GEOJSON
//--------------------------------------------------------------------------------------------------------------------

$.ajax({
    type: "POST",
    url: "/sites/all/modules/fewo_map/js/ecoregion_maps/eco_prot_con.geojson",
    dataType: 'json',
    success: function (response) {

        geojsonLayer = L.geoJson(response, {
		onEachFeature: pop_ecoregion_layer,
            style: function (feature) {
			return {color: '#FFFFFF',
					fillColor: '#FFFFFF',
					weight: 1,
					opacity: '0',
					fillOpacity: '0'};
			}
        }).addTo(lMap);
    }
});



