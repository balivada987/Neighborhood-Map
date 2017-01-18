/**
 * Created by Shrinivasan on 02-11-2016.
 */
var map;
var markerlist=[];
function displaymap() {
    console.log('map');

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 34.010111, lng: -81.074432}
    });
    alert('map finished')


ko.applyBindings(new Markerdetails());}
var mapsError = function() {
  alert("Google Maps failed to load");
}



  var Markerdetails=function () {
      alert('Markerdetails started')
      var initialmarkers = [];
      initialmarkers = [

          {
              title: 'Riverbanks Zoo and Garden ',
              address: '500 Wildlife Pkwy, Columbia, SC 29210',
              cityStr: 'Columbia',
              description: 'Riverbanks Zoo and Garden ',
              url: 'http://hollywoodtheatre.org/',

              latitude: 34.010111,
              longitude: -81.074432,

          },
          {
              title: 'Myrtle Beach Resort',
              address: '126 SW 2nd Ave, Portland, OR 97204',
              description: 'Food hall including Salt & Straw\'s whiz bang soft serve bar',
              url: '5905 S Kings Hwy, Myrtle Beach, SC 29575,',
              cityStr: 'Myrtle Beach',
              latitude: 33.633161,
              longitude: -78.95683,
          }
      ];
      var infoWindow = new google.maps.InfoWindow();
      alert('infoWindow created')
      self = this;
      self.wikiElem = ko.observable('');
      self.nytArt = ko.observableArray('');
      self.nyArtlist = ko.observableArray('');
      self.locations = ko.observableArray(initialmarkers);
      self.markerSelected = ko.observableArray('');
      self.images = ko.observable('');

      self.userSearch = ko.observable(' ');
      self.writeToConsole = ko.computed(function () {
          console.log(self.userSearch());
      });
      alert('all declarations done');
      self.populateMap1 = ko.computed(function () {
          var searchQuery = self.userSearch().toLowerCase();
          var filteredPlaces = [];

          if (!searchQuery) {
              return allmarkers();
          } else {
              console.log("attempt to repopulate map");
              removeallarkers();
              return filteredmarkers(searchQuery);
          }
      });
      self.selectPlaces1 = ko.computed(function () {
          var searchQuery = self.userSearch().toLowerCase();
          alert(searchQuery);

          if (!searchQuery) {
              return self.locations();
          } else {
              console.log("selectPlaces reached else");

              self.locations().forEach(function (location) {
                  var title = location.title.toLowerCase();

                  if (title.indexOf(searchQuery) !== -1) {
                      self.markerSelected.push(location);
                  }
              })
              return self.markerSelected();
          }
      });


      /*
       this.title = data.title;
       this.latitude = Number(data.latitude);
       this.longitude =Number(data.longitude);
       this.latLng ={lat:this.latitude, lng: this.longitude};
       this.address=data.address;

       this.cityStr=data.cityStr;
       alert('data is'+data.cityStr)
       alert(this.cityStr);

       */


      function allmarkers() {
          self.locations().forEach(function (location) {
              var position = location.latLng;
              var title = location.title;
              var cityStr = location.cityStr;
              // Marker Creation is done here
              var marker = new google.maps.Marker({
                  map: map,
                  title: title,
                  position: position
              });
              // For Search Add markers to array

              markerlist.push(location);
              // Add infowindow
              marker.addListener('click', function () {
                  alert('infowindowdetails and getNyarticles and google street view')
                  getnyarticles(title)
                  googlestreetview(cityStr);
                  getwikiarticle(title);
                  populateInfowindow(infoWindow, marker);


              })
              location.marker = marker

          })

      }


      /*function googlestreetview(cityStr) {
       var $body = $('body');

       var cityStr = cityStr;
       alert(cityStr);


       var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+cityStr+'';
       alert('this is street view url'+streetviewUrl);

       $images.append('<img  src="' + streetviewUrl + '">');


       }
       */
      function getnyarticles(title) {

          var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
          url += '?' + $.param({
                  'api-key': "c347d6bc6a5b4be1ac897ada807b0293",
                  'q': "" + title + "", 'sort': 'newest'
              });


          alert(cityStr)
          //$($nytHeaderElem).text('In'+title+'following is going on');
          $.ajax({
              url: url,
              method: 'GET',
              success: function (result) {
                  var articles = result.response.docs;
                  alert('nyt' + articles[0].web_url);

                  for (i = 0; i < articles.length; i++) {

                      self.nytArt.push('<a href="' + article.web_url + '">' + article.headline.main + '</a>');
                  }
              },
              error: function () {
                  alert('No article available for' + this.title);
              }
          })

      }

      function getwikiarticle(title) {
          alert(title);
          var wikiurl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + title + '&format=json&callback=wikiCallback';
          alert(wikiurl);
          $.ajax({
              url: wikiurl,

              dataType: 'jsonp',
              success: function (result) {
                  alert(result);
                  $wikiElem.append('<p>' + result + '</p>');


              },
              error: function () {
                  alert('no wiki articles available');

              }
          })
      }

      function populateInfowindow(infowindow, marker) {

          if (infowindow.marker != marker) {
              infowindow.marker = marker
              var contentstring = "<html><div>" + marker.title + "</div></html>";
              infowindow.setcontent(contentstring);
              alert(contentstring);
              infowindow.open(map, marker)
              marker.addListener('closeclick', function () {
                  infowindow.marker = null;

              });
          }

      }

      function filteredmarkers(userquery) {
          self.locations().forEach(function (location) {


              var lowertitle = location.title.toLowerCase()
              if (lowertitle.indexOf(userquery) > -1) {
                  alert('searched result found');
                  var position = location.latLng;
                  var title = location.title;
                  var cityStr = location.cityStr;
                  // Marker Creation is done here
                  var marker = new google.maps.Marker({
                      map: map,
                      title: title,
                      position: position
                  });
                  // For Search Add markers to array

                  markerlist.push(location);
                  // Add infowindow
                  marker.addListener('click', function () {
                      alert('infowindowdetails and getNyarticles and google street view')
                      getnyarticles(title)
                      googlestreetview(cityStr);
                      getwikiarticle(title);
                      populateInfowindow(infoWindow, marker);


                  })
                  location.marker = marker


              }

          })

      }

      function onclickoffilteredmarker(filteredmarkerdata) {
          getnyarticles(filteredmarkerdata.title)
          googlestreetview(filteredmarkerdata.cityStr);
          getwikiarticle(filteredmarkerdata.title);
          populateInfowindow(infoWindow, filteredmarkerdata);

      }

      function SetAllMarkersOnMap(map) {
          for (i = 0; i < markerlist.length; i++)
              markerlist[i].setMap(map)

      }

      function removeallarkers() {
          SetAllMarkersOnMap(null);
      }

      self.nyArtlist = ko.computed(function nyarticlesforselected() {
          return self.nytArt()

      });

  }








