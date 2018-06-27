

function Weapon() {

   this.type = null; //Hammer, Pistol, Rifle, AssaultRifle, MiniGun

   this.mag_size = 0;
   this.fire_rate = 0;
}


function MovableObject(x, y) {

   this.x = x;
   this.y = y;


   this.afterMove = function(physObj) {
      //physObj
   }

}


function Player() {

   this.x = 5;
   this.y = 0;

   this.isAlive = true;

   this.angle = 0;

   this.weapons = [];
   this.activeWeapIndex = 0;


   this.moveUp = function() {
      this.y += 0.05;
      console.log(this.y);
   }
   this.moveDown = function() {
      this.y -= 0.05;
   }
   this.moveLeft = function() {
      this.x -= 0.05;
   }
   this.moveRight = function() {
      this.x += 0.05;
   }


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

      this.camX = 0, this.camY = 0;
      this.i = 0;

      console.log(this.blocks);

      var matter_ret = init_matter(document.body, this.blocks, this.player, conf);
      this.engine = matter_ret[0];
      this.render = matter_ret[1];

   }

   this.init(conf);

   this.run = function() {
      Engine.run(this.engine);
      Render.run(this.render);
   }

   $(document).keydown(function(event) {
      var keyDown = event.keyCode;

      //console.log('key pressed:', keyDown);
      var blk_len = this_.conf.block_len;

      var isMoving = ([87, 83, 65, 68].includes(keyDown)) ? true : false;
      if (isMoving) {

         var phys_player = Matter.Composite.get(this_.engine.world, 'player', 'body');
         this_.player.x = phys_player.position.x / blk_len;
         this_.player.y = phys_player.position.y / blk_len;
      }

      if (keyDown == 87) { //w
         this_.player.moveUp();
      }
      else if (keyDown == 83) { //s
         this_.player.moveDown();
      }

      else if (keyDown == 65) { //a
         this_.player.moveLeft();
      }
      else if (keyDown == 68) { //d
         this_.player.moveRight();
      }

      if (isMoving) {
         var newX = this_.player.x * this_.conf.block_len;
         var newY  = this_.player.y * this_.conf.block_len;

         Body.setPosition(phys_player, {x:newX, y:newY});

      }


      var bodies = Matter.Composite.allBodies(this_.engine.world);
      if (phys_player != null) {
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
      height : 600,

      block_len : 50,
      player_radius : 25
   };

   var game = new Game(conf);
   game.run();

});

