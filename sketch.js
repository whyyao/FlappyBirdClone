var myBird;
var canv;
var obtT=[];
var obtB=[];
var startButton;
var score=-2;
var scoreT;
var level1,level2,level3,level4;
var gap=200;
var obtSpeed=0;
var obtSpeedB=0;
var movingSpeed=-1.5;
var interval=150;
var imgBird;
var gravity=0.2;
var bg;
var ground;
var groundSpeed=1.5;
var groundX1=0;
var groundX2=335;
var groundX3=500;
var wingSound;
var hitSound;
var scoreSound;
var cnv;

function preload(){
  wingSound=loadSound("wingSound.mp3");
  hitSound=loadSound("hit.mp3");
  scoreSound=loadSound("score.mp3");
}
function setup() {
  imgBird=loadImage("bird.png");
  // imgBird.parent('bird');
  bg=loadImage("bg.png");
  ground=loadImage("ground.png");
  // startButton=createButton('START');
  // startButton.position(100,250);
  // startButton.mousePressed(myGameArea.start());
  myGameArea.start()
  cnv=createCanvas(500,500);
  colorMode(HSB,360,100,100);
  scoreT=createElement('p',"0");
  scoreT.style('font-family','sans-serif');
  scoreT.style('font-size','250%');
  scoreT.style('color','white');
  level1=createButton("EASY");
  // level1.position(550,170);
  level1.mousePressed(easy);
  // level1.parent('button');
  level2=createButton('MEDIUM');
  level2.mousePressed(medium);
  level3=createButton('HARD');
  level3.mousePressed(hard);
  level4=createButton('IMPOSSIBLE');
  level4.mousePressed(impossible);
  centerCanvas();
  // level1.parent('button');
}

function easy(){
  loop();
  score=-2;
  interval=150;
    var length=obtT.length;
  for (var i = 0; i < length ;i += 1) {
      obtT.splice(0,1);
      obtB.splice(0,1);
    }
    myGameArea.start();
    obtSpeed=0;
    obtSpeedB=0;
    movingSpeed=-1.5;
    gap=200;
    gravity=0.2;
}

function medium(){
  score=-2;
  loop();
  interval=150;
  var length=obtT.length;
  for (var i = 0; i < length ;i += 1) {
      obtT.splice(0,1);
      obtB.splice(0,1);
    }
  myGameArea.start();
  obtSpeed=1;
  obtSpeedB=1;
  movingSpeed=-1.5;
  gap=200;
  gravity=0.2;
}

function hard(){
  score=-2;
  loop();
  medium();
  interval=40;
  movingSpeed=-5;
  obtSpeedB=3;
    var length=obtT.length;
    for (var i = 0; i < length ;i += 1) {
      obtT.splice(0,1);
      obtB.splice(0,1);
    }
  gap=200;
  gravity=0.2
}

function impossible(){
  score=-2;
  loop();
  hard();
  movingSpeed=-6;
  gravity=0.4;
  gap=150;
     for (var i = 0; i < length ;i += 1) {
      obtT.splice(0,1);
      obtB.splice(0,1);
    }
  
}


function draw() {
  image(bg,0,0,bg.width*1.31,bg.height*1.31);
  image(bg,bg.width,0,bg.width*1.31,bg.height*1.31);
  groundX1-=groundSpeed;
  groundX2-=groundSpeed;
  groundX3-=groundSpeed;
  image(ground,groundX1,460);
  image(ground,groundX2,460);
  image(ground,groundX3,460);
  if (groundX1 < -330){
    groundX1=groundX3+ground.width;
  }
  if (groundX2 < -330){
    groundX2=groundX1+ground.width;
  }
  if (groundX3 < -330){
    groundX3=groundX2+ground.width;
  }
  myBird.update();
  myBird.jump();
  moreObts();
}

