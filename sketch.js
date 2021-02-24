var ground,groundgroup,groundimg
var lava,lavagroup
var jumper,jumpergroup
var player,jumped=1,end
var level=1
var how=-2,menu=-1,select=0,playing=1,swapping=2,won=3,gamestate=menu
var edges
var coin1,coin2,coin3, coingroup
var coinsreq
var shape,deaths,mainbutton,home,homeimg,home2img
var playbutton,playbuttonbg
var howbutton,howbuttonbg
var none
var whj,whjimg
var timestart=0,time=0 ,timeend=0
var playerbg

function preload(){
  homeimg=loadImage("home.png")
  home2img=loadImage("home2.png")
  whjimg=loadImage("white hat.png")

}
function setup(){
  deaths=0
  createCanvas(800,600)
  whj =createSprite(400,100)
  whj.addImage(whjimg)
  whj.scale=0.3
  coingroup=createGroup()
  groundgroup=createGroup()
  lavagroup=createGroup()
  jumpergroup=createGroup()
  player=createSprite(-37.5,-500,25,50)
  player.shapeColor=rgb(0, 126, 151)
  playerbg=createSprite(-37.5,-500,28,53)
  playerbg.shapeColor="black"

  playersensor=createSprite(37.5,500,1,1)
  playersensor.visible=false
  playersensor.setCollider("rectangle",0,10,15,50,0)
  playersensor.debug=true
  end=createSprite(775,500,50,50)
  end.shapeColor="green"
  edges=createEdgeSprites()
  none=createSprite(0,0,0,0)
  

  howbuttonbg=createSprite(400,437.5,200,100)
  howbuttonbg.shapeColor="black"
  howbutton=createSprite(400,437.5,200,100)
  howbutton.shapeColor=rgb(0, 126, 151)

  playbuttonbg=createSprite(400,237.5,200,100)
  playbuttonbg.shapeColor="black"
  playbutton=createSprite(400,237.5,200,100)
  playbutton.shapeColor=rgb(0, 126, 151)

  mainbuttonbg=createSprite(775,12.5,53,28)
  mainbuttonbg.shapeColor="black"
  mainbutton=createSprite(775,12.5,50,25)
  mainbutton.shapeColor=rgb(0, 126, 151)
  home=createSprite(775,12.5,50,25)
  home.addImage(homeimg)

  coin1=createSprite(0,0,37.5,37.5)
  makecoin(coin1)

  coin2=createSprite(0,0,37.5,37.5)
  makecoin(coin2)

  coin3=createSprite(0,0,37.5,37.5)
  makecoin(coin3)
}
function draw(){
  background("white")
  playerbg.depth=player.depth-1
  playerbg.x=player.x
  playerbg.y=player.y
  if(player.visible===true){
    playerbg.visible=true
  }else{
    playerbg.visible=false
  }
  if(gamestate===playing){
    none.visible=false
    mainbutton.x=775
    mainbutton.y=12.5
    player.visible=true
    end.visible=true
    mainbuttonbg.visible=true
    home.visible=true
    home.addImage(homeimg)
    buttonscanner(mainbutton,mainbuttonbg,home)
    fill(rgb(0, 126, 151))
    rect(0,0,100,50)
    playerPhisics(5,10,0.6,0.5)
    coinchecker()
  } 
  if(gamestate===swapping){
    none.visible=false
    playbutton.visible=false
    playbuttonbg.visible=false
    howbutton.visible=false
    howbuttonbg.visible=false
    coinsreq=0
    coingroup.setVisibleEach(false)
    lavagroup.destroyEach()
    groundgroup.destroyEach()
    jumpergroup.destroyEach()
    mainbutton.width=50
    mainbutton.height=25
    mainbutton.x=775
    mainbutton.y=12.5
    mainbutton.visible=true
    mainbuttonbg.visible=true
    home.visible=true
    if(level===1){
      level1()
      
    } 
    if(level===2){
      level2()
    }
    if(level===3){
      level3()
    }
    if(level===4){
      level4()
    }
    if(level===5){
      level5()
    }
    if(level===6){
      level6()
    }
    if(level===7){
      level7()
    }
    if(level===8){
      level8()
    }
    if(level===9){
      level9()
    }
    player.x=37.5
    player.y=500
    player.velocityX=0
    player.velocityY=0
    gamestate=playing
    if(level===10){
      timeend=World.frameCount
      time=timeend-timestart
      time=time/30
      time=round(time*100)/100
      gamestate=won
      mainbutton.x=400
      mainbutton.y=337.5
      home.addImage(home2img)
      mainbutton.width=200
      mainbutton.height=100
    }else{
      mainbutton.x=775
      mainbutton.y=12.5
    }

  }
  if(gamestate===won){
    player.visible=false
    end.visible=false
    fill(rgb(0, 126, 151))
    rect(100,150,600,300)
    buttonscanner(mainbutton,mainbuttonbg,home)
  }
  
  if(gamestate===menu){
    mainbutton.visible=false
    mainbuttonbg.visible=false
    home.visible=false
    player.visible=false
    end.visible=false
    coinsreq=0
    coingroup.setVisibleEach(false)
    lavagroup.destroyEach()
    groundgroup.destroyEach()
    jumpergroup.destroyEach()
    whj.visible=true
    buttonscanner(playbutton,playbuttonbg,none)
    buttonscanner(howbutton,howbuttonbg,none)
  }else{
    whj.visible=false
  }
  if(gamestate===how){
    buttonscanner(mainbutton,mainbuttonbg,home)
    fill("black")
    textSize(12)
    text("To move you use the ARROW KEYS",15,15)
    fill("black")
    text("While in the air jump again to double jump",15,45)
    fill("green")
    text("Touch the green cube on the right to complete the level",15,75)


    fill("red")
    text("RED shapes are deadly THEY KILL YOU",15,105)

    fill("lightGreen")
    text("GREEN shapes are bouncy if you touch them you will BOUNCE HIGHER",15,135)

    fill(132,156,10)
    text("YELLOW shapes are coins you need to collect all of them to proceed",15,165)

    fill("orange")
    text("When the exit turns orange it means its locked, collect all the coins to unlock it",15,195)
  }
  drawSprites()
  if(gamestate===playing){
    textSize(12)
    fill("black")
    text("deaths: "+deaths,15,15)
    text("level: "+level,15,35)
  }
  //console.log()
  if(gamestate===won){
    
    textSize(50)
    fill("white")
    text("You died "+deaths+" times",170,200)
    text("Your time was "+time,140,240)
    text("seconds",225,275)
  }
  if(gamestate===menu){
    textSize(50)
    fill("white")
    text("PLAY",340,250)
    textSize(34)
    text("How to PLAY",300,450)
  }
  if(keyDown(16)&&keyDown("i")){
    textSize(12)
    info()
  }
  if(keyDown(16)&&keyWentDown(70)){
    level+=1
    gamestate=swapping
  }
}
function coinphisics(name){
  if(name.isTouching(player)){
    name.visible=false
    coinsreq-=1
  }
}
function coinchecker(){
  if(coin1.visible===true){
    coinphisics(coin1)
  }
  if(coin2.visible===true){
    coinphisics(coin2)
  }
  if(coin3.visible===true){
    coinphisics(coin3)
  }
}
function buttonscanner(name1,name2,name3){
  name2.x=name1.x
  name2.y=name1.y
  name2.width=name1.width+3
  name2.height=name1.height+3
name1.visible=true
name2.visible=true
name3.visible=true
  name3.x=name1.x
  name3.y=name1.y
  if(mouseIsOver(name1)){
    fill("yellow")
    stroke("yellow")
    rect(name1.x-3-name1.width/2,name1.y-3-name1.height/2,name1.width+6,name1.height+6)
    stroke("black")
    noStroke()
    if(mouseWentDown("left")){
      
      if(name1===mainbutton){
      gamestate=menu
      name1.visible=false
      name2.visible=false
      name3.visible=false
      }
      if(name1===playbutton){
        timestart=World.frameCount
        level=1
        deaths=0
        gamestate=swapping
        name1.visible=false
        name2.visible=false
        name3.visible=false
        howbutton.visible=false
        howbuttonbg.visible=false
        }
        if(name1===howbutton){
          gamestate=how
        name1.visible=false
        name2.visible=false
        name3.visible=false

        mainbutton.x=400
        mainbutton.y=337.5
        home.addImage(home2img)
        mainbutton.width=200
        mainbutton.height=100

        playbutton.visible=false
        playbuttonbg.visible=false
        }
    }
  }
}
function playerPhisics(speed,jumpHeight,gravity,drag){
  playersensor.x=player.x
  playersensor.y=player.y
  player.collide(groundgroup)
  player.collide(edges)
  player.velocityY+=gravity
  if(playersensor.isTouching(groundgroup)){
    jumped=1
    if(keyDown("up")){
      if(playersensor.isTouching(jumpergroup)){
        player.velocityY=-22
        jumped=0
      }else{
        player.velocityY=jumpHeight*-1
      }
    }
  }
  if(keyWentDown("up")&&!playersensor.isTouching(groundgroup)&&jumped==1){
    player.velocityY=jumpHeight*-1
    shape=createSprite(player.x,player.y+20,25,25)
    shape.shapeColor="purple"
    shape.lifetime=10
    jumped=0
  }

  if(keyDown("right")){
    player.velocityX=speed
  }
  if(player.velocityX>0){
    player.velocityX-=drag
  }
  if(keyDown("left")){
    player.velocityX=speed*-1
  }
  if(player.velocityX<0){
    player.velocityX+=drag
  }
  if(player.y>575){
    gamestate=swapping
    deaths+=1
  }
  if(player.isTouching(lavagroup)){
    deaths+=1
    gamestate=swapping
  }
  if(coinsreq==0){
    end.shapeColor="green"
    if(player.isTouching(end)){
      level+=1
      gamestate=swapping
    }
  }else{
    end.shapeColor="orange"
  }
}
function level1(){
  createGround(175,537.5,350,25)
  createGround(625,537.5,350,25)
}
function level2(){
  for(var i=0;i<3;i+=1){
  createLava(237.5+150*i,525,75,25,0)
  }
  createGround(400,537.5,1600,25)
}
function level3(){
  createLava(312.5,487.5,75,25,5)
  createLava(312.5,337.5,75,25,-5)

  createLava(512.5,487.5,25,75,5)
  createLava(512.5,337.5,25,75,-5)

  createGround(400,537.5,1600,25)
}
function level4(){
  createGround(50,537.5,100,25)

  createGround(162.5,512.5,25,75)
  createGround(162.5+75,512.5-25,25,125)
  createGround(162.5+150,512.5-50,25,175)

  createGround(175+225,512.5-75,50,225)

  createGround(162.5+250+225,512.5,25,75)
  createGround(162.5+175+225,512.5-25,25,125)
  createGround(162.5+100+225,512.5-50,25,175)
 
  createGround(750,537.5,100,25)
  
}
function level5(){
  
  createJumpBooster(162.5,512.5,75,25)
  createGround(100,537.5,200,25)
  createGround(50,187.5,100,25)
  createGround(325,187.5,150,25)
  createGround(325,400,25,400)

  createJumpBooster(487.5,512.5,75,25)
  createGround(487.5,537.5,75,25)

  createLava(187.5,187.5,175,25,3)
 
  createGround(750,187.5,100,25)

  createGround(750,537.5,100,25)
  
  movecoin(50,125,coin1)
  movecoin(750,125,coin2)
}
function level6(){
  createLava(187.5,437.5,175,25,-3)
  createLava(187.5+25,437.5,175,25,-3)
  createLava(187.5+50,437.5,175,25,-3)
  createLava(187.5+75,437.5,175,25,-3)

  createLava(187.5+100,437.5,25,175,-3)
  createLava(187.5+125,437.5,25,175,-3)
  createLava(187.5+150,437.5,25,175,-3)
  createLava(187.5+175,437.5,25,175,-3)

  createLava(187.5+200,437.5,175,25,-3)
  createLava(187.5+225,437.5,175,25,-3)
  createLava(187.5+250,437.5,175,25,-3)
  createLava(187.5+275,437.5,175,25,-3)

  createLava(187.5+300,437.5,25,175,-3)
  createLava(187.5+325,437.5,25,175,-3)
  createLava(187.5+350,437.5,25,175,-3)
  createLava(187.5+375,437.5,25,175,-3)

  createGround(400,537.5,1600,25)
  createGround(400,537.5-125,1600,25)
}
function level7(){
  createGround(100,537.5,200,25)
  createLava(100,337.5,25,140,3)
  movecoin(100,400,coin1)

  createGround(450,537.5,150,25)
  createLava(450,540,25,150,3)
  movecoin(450,500,coin2)

  createGround(400,137.5,1600,25)
  createGround(400,262.5,600,25)
  

  createGround(750,537.5,150,25)
  createGround(750,387.5,100,25)

  createLava(687.5,262.5,25,225,-3)
  movecoin(687.5,200,coin3)
}
function level8(){
  

  createLava(162.5,537.5,25,150,3)
  createLava(162.5,537.5,150,25,3)

  createLava(325,537.5,25,150,3)
  createLava(325,537.5,150,25,3)

  createLava(475,537.5,25,150,3)
  createLava(475,537.5,150,25,3)

  createLava(637.5,537.5,25,150,3)
  createLava(637.5,537.5,150,25,3)

  createLava(400,250,25,1000,-0.5)
  


  createGround(50,537.5,150,25)

  createGround(50+200,537.5,100,25)
  createGround(50+350,537.5,100,25)
  createGround(50+500,537.5,100,25)
  createGround(750,537.5,150,25)
}
function level9(){
  createGround(50,537.5,150,25)

  createGround(212.5,537.5,25,25)
  createGround(212.5+100,537.5,25,25)

  createGround(212.5+275,537.5,25,25)
  createGround(212.5+375,537.5,25,25)


  createGround(212.5-100,200,25,25)

  createGround(212.5,150,25,25)
  createGround(212.5+100,150,25,25)

  createGround(212.5+275,150,25,25)
  createGround(212.5+375,150,25,25)

  createGround(212.5+475,200,25,25)


  createLava(400,250,25,1000,-0.5)
  createLava(400,250,1000,25,-0.5)

  createLava(400,537.5,100,25,10)

  createLava(400,250,600,25,0)

  createLava(400,800,25,1000,0.5)
  createLava(400,800,1000,25,0.5)

  createLava(400,-75,25,500,0.5)
  createLava(400,-75,500,25,0.5)

  createJumpBooster(712.5,512.5,75,25)

  movecoin(212.5,312.5,coin1)
  movecoin(212.5+375,312.5,coin2)

  createGround(750,537.5,150,25)
}
function info(){
  for(var i=0;i<33;i+=1){
    line(0+i*25,0,0+i*25,700)
  }
  for(var i=0;i<24;i+=1){
    line(0,0+i*25,800,0+i*25)
  }
  fill("blue")
  text("mouse X:"+World.mouseX,15,15)
  text("mouse Y:"+World.mouseY,15,40)
}
function createGround(x,y,width,height){
  ground=createSprite(x,y,width,height)
  ground.shapeColor="black"
  groundgroup.add(ground)
}
function createLava(x,y,width,height,spin){
  lava=createSprite(x,y,width,height)
  lava.shapeColor="red"
  lava.rotationSpeed=spin
  
  lavagroup.add(lava)
  
}
function createJumpBooster(x,y,width,height){
  jumper =createSprite(x,y,width,height)
  jumper.shapeColor="lightGreen"
  jumpergroup.add(jumper)
}
function makecoin(name){
  name.shapeColor="yellow"
  name.visible=false
  coingroup.add(name)
}
function movecoin(x,y,name){
  coinsreq+=1
  name.x=x
  name.y=y
  name.visible=true
}