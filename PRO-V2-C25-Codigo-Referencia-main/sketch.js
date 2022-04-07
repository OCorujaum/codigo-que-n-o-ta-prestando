const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies; //no geral todos usados para "abreviar",e para aplicar a função da matter na variavel em questão
const Constraint = Matter.Constraint;

var engine, world, backgroundImg,boat;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];
var AnimeBoat;
var DataBoat;
var ConnectionBoat=[];
var pos;





function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  DataBoat = loadJSON("./assets/boat/boat.json");
  AnimeBoat = loadImage("./assets/boat/boat.png");



}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, height - 50, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  
  var BoatFrame = DataBoat.frames;
  for(var n=0 ;n < BoatFrame.length; n++){
    pos = BoatFrame[n].position;
    var img = AnimeBoat.get(pos.x,pos.y,pos.w,pos.h);
    ConnectionBoat.push(img);


  }

 
}

function draw() {
  
  
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

 
  rect(ground.position.x, ground.position.y, width * 2, 1);
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();



  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisonBB(i);
    
  }

  cannon.display();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    if(ball.body.position.x >= width  || ball.body.position >= height-50){
      ball.remove(index);

    }
  }
}
function collisonBB(index){
  for(var n = 0; n < boats.length; n++){
    if(balls[index]!= undefined && boats[n]!= undefined){
      var collison = Matter.SAT.collides(balls[index].body,boats[n].body)
      if(collison.collided){
        boats[n].remove(n);
        Matter.World.remove(world,balls[index].body);
        delete balls[index]


      }

}  
}
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-100, -90, -110, -150];
      var position = random(positions);
      var boat = new Boat(width,height - 200, 170, 170, position,ConnectionBoat);

      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        });

        boats[i].display();
        boats[i].velocityAnimate();        
      } 
    }
  } else {
    var boat = new Boat(width, height - 145, 170, 170, 200,ConnectionBoat);
    boats.push(boat);
    
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

