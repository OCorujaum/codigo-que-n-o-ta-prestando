class Boat {
  constructor(x, y, width, height, boatPos,animation) {
  
    this.body = Bodies.rectangle(x, y, width, height);
    this.width = width;
    this.height = height;
    this.animation = animation;
    this.speed = 0.05;


    this.image = loadImage("./assets/boat.png");
    this.boatPosition = boatPos;
    World.add(world, this.body);
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    var index = floor(this.speed%this.animation.length);//o % usa para dividir até dar um numero inteiro para assim então o dividir

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.animation[index] , this.boatPosition, this.width, this.height);
    pop();
    
  }
  remove(i) {
    setTimeout(()=>{
     Matter.World.remove(world,boats[i].body);
     delete boats[i];

    },2000)


  }
  velocityAnimate(){
    this.speed+=0.05;



  }
}