function moreObts(){
 var x, y;
    for (i = 0; i < obtT.length; i += 1) {
        if (myBird.isCrashed(obtT[i],obtB[i])){
            hitSound.play();
            myGameArea.stop();
            myBird.fall();
        }
        // if (myBird.pass(obtT[i],obtB[i])){
        //   score++;
        // }
    }
    // var newscore=float(score);
    // if((((newscore / 43.0)) % 1.0 == 0) && ((score/43)>0))
    //   {
    //   scoreT.html(score/43);
    //   // scoreSound.play();
    //   }
    

    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(interval)) {
        var newHeightT=random(0,myGameArea.canvasHeight-gap);
        var newHeightB=myGameArea.canvasHeight-gap-newHeightT;
        x = myGameArea.canvasWidth;
        y = myGameArea.canvasHeight - newHeightB;
        obtT.push(new obstaclesTop(newHeightT, x, 0,obtSpeed,movingSpeed));
        obtB.push(new obstaclesBottom(newHeightB,x,y,obtSpeed,movingSpeed));
        score++;
        if(score>0){
        scoreT.html(score);
        scoreSound.play();
        }
    }
    for (i = 0; i < obtT.length; i += 1) {
        obtT[i].update();
        obtB[i].update();
        if(obtT[i].x<-40){
          obtT.splice(i,1);
          obtB.splice(i,1);
        }
    }
    }

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

var myGameArea={
  start:function(){
    this.canvasWidth=500;
    this.canvasHeight=500;
    this.frameNo=0;
    myBird=new bird(100,120,0.2);
  },
  stop:function(){
    noLoop();
  }
  // clear: function() {
  //       this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  //   },
}

//d=diameter
function bird(x,y,gravity) {
  this.speedY=1;
  this.gravity=gravity;
  this.gravitySpeed=0;
  this.x=x;
  this.y=y;
  this.update=function(){
    image(imgBird,this.x,this.y,imgBird.width/3.5,imgBird.height/3.5);
    this.gravitySpeed+=this.gravity;
    this.y+=myBird.speedY+this.gravitySpeed;
  }
  this.jump=function(){
   if(keyIsPressed){
     myBird.gravitySpeed=-7;
     wingSound.play();
    // push();
    // translate(this.x+imgBird.width/2,this.y+imgBird.height/2);
    // rotate(PI/3.0);
    // image(imgBird,this.x,this.y,imgBird.width/3.5,imgBird.height/3.5);
    // pop();
  }
  
  }
  this.isCrashed=function(obtT,obtB){
    var birdbottom=this.y+(imgBird.height/3.5)-2;
    var birdtop=this.y+2;
    var birdleft=this.x+2;
    var birdright=this.x+(imgBird.width/3.5)-2;
    var crash=false;
    var obtTbottom=obtT.h;
    var obtBtop=myGameArea.canvasHeight-(obtB.h);
    if (birdright>obtT.x && birdleft<obtT.x+30){
       if (birdtop<obtTbottom || birdbottom>obtBtop){
          crash=true; 
         }
      // console.log(crash);
  }
    return crash;
  }
  this.pass=function(obtT,obtB){
    var birdbottom=this.y+(imgBird.height/3.5)-2;
    var birdtop=this.y+2;
    var birdleft=this.x+2;
    var birdright=this.x+(imgBird.width/3.5)-2;
    var pass=false;
    var obtTbottom=obtT.h;
    var obtBtop=myGameArea.canvasHeight-(obtB.h);
    if (birdright>obtT.x && birdleft<obtT.x+30){
       if (birdtop>obtTbottom || birdbottom<obtBtop){
          pass=true; 
         }
  }
    return pass;
  }
  this.fall=function(){
    this.gravity=5;
    movingSpeed=0;
  }
  }
  
//width:10, 
function obstaclesTop(h,x,y,sY,sX){
  this.h=h;
  this.x=x;
  this.y=y;
  this.speedX=sX;
  this.speedY=sY;
  this.update=function(){
    fill(120,100,100);
    rect(this.x,this.y,30,this.h);
    rect(this.x-5,this.y+this.h-20,40,20);
    this.x+=this.speedX;
      if(this.h<0 ||this.h>myGameArea.canvasHeight-gap){
      this.speedY=-this.speedY;
      }
    this.h+=this.speedY;
  }
}


function obstaclesBottom(h,x,y,sY,sX){
  this.h=h;
  this.x=x;
  this.y=y;
  this.speedX=sX;
  this.speedY=sY;
  this.update=function(){
    fill(120,100,100);
    rect(this.x,this.y,30,this.h);
    rect(this.x-5,this.y-20,40,20);
    this.x+=this.speedX;
    if(this.y>500 || this.y<gap){
      this.speedY=-this.speedY;
    }
    this.y+=this.speedY;
    this.h-=this.speedY;
  }
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  w=x+10;
  level1.position(w+50,y+height+50);
  level2.position(w+140,y+height+50);
  level3.position(w+250,y+height+50);
  level4.position(w+350,y+height+50);
  scoreT.position(x+width/2,y+50);
}

function windowResized(){
  centerCanvas();
}