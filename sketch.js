var PLAY=1 ;
var END=0 ;
var gameState=1 ;
var sword ;
var fruit ;
var monster ;
var enemyGroup ;
var monsterImage ;
var fruitsGroup ;
var fruit1 ;
var fruit2 ;
var fruit3 ;
var fruit4 ;
var fruitGroup ;
var score ;

function preload(){
  swordImage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  gameoverImage = loadImage("gameover.png");
}

function setup(){
   createCanvas(400,400) ;
  
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;
}

function draw(){
  background(220);
  
  text("Score : " + score ,300,50) ;
  
  if(gameState === PLAY){
    if(fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach() ;
      score = score + 2 ;
    }
    sword.y = World.mouseY;
    sword.x = World.mouseX; 
    
    enemy();
    fruits();
    
    if(enemyGroup.isTouching(sword)) {
      gameState = END ;
    }
  }
  else if (gameState === END) {
    enemyGroup.destroyEach() ;
    sword.addImage(gameoverImage);
    sword.scale = 1.3 ;
    sword.x = 200;
    sword.y = 200; 
    
  }
  drawSprites();
}

function fruits() {
  if(World.frameCount % 80===0) {
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2 ;
    //fruit.debug = true ;
    r = Math.round(random(1,4));
    if(r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,340));
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
  
}

function enemy() {
  if(World.frameCount % 200 === 0) {
    monster = createSprite(400,200,20,20);
    monster.addAnimation( "moving" , monsterImage );
    monster.y = Math.round(random(100,300));
    monster.velocityX = -8;
    monster.setLifetime = 50;
    
    enemyGroup.add(monster) ;
  }
}
