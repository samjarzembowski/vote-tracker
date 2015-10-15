//Burger constructor
var Burger = function(path, name) {
  this.path = path;
  this.name = name;
  this.vote = 0;
};

//Create Objects
var b1 = new Burger('burg1.jpg', 'b1');
var b2 = new Burger('burg2.jpg', 'b2');
var b3 = new Burger('burg3.png', 'b3');
var b4 = new Burger('burg4.jpg', 'b4');
var b5 = new Burger('burg5.jpg', 'b5');
var b6 = new Burger('burg6.jpg', 'b6');
var b7 = new Burger('burg7.png', 'b7');
var b8 = new Burger('burg8.jpg', 'b8');
var b9 = new Burger('burg9.jpeg', 'b9');
var b10 = new Burger('burg10.jpeg', 'b10');
var b11 = new Burger('burg11.jpg', 'b11');
var b12 = new Burger('burg12.jpg', 'b12');
var b13 = new Burger('burg13.jpg', 'b13');
var b14 = new Burger('burg14.jpg', 'b14');
var b15 = new Burger('burg15.jpg', 'b15');
var b16 = new Burger('burg16.jpg', 'b16');
var b17 = new Burger('burg17.jpg', 'b17');
var b18 = new Burger('burg18.jpg', 'b18');
var b19 = new Burger('burg19.jpg', 'b19');
var b20 = new Burger('burg20.jpg', 'b20');

//tracking object
var tracker = {
  //array of burger objects
  burgArray: [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10,
  b11, b12, b13, b14, b15, b16, b17, b18, b19, b20],

  //array of votes -- currently not needed.
  //burgVotes: [b1.vote, b2.vote, b3.vote, b4.vote, b5.vote, b6.vote, b7.vote, b8.vote, b9.vote, b10.vote,
  //b11.vote, b12.vote, b13.vote, b14.vote, b15.vote, b16.vote, b17.vote, b18.vote, b19.vote, b20.vote],

  leftImage: '',
  rightImage: '',
};
console.log(tracker.burgArray);

tracker.randImg = function() {
  return Math.floor(Math.random() * tracker.burgArray.length);
};

tracker.addImages = function() {
  var img0Loc = document.getElementById('img0');
  var img1Loc = document.getElementById('img1');
  tracker.leftImage = tracker.randImg();
  img0Loc.src = 'img/' + tracker.burgArray[tracker.leftImage].path;
  tracker.rightImage = tracker.randImg();
  img1Loc.src = 'img/' + tracker.burgArray[tracker.rightImage].path;
  if (tracker.leftImage === tracker.rightImage) {
    img1Loc.src = 'img/' + tracker.burgArray[tracker.randImg()].path;
  };
  //console.log(tracker.leftImage, tracker.rightImage);
};

//Click one image to replace both images with new random.  Need to add vote tracking
var vote0 = document.getElementById('img0');
var vote1 = document.getElementById('img1');

var data = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
  datasets: [
    {
    label: "Yummy burgers",
    fillColor: "#AA3939",
    strokeColor: "#000000",
    highlightFill: "#FFAAAA",
    highlightStroke: "#000000",
    data : [tracker.burgArray[0].vote, tracker.burgArray[1].vote, tracker.burgArray[2].vote, tracker.burgArray[3].vote, tracker.burgArray[4].vote, tracker.burgArray[5].vote, tracker.burgArray[6].vote, tracker.burgArray[7].vote, tracker.burgArray[8].vote, tracker.burgArray[9].vote, tracker.burgArray[10].vote, tracker.burgArray[11].vote, tracker.burgArray[12].vote, tracker.burgArray[13].vote, tracker.burgArray[14].vote, tracker.burgArray[15].vote, tracker.burgArray[16].vote, tracker.burgArray[17].vote, tracker.burgArray[18].vote, tracker.burgArray[19].vote]
    }
  ]
}

function mkChart() {
  var barChart = document.getElementById('brgchart').getContext('2d');
  var brgChart = new Chart(barChart).Bar(data);
};

tracker.voteTrackL = function() {
  console.log('clicked left image!');
  tracker.burgArray[tracker.leftImage].vote += 1;
  data.datasets[0].data[tracker.leftImage] += 1;
  tracker.addImages();
  createLocal();
  mkChart();
};

tracker.voteTrackR = function() {
  console.log('clicked right image!');
  tracker.burgArray[tracker.rightImage].vote += 1;
  data.datasets[0].data[tracker.rightImage]  += 1;
  tracker.addImages();
  createLocal();
  mkChart();
};

vote0.addEventListener('click', tracker.voteTrackL);
vote1.addEventListener('click', tracker.voteTrackR);

tracker.addImages();
checkLocal();
mkChart();



//CHECK TO SEE IF DATA.DATASETS.DATA[i].VOTE !=0
//IF !0 FOUND IN THE ARRAY SAVE ARRAY TO LOCAL STORAGE
function createLocal() {
  var dataStore = JSON.stringify(data.datasets[0].data);
  for (var i = 0; i < data.datasets[0].data.length; i++) {
    if (data.datasets[0].data[i].vote !== 0) {
      localStorage.setItem('voteData', dataStore);
    }
  };
}
//IT WILL BE STORED AS A STRING
//ON PAGE LOAD, CHECK LOCAL STORAGE FOR THE SAVED ARRAY
//IF FOUND, PARSE IT AND SET IT INTO DATA.DATASETS[0]
function checkLocal() {
  if (localStorage.getItem('voteData')) {
    var getStore = localStorage.getItem('voteData');
    getStore = JSON.parse(getStore);
    data.datasets[0].data = getStore;
  };
}

//IF FOUND, CONVERT ELEMENTS IN ARRAY BACK TO NUMBERALS.  BELOW, getStore IS THE STRING dataStore
//AFTER CONVERSION PUSH TO TRACKER.BURGARRAY[0].VOTES &C.
// var getStore = localStorage.getItem('voteData');
// JSON.parse(getStore) = data.datasets[0].data;


