


function render() {
    var bodies = Composite.allBodies(engine.world);

    window.requestAnimationFrame(render);

    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    for (var i = 0; i < bodies.length; i += 1) {
        var vertices = bodies[i].vertices;

        context.moveTo(vertices[0].x, vertices[0].y);
        for (var j = 1; j < vertices.length; j += 1)
            context.lineTo(vertices[j].x, vertices[j].y);
        context.lineTo(vertices[0].x, vertices[0].y);
    }

    context.lineWidth = 1;
    context.strokeStyle = '#999';
    context.stroke();
}
//render();


function init_matter(blocks, player) {
   var Engine = Matter.Engine,
       Render = Matter.Render,
       World  = Matter.World,
       Bodies = Matter.Bodies;

   var engine = Engine.create();

   var physBlocks = [];

   var physPlayer = Bodies.circle(player.x, player.y, 50, {id:'player'});


   for (var i in blocks) {
      var block = blocks[i];

      var xPos = block.x*50;
      var yPos = block.y*50;

      var physBlock = Bodies.rectangle(xPos, yPos, 50, 50, {isStatic: true, id: parseInt(i)+1000});
      physBlocks.push(physBlock);

   }

   World.add(engine.world, physPlayer);
   World.add(engine.world, physBlocks);

   return engine;
}

