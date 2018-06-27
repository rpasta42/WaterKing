

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


function Player(move_amount) {

   this.x = 5;
   this.y = 0;

   this.isAlive = true;

   this.angle = 0;

   this.weapons = [];
   this.activeWeapIndex = 0;

   this.move_amount = move_amount;

   this.moveUp = function() {
      //this.y += 0.05;
      //console.log(this.y);
   }
   this.moveDown = function() {
      //this.y -= 0.05;
   }
   this.moveLeft = function() {
      this.x -= this.move_amount;
   }
   this.moveRight = function() {
      this.x += this.move_amount;
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
      this.player = new Player(conf.player_move_amount);
      this.key_states = {};
      this.frames_since_last_jump = 101;

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
      setInterval(this.step, this.conf.run_interval);
   }

   $(document).keydown(function(event) {
      this_.key_states[event.keyCode || e.which] = true;
   });
   $(document).keyup(function(event) {
      this_.key_states[event.keyCode || e.which] = false;
   });

   this.step = function() {
      //console.log('key pressed:', keyDown);
      this_.frames_since_last_jump++;

      var blk_len = this_.conf.block_len;

      var key_states = this_.key_states;
      var key_codes = Object.keys(key_states);
      var pressed_keys = key_codes.filter(code => this_.key_states[code] == true);
      var isMoving = (pressed_keys.length > 0) ? true : false;

      if (isMoving) {
         var phys_player = Matter.Composite.get(this_.engine.world, 'player', 'body');
         this_.player.x = phys_player.position.x / blk_len;
         this_.player.y = phys_player.position.y / blk_len;
      }

      if (key_states[87]) { //w
         //this_.player.moveUp();
         if (this_.frames_since_last_jump < this_.conf.num_frames_for_jump)
            return;
         this_.frames_since_last_jump = 0;
         var phys_pos = phys_player.position;

         console.log('jumping', phys_player);
         var apply_from = {x:phys_pos.x, y:phys_pos.y + 1};
         Body.applyForce(phys_player, apply_from, {x:0, y:-0.06});
      }
      else if (key_states[83]) { //s
         this_.player.moveDown();
      }

      else if (key_states[65] || key_states[37]) { //a or <-
         this_.player.moveLeft();
      }
      else if (key_states[68] || key_states[39]) { //d or ->
         this_.player.moveRight();
      }

      if (isMoving && !key_states[87]) {
         var newX = this_.player.x * this_.conf.block_len;
         var newY  = this_.player.y * this_.conf.block_len;

         Body.setPosition(phys_player, {x:newX, y:newY});

      }


      var bodies = Matter.Composite.allBodies(this_.engine.world);
      if (phys_player != null) {
      }

   };

   return this;
}


$(function() {

   //var Ex = Example.sprites();

   var conf = {
      //run_interval : 50, //25 frames per second
      run_interval : 25, //40 frames per second
      player_move_amount : 0.08,
      canvas_id : 'canvas',
      width : 800,
      height : 600,

      block_len : 50,
      player_radius : 24,

      //# of frames needed to elapse between jumps
      //num_frames_for_jump : 10 //double jump at 50 run_interval
      //num_frames_for_jump : 20 //single jump @ 50 run_interval
      num_frames_for_jump : 40 //single jump @ 25 run_interval


   };

   var game = new Game(conf);
   game.run();

});

