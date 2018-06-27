
var Engine = Matter.Engine,
    Render = Matter.Render,
    World  = Matter.World,
    Bodies = Matter.Bodies,
    Body   = Matter.Body;


function init_matter(canvas, blocks, player, conf) {

   var engine = Engine.create();


   var render = Render.create({
      element: canvas,
      engine : engine
   });


   var len = conf.block_len;
   var player_args = {id:'player'};
   //player_args.isStatic = true;
   var physPlayer = Bodies.circle(player.x*len, player.y*len, conf.player_radius, player_args);


   var physBlocks = [];

   for (var i in blocks) {
      var block = blocks[i];

      var xPos = block.x*len;
      var yPos = block.y*len;

      var block_args = {isStatic: true, id: parseInt(i)+1000};

      var physBlock = Bodies.rectangle(xPos, yPos, len, len, block_args);
      physBlocks.push(physBlock);

   }

   World.add(engine.world, physPlayer);
   World.add(engine.world, physBlocks);

   return [engine, render];
}

