var car,carImage;
var bgImage,road;
var gameOverImage,gameOver;
var score=0;
var gameState="PLAY";

function preload(){
  bgImage=loadImage("road.png");
  carImage=loadImage("blueCar.png");
  redCarImage=loadImage("redCar.png");
  pinkCarImage=loadImage("pinkCar.png");
  gameOverImage=loadImage("gameOver.png");
  carSound=loadSound("carSound.m4a");
  carCrash=loadSound("carCrash.mp3")
}

function setup() {
  createCanvas(400,500);
  
  

 road=createSprite(100,200,200,300);
 road.addImage("road",bgImage);
 road.velocityY=20;

 car=createSprite(300,300,20,20);
 car.addImage("car",carImage)
 car.scale=0.7;

 gameOver=createSprite(190,200,20,20);
 gameOver.addImage("gameOver",gameOverImage);

 leftBoundary=createSprite(0,0,100,800);
 leftBoundary.visible = false;
 
 //create right Boundary
 rightBoundary=createSprite(410,0,100,800);
 rightBoundary.visible = false;

 

  
 red=new Group();
pink=new Group();
 
}

function draw() {
  background("white");  


if(gameState==="PLAY"){
   
  carCrash.stop();
 
  gameOver.visible=false;

  road.velocityY=20;

  car.collide(leftBoundary);
  car.collide(rightBoundary);

  if(road.y>325){
    road.y=200;
}

redCars();
pinkCars();

score = score + Math.round(getFrameRate()/60);

if(keyDown("right")){
  car.x=car.x+10
}

if(keyDown("left")){
  car.x=car.x-10
}

if(car.isTouching(red)){
  carCrash.play();
  gameState="END";
 
}
if(car.isTouching(pink)){
  carCrash.play();
  gameState="END";
 
}


}
else if (gameState==="END"){




  gameOver.visible=true;
  //road.destroy();
  road.velocityY=0;
  car.velocityY=0
  red.destroyEach();
  pink.destroyEach();
  red.setVelocityYEach(0);
  pink.setVelocityYEach(0);
  red.setLifetimeEach(-1);
  pink.setLifetimeEach(-1);
}
 

 
if(gameState==="END" && keyDown("r")){
  
  gameState="PLAY";
  gameOver.visible=false;
  score=0;
}











  drawSprites();

  textSize(25)
fill("white");
stroke("black");
text("Score: "+ score, 25,50);


}

function redCars(){
  if (frameCount % 80 === 0) {
  
    var redCar=createSprite(600,20,20);
    redCar.x=Math.round(random(100,350));
    redCar.addImage("redcar",redCarImage)
    redCar.scale=0.7
    redCar.velocityY=10
    redCar.lifeTime=150
    red.add(redCar)
}
}

function pinkCars(){
  if (frameCount % 150 === 0) {
  
    var pinkCar=createSprite(600,20,20);
    pinkCar.x=Math.round(random(100,350));
    pinkCar.addImage("pinkCar",pinkCarImage)
    pinkCar.scale=0.7
    pinkCar.velocityY=10
    pinkCar.lifeTime=150
    pink.add(pinkCar)
}
}
