class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    person1 = createSprite(displayWidth/5,displayHeight-700);
    person1.addImage(person1Img);
   person1.scale=0.2,0.2;

    person2 = createSprite(displayWidth/5,displayHeight-550);
    person2.addImage(person2Img);
    person2.scale=0.4,0.4;

    person3 = createSprite(displayWidth/5,displayHeight-450);
    person3.addImage(person3Img);
    person3.scale=(0.4,0.25);

    person4 = createSprite(displayWidth/5,displayHeight-300);
    person4.addImage(person4Img);
    person4.scale=0.3,0.4;

    people = [person1, person2, person3, person4];
    
  
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
   track1 = createSprite(800,100,displayWidth*5,20);
  track1.addImage(trackImg);

  track2 = createSprite(800,250,displayWidth*6,20);
  track2.addImage(trackImg);

   track3 = createSprite(800,400,displayWidth*7,20);
  track3.addImage(trackImg);

   track4 = createSprite(800,580,displayWidth*8,20);
  track4.addImage(trackImg);
  
  track5 = createSprite(800,760,displayWidth*9,20);
  track5.addImage(trackImg);

  ground= createSprite(300,displayHeight/2)
  ground.addImage(groundImg);
  ground.scale=(1.5,2.35)
  
  finish_line = createSprite(5000,displayHeight/2);
  finish_line.addImage(finish_lineImg);
  finish_line.scale = (3,4.5);

  textSize(30);
    fill("red");
        text("Your distance: "+score , 5250 , 60);
  // image(track,0,-displayHeight*5, displayWidth, displayHeight*4);   
      //index of the array
      var index = 0;

      //x and y position of the people
      var x=230 ;
      var y=0;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the people a little away from each other in x direction
        y = y + 170;
        //use data form the database to display the people in y direction
        x = displayHeight - allPlayers[plr].distance;
        people[index-1].x = x;
        people[index-1].y = y;

        if (index === player.index){
          stroke(11);
          fill("blue");
          ellipse(x,y,105,105);
          people[index - 1].shapeColor = "red";
        camera.position.x = people[index-1].x;
        camera.position.y = displayHeight/2;  
      }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance -=10;
      score +=10;
      
      player.update();
    }
 if(player.distance>5000){
     gameState=2;
     player.rank+=1;
      Player.updatePeopleAtEnd(player.rank);
 }
 if(score>4350){
  
  textSize(70);
  fill("blue");
  text("You won!", 5300, displayHeight/2)
}
 drawSprites();
  }
  end(){
    console.log("game ended");
    console.log(player.rank);
  }
}
