/**
 * Created by Shrinivasan on 02-11-2016.
 */
function displaymap() {
  console.log('hi');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $images= $('#images');
     var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 34.010111, lng: -81.074432}



    });
var initialmarkers = [];
  initialmarkers = [

    {
      title: 'Riverbanks Zoo and Garden ',
      address: '500 Wildlife Pkwy, Columbia, SC 29210',
        cityStr:'Columbia',
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
        cityStr:'Myrtle Beach',
      latitude: 33.633161,
      longitude: -78.95683,

    }


  ];
  var Markerdetails=function (data) {

      this.title = data.title;
    this.latitude = Number(data.latitude);
    this.longitude =Number(data.longitude);
    this.latLng ={lat:this.latitude, lng: this.longitude};
    this.address=data.address;

      this.cityStr=data.cityStr;
      alert('data is'+data.cityStr)
      alert(this.cityStr);





     this.marker = new google.maps.Marker({
        position: this.latLng,

        map: map,
        title: this.title
      });


    var $body = $('body');
    var streetStr = '1000 Whaley Street ';
    var cityStr = this.cityStr;
      alert(cityStr);

    var address = this.address;

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+cityStr+'';
      alert('this is street view url'+streetviewUrl);

      $images.append('<img  src="' + streetviewUrl + '">');

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
  'api-key': "c347d6bc6a5b4be1ac897ada807b0293",
  'q':""+cityStr+"",'sort':'newest'
  });
     $($nytHeaderElem).text('In'+this.address+'following is going on');
    $.ajax({
      url: url,
      method: 'GET',
      success: function (result) {
        var articles = result.response.docs;
          alert('nyt'+articles[0].web_url);

        for (i = 0; i < articles.length; i++) {

         $($nytHeaderElem).append('<li><a href=""+articles[i].web_url+""></a></li>');
            $($nytHeaderElem).append('<li><a>'+articles[i].snippet+'</a></li>');

        }
      },
      error: function () {
        alert('No article available for'+this.title);
      }
    })



    var title=this.title;
      alert(title);

    alert('wiki data');
  var wikiurl= 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +title+ '&format=json&callback=wikiCallback';
      alert(wikiurl);
  $.ajax({
    url: wikiurl,

    dataType: 'jsonp',
    success: function (result) {
      alert(result);
      $wikiElem.append('<p>'+result+'</p>');


    },
    error: function () {
      alert('no wiki articles available');

    }
  })


var contentstring="<html><div>"+this.title + this.address;
    this.contentstring=ko.observable(contentstring);

    var infowindow =new google.maps.InfoWindow({
        map:map,
       content:contentstring

     })
    alert(contentstring);

    this.marker.addListener('click', function() {
         if (infowindow) {
             for(i=0;i<initialmarkers.length;i++)
                 infowindow.close();
    }

        if (infowindow.content===undefined){
            contentstring="<html><div>"+this.title + this.address+"</div></html>";
            infowindow.setcontent(contentstring);
            return infowindow.open(map, this.marker)
        }
          else {return infowindow.open(map, this.marker)}
  });

  }

  var ViewModel=function(){
    var self=this;
    this.markerlist=ko.observableArray([]);
    this.markertitles=[];
    initialmarkers.forEach(function (markeritem) {
      self.markerlist.push(new Markerdetails(markeritem));


      self.markertitles.push(Markerdetails(markeritem.title));

     console.log('these are titles'+self.markertitles);


    })
    alert(this.markerlist()[0].title);
    this.currentmarker=ko.observable(this.markerlist()[0]);
    alert(this.markerlist()[0])
      search:function (value) {ViewModel.
          
      }
  }




   ko.applyBindings(new ViewModel());
}
