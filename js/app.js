
function displaymap() {
  console.log('hi');


  //-----------------------------------------------------------------------------------------------------
  var initialLocations = [];
  initialLocations = [//Collections

    {
      title: 'Riverbanks Zoo and Garden ',
      address: '500 Wildlife Pkwy, Columbia, SC 29210',
      description: 'Riverbanks Zoo and Garden ',
      url: 'http://hollywoodtheatre.org/',
      latitude: 34.010111,
      longitude: -81.074432,//Model

    },
    {
      title: 'Myrtle Beach Resort',
      address: '126 SW 2nd Ave, Portland, OR 97204',
      description: 'Food hall including Salt & Straw\'s whiz bang soft serve bar',
      url: '5905 S Kings Hwy, Myrtle Beach, SC 29575,',
      latitude: 33.633161,
      longitude: -78.95683,

    },

    {
      title: 'Charleston Center Dr',
      address: 'Charleston, SC',
      description: 'Charleston Center Dr',
      url: 'https://pinestreetmarket.squarespace.com/tenants',
      latitude: 32.7834875,
      longitude: -79.9523504,

    },
    {
      title: 'Hilton Head Island',
      address: ' SC, USA',
      description: 'Hilton Head Island',
      url: 'http://www.pps.net/Domain/120',
      latitude: 32.216316,
      longitude: -80.752608,

    },
    {
      title: 'Huntington Beach State Park',
      address: 'Ocean Hwy, Murrells Inlet, SC 29576',
      description: 'Huntington Beach State Park',
      url: '',
      latitude: 33.535182,
      longitude: -79.058108

    },
    {
      title: 'South Carolina State Museum',
      address: '301 Gervais St',
      description: 'Flagship location',
      url: '',
      latitude: 33.999056,
      longitude: -81.048082

    },
    {

      title: 'Caesars Head State Park Visitor Center',
      address: '8155 Geer Hwy, Cleveland, SC 29635',
      description: 'Caesars Head State Park Visitor Center',
      url: 'http://unomastaquiza.com/',
      latitude: 35.105859,
      longitude: -82.626111

    },

  ];

//--------------------------------------------------------------------------------------------------------------------
  alert('step1');


  var ViewModel = function () {
    self = this;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 34.010111, lng: -81.074432}
    });
    alert('step2');
    var markers = ko.observableArray([]);
    var alllocationsnames= ko.observableArray([]);
    var marker = ko.observable();

    for (i = 0; i < 2; i=i+1) {
      =new
      self.title = initialLocations[i].title;
      self.latitude = initialLocations[i].latitude;
      self.longitude = initialLocations[i].longitude;
      self.latLng = {lat: initialLocations[i].latitude, lng: initialLocations[i].longitude};
      self.description = initialLocations[i].description;
      self.address = initialLocations[i].address;
      alllocationsnames.push(self.title);


      self.marker = new google.maps.Marker({
        position: self.latLng,
        map: map,
        title: self.title
      });


      var contentString = '<div id="content"><h2>' + self.title + '</h2>' +
        '<div><h2>' + self.description + '</h2></div>' +
        '<div><h3>' + self.address + '</h3></div>' +

        '<p>kjkgfgfklg</p>';
      var infowindow = new google.maps.InfoWindow({

        content: contentString,
        title: self.title
      });

      self.marker.addListener('click', function () {

        infowindow.open(map,self.marker);
        alert(self.title);



      }
    )

    alert(alllocationsnames[i] );}


  }



       function getWiki() {
        self.wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + self.title + '&format=json&callback=wikiCallback';
       alert(self.wikiUrl);

         var timeout = setTimeout(function () {
       alert("Articles WIKI NOT FOUND");

       }, 8000);
       contentString.append(wikiUrl);
       $.ajax({
       url: self.wikiurl,
       dataType: 'jsonp',
       success: function (response) {

       marker.url = response[3][0];



       clearTimeout(timeout);
       }


       });

       }
  self.query=ko.computed(function () {


  })






    ko.applyBindings(new ViewModel()); }











