
//global variables
var ship ,water;
var shipImg , bgImg , waterImg , helicopterImg , bombImg, gameOverImg;
var score;

var helicopterGroup , bombGroup ; 
var PLAY =1;
var END = 0;
var gamestate = PLAY ;


function preload(){

    //loading images

    shipImg = loadAnimation("images/ship.png" , "images/ship2.png", "images/ship.png");
    bgImg =loadImage("images/skybg.jpg");
    waterImg = loadImage ("images/waterbg.png");
    helicopterImg = loadImage("images/helicopter.png");
    bombImg = loadImage("images/bomb.png");
    gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
    //creating canvas size
    createCanvas(800,500);
  
    //creating water-sprite background and adding image to it
    water = createSprite(400,380,20,20);
    water.addImage("water", waterImg);


    //creating groups for similar sprites
    bombGroup = new Group();
    helicopterGroup = new Group();

    //slower speed of animation
    shipImg.frameDelay= 10;


    //water.debug = true;
    //console.log(water.width);


    //creating ship and adding two images on one sprite
    ship = createSprite(500,350,30,20);
    ship.addAnimation("ship",shipImg);
    ship.addImage("gameOver",gameOverImg);
    ship.scale =0.4;

    score = 0;



}

function draw(){
    
    //settin backdrop image
    background(bgImg);



    if (gamestate === PLAY){

        //increasing score
        score = Math.round(frameCount/6);

        // infinte water movement
        water.x = water.x - 3;
        if(water.x<400){
            water.x = water.width/2;
        }


        //controlling the ship movements
        if(keyDown(LEFT_ARROW) && ship.x > 80){
            ship.x = ship.x -5 ;
        }
        if(keyDown(RIGHT_ARROW) && ship.x < 700){
            ship.x = ship.x + 5 ;
        }
        
        spawnHelicopter();

        if(ship.isTouching(bombGroup)){
            gamestate = END;
        }
          

    }

    if (gamestate === END){

        water.velocityX = 0;

        //destroying all sprites to avoid memory leak
       bombGroup.destroyEach();
       helicopterGroup.destroyEach();

       //changin the image of ship to gameover
        ship.changeAnimation("gameOver",gameOverImg);

        //bringing the image in center
        ship.x = 400;

    }
    //text display
    textSize(20);
    fill("yellow");
    text("score  :  "+ score ,600,50);
    
    drawSprites();

}
//function draw ends ...


function spawnHelicopter(){
     
    // % gives the remainder - used to create gaps in two helicopter
    if (frameCount % 200 == 0){

          //for helicopter random position
        var xPos = (Math.round(random(50,750)));
        var helicopter = createSprite(xPos, 40 ,20 ,20);
        helicopter.addImage("helicopter",helicopterImg);
        helicopter.scale =0.5;
        helicopter.velocityX = -5;
        helicopterGroup.add(helicopter);
        
        //assing lifetime to destroy the sprite after these many frames are done
        helicopter.lifetime = 160;


        var bomb = createSprite(helicopter.x , 40 ,20,20);
        bomb.addImage("bomb",bombImg);
        bomb.scale = 0.1;
        bomb.velocityY = 5;
        bombGroup.add(bomb);
        bomb.lifetime = 100;

    }
    
}