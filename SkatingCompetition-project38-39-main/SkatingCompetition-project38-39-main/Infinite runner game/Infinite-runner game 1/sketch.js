var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var ground,groundImg;
var finish_line,finish_lineImg;
var people, person1, person2, person3, person4;
var person1Img, person2Img, person3Img, person4Img;
var track1,track2,track3,track4,track5,trackImg;
var obstacle1, obstacle2, obstacle3, obstacle4;

var score=0;
function preload(){
person1Img = loadImage("images/SkatingPerson1.png");
person2Img = loadImage("images/SkatingPerson2.png");
person3Img = loadImage("images/SkatingPerson3.png");
person4Img = loadImage("images/SkatingPerson4.png");
trackImg = loadImage("images/road.png");
groundImg = loadImage("images/Ground.png");
finish_lineImg = loadImage("images/FinishLine.png");

}
function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();


}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState===2){
    game.end();
  }
 
}
