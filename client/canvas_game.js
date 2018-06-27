

function Weapon() {

   this.type = null; //Hammer, Pistol, Rifle, AssaultRifle, MiniGun

   this.mag_size = 0;
   this.fire_rate = 0;
}

function Player() {

   this.x = 0;
   this.y = 0;

   this.isAlive = true;

   this.angle = 0;

   this.weapons = [];
   this.activeWeapIndex = 0;


   this.draw = function() {
      var drawing = new Image();
      drawing.src = "assets/character.png";
      drawing.onload = function() {

      }

   }

   return this;
}


function Game(conf) {
   var this_ = this;

   this.init = function (conf) {

      this.conf = conf;

      this.blocks = get_level();
      this.player = new Player();
      this.phys_eng = init_matter(this.blocks, this.player);

      this.camX = 0, this.camY = 0;
      this.i = 0;

      console.log(this.blocks);

      //START CANVAS INIT STUFF
      var canvas = document.getElementById(this.conf.canvas_id);
      canvas.width = conf.width;
      canvas.height = conf.height;
      if (!canvas.getContext)
         alert('Could not obtain context');
      var ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.ctx = ctx;
      //END CANVAS INIT STUFF

   }

   this.init(conf);
   var canvas = this.canvas;
   var ctx = this.ctx;

   this.draw = function() {

      ctx.clearRect(0, 0, conf.width, conf.height);

      if (this_.i++ % 10 == 0) {
         Matter.Engine.update(this_.phys_eng);
      }
      var bodies = Matter.Composite.allBodies(this_.phys_eng.world);

      if (this_.i == 5) console.log('kk:', bodies);

      ctx.fillStyle = '#afa';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();

      for (var i = 0; i < bodies.length; i++) {
         var body = bodies[i];
         //if (body.label != 'Rectangle Body')
         //   continue;

         var vertices = body.vertices;
         ctx.moveTo(vertices[0].x, vertices[0].y);
         for (var j = 1; j < vertices.length; j++) {
            ctx.lineTo(vertices[j].x, vertices[j].y);
         }
         ctx.lineTo(vertices[0].x, vertices[0].y);
      }
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#999';
      ctx.stroke();

      /////


      for (var i in this_.blocks) {
         var block = this_.blocks[i];

         ctx.fillStyle = 'rgb(200, 0, 0)';

         var xPos = block.x*50+this_.camX;
         var yPos = block.y*50+this_.camY;

         ctx.fillRect(xPos, yPos, 50, 50);

         //console.log('drawing', this_.blocks.length);
         //block.debugPrint();

      }

   }

   this.run = function() {
      setInterval(this_.draw, this_.conf.run_interval);
   }


   $(document).keydown(function(event) {
      var keyDown = event.keyCode;

      //console.log('key pressed:', keyDown);

      if (keyDown == 87) { //w
         this_.camY += 1;
      }
      if (keyDown == 83) { //s
         this_.camY -= 1;
      }

      else if (keyDown == 65) { //a
         this_.camX -= 1;
      }
      else if (keyDown == 68) { //d
         this_.camX += 1;
      }

      var bodies = Matter.Composite.allBodies(this_.phys_eng.world);
      var play = Matter.Composite.get(this_.phys_eng.world, 'player', 'body');
      if (play != null) {
         play.x = this_.camX;
         play.y = this_.camY;
      }

   });

   return this;
}


$(function() {

   //var Ex = Example.sprites();

   var conf = {
      run_interval : 40,
      canvas_id : 'canvas',
      width : 800,
      height : 600
   };

   var game = new Game(conf);
   game.run();

});

