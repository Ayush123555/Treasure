var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameover, gameover_display;
//Game States
var PLAY=1;
var END=0;
var gameState=1;
var restart, restart_img;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  gameover_display=loadImage("gameover-removebg-preview.png");
 restart_img=loadImage("restart-removebg-preview (1).png")
}

function setup(){
  
  createCanvas(windowWidth,windowHeight+700);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 6;


//creating boy running
boy = createSprite(width/2,height,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.15;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

  gameover=createSprite(width/2,height/2,50,20);
  gameover.addImage(gameover_display);
  gameover.visible=false;
   restart=createSprite(width/2,height/2+150,10,10);
 restart.addImage(restart_img);
  restart.visible=false
 
}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+25;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+50;

      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
         gameover.visible=true;
         gameover.scale=3
        restart.visible=true
       boy.addAnimation("Sahilrunning",endImg);
        boy.x=width/2;
        boy.y=height;
        
        cashG.destroyEach();
        cashG.setVelocityYEach(0);
    
        jwelleryG.destroyEach();
        jwelleryG.setVelocityYEach(0);
    
        swordGroup.destroyEach();
        swordGroup.setVelocityYEach(0);
      
        diamondsG.destroyEach();
        diamondsG.setVelocityYEach(0);
       treasureCollection=0;
       
        if(mousePressedOver(restart)){
          gamereset();
        }
      }
  }
  
  drawSprites();
  textSize(20);
  fill("red");
  stroke("white");
   textSize(50); 
  text("Treasure: "+ treasureCollection,width/2.3,100);
  }

}

function createCash() {
  if (World.frameCount % 400 == 0) {
  var cash = createSprite(Math.round(random(200, width-200),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.39;
  cash.velocityY = 3;
  cash.lifetime = height;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 500 == 0) {
  var diamonds = createSprite(Math.round(random(200,width-200),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.12;
  diamonds.velocityY = 3;
  diamonds.lifetime = height;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 550 == 0) {
  var jwellery = createSprite(Math.round(random(200, width-200),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.39;
  jwellery.velocityY = 3;
  jwellery.lifetime = height;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 650 == 0) {
  var sword = createSprite(Math.round(random(200, width-200),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.39;
  sword.velocityY = 3;
  sword.lifetime = height;
  swordGroup.add(sword);
  }
}


function gamereset (){
  gameState=PLAY;
  
  gameover.visible=false
  restart.visible=false
  cashG.destroyEach();
  jwelleryG.destroyEach();
  swordGroup.destroyEach();
  diamondsG.destroyEach();
 boy.changeAnimation("SahilRunning",boyImg)
  boy.x=width/2;
  boy.y=height;
 path.velocityY=0;
  treasureCollection=0;
}