/**
 * Created by Shrinivasan on 02-01-2017.
 */
function displaymap() {
  console.log('hi');
  var Markerdetails=function (data) {

      this.title = 'Caesars Head State Park Visitor Center';
    this.latitude = 35.105859;
    this.longitude =-82.626111;
    this.latLng ={lat:this.latitude, lng: this.longitude};
    this.address='8155 Geer Hwy, Cleveland, SC 29635'


      var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 34.010111, lng: -81.074432}


    });
    alert(this.latitude);
     this.marker = new google.maps.Marker({
        position: this.latLng,

        map: map,
        title: this.title
      });

    alert('finish');



     jsondata=$('#jsondata');
    $(jsondata).text("<h2>The json data of"+this.title+"is </h2>");
    alert(jsondata);
    var $body = $('body');
    var streetStr = '1000 Whaley Street ';
    var cityStr = 'Columbia';
    var address = streetStr + ', ' + cityStr;
    alert(address);
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    jsondata.append('<li><img class="" src="' + streetviewUrl + '"></li>');
    alert(jsondata);
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
  'api-key': "c347d6bc6a5b4be1ac897ada807b0293",
  'q':""+cityStr+"",'sort':'newest'
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
        alert('not possible');
      }
    })



      alert(jsondata);
    alert('wiki data');
  var wikiurl= 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr+ '&format=json&callback=wikiCallback';
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
    /*
    this.marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  */
  }

  var ViewModel=function(){
    this.currentmarker=ko.observable(new Markerdetails());
  }


   ko.applyBindings(new ViewModel());
}
