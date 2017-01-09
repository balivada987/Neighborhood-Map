/**
 * Created by Shrinivasan on 09-01-2017.
 */
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
 console.log('hi')
alert(initialmarkers.length);
var ViewModel=function(){
    alert('viewmodel');

var self=this;

    this.markerlist=ko.observableArray([]);
    this.markertitles=[];
    initialmarkers.forEach(function (markeritem) {

        self.markerlist.push(markeritem);

    })





   }
 ko.applyBindings(new ViewModel());
 // ;






