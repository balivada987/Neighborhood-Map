/**
 * Created by Shrinivasan on 02-11-2016.
 */
function displaymap() {
  console.log('hi');
var initialmarkers = [];
  initialmarkers = [

    {
      title: 'Riverbanks Zoo and Garden ',
      address: '500 Wildlife Pkwy, Columbia, SC 29210',
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
      latitude: 33.633161,
      longitude: -78.95683,

    }

  ];
  var Markerdetails=function (data) {

      this.title = data.title;
    this.latitude = Number(data.latitude);
    this.longitude =Number(data.longitude);
    alert('this is marker'+this.latitude+','+this.longitude)
    this.latLng ={lat:this.latitude, lng: this.longitude};
    this.address=data.address


      var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 34.010111, lng: -81.074432}


    });
    alert('this is marker2'+this.latLng.lat+','+this.latLng.lng);

     this.marker = new google.maps.Marker({
        position: this.latLng,

        map: map,
        title: this.title
      });

    alert(this.latitude+',' +this.longitude);



     jsondata=$('#jsondata');
    $(jsondata).text("<h2>The json data of"+this.title+"is </h2>");
    alert(jsondata);
    var $body = $('body');
    var streetStr = '1000 Whaley Street ';
    var cityStr = 'Columbia';
    var address = this.address;
    alert(this.address);
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    jsondata.append('<li><img class="" src="' + streetviewUrl + '"></li>');
    alert(jsondata);
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
  'api-key': "c347d6bc6a5b4be1ac897ada807b0293",
  'q':""+this.title+"",'sort':'newest'
  });
    
    $.ajax({
      url: url,
      method: 'GET',
      success: function (result) {
        var articles = result.response.docs;
        alert(result);

        for (i = 0; i < articles.length; i++) {

          $(jsondata).append('<li><a>' + articles[i].snippet + '</a></li>');
        }
      },
      error: function () {
        alert('No article available for'+this.title);
      }
    })



      alert(jsondata);

    alert('wiki data');
  var wikiurl= 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +this.title+ '&format=json&callback=wikiCallback';


   alert(wikiurl);
  $.ajax({
    url: wikiurl,

    dataType: 'jsonp',
    success: function (result) {
      alert(result);
      $(jsondata).append('<p>' + result + '</p>');
      alert(jsondata);
      this.jsondata=ko.observable(jsondata);
    },
    error: function () {
      alert('no wiki articles available');

    }
  })
     alert('this is'+jsondata);

var contentstring="<html><div>"+this.title + this.address+"<div id='#jsondata'></div></div></html>";
    this.contentstring=ko.observable(contentstring);

    var infowindow =new google.maps.InfoWindow({
        map:map,
       content:contentstring

     })
    alert(contentstring);

    this.marker.addListener('click', function() {
      alert(contentstring);
    infowindow.open(map, this.marker);
  });

  }

  var ViewModel=function(){
    var self=this;
    this.markerlist=ko.observableArray([]);
    this.markertitles=ko.observableArray([]);
    initialmarkers.forEach(function (markeritem) {
      self.markerlist.push(new Markerdetails(markeritem));

      self.markertitles.push(Markerdetails(markeritem.title));
     // alert('these are titles'+self.markertitles);


    })
    alert(this.markerlist()[0].title);
    this.currentmarker=ko.observable(this.markerlist()[0]);
    alert(this.markerlist()[0])
  }


   ko.applyBindings(new ViewModel());
}
