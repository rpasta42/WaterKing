
function Point(x, y) {
   /*this.x = x;
   this.y = y;
   return this;*/
   return [x, y];
}


function pntLstContains(lst, item) {

   for (var i in lst) {
      if (item[0] == lst[i][0] && item[1] == lst[i][1])
         return i;

   }
   return -1;
}


function coordToBlock(x, y) {

   var new_x = (x / 50);
   var new_y = (y / 50);

   /*var x_rem = x % 50;
   var y_rem = y % 50;
   new_x -= x_rem;
   new_y -= y_rem;*/

   new_x = Math.floor(new_x);
   new_y = Math.floor(new_y);

   return Point(new_x, new_y);
}


function Editor(conf) {
   var this_ = this;

   this.conf = conf;

   this.mode = 'add';
   this.blocks = [];

   this.i = 0;

   this.draw = function() {
      var canvas = document.getElementById(this_.conf.canvas_id);

      if (this_.i++ % 5 == 0)
         $('#modeDisplay').text(this_.mode);

      if (canvas.getContext) {
         var ctx = canvas.getContext('2d');

         /*ctx.fillStyle = 'rgb(200, 0, 0)';
         ctx.fillRect(10, 10, 50, 50);

         ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
         ctx.fillRect(30, 30, 50, 50);*/

         ctx.clearRect(0, 0, conf.width, conf.height);

         for (var i in this_.blocks) {
            var blockCoord = this_.blocks[i];

            ctx.fillStyle = 'rgb(200, 0, 0)';
            ctx.fillRect(blockCoord[0]*50, blockCoord[1]*50, 50, 50);
         }

      }

   }

   this.run = function() {
      setInterval(this_.draw, this_.conf.run_interval);
   }

   $('#' + this_.conf.canvas_id).click(function(e) {
      var offset = $(this).offset();
      var canvasX = e.pageX - offset.left;
      var canvasY = e.pageY - offset.top;

      var x = canvasX, y = canvasY;

      console.log(x, y);

      var block_coord = coordToBlock(x, y);
      console.log(block_coord);

      var currPntI = pntLstContains(this_.blocks, block_coord);

      if (this_.mode == 'add') {
         if (currPntI == -1)
            this_.blocks.push(block_coord);
         else
            console.log('already added');

      }
      else if (this_.mode == 'rm') {
         if (currPntI == -1)
            ;
         else {
            this_.blocks.splice(currPntI, 1);
         }
      }

   });

   $('#addModeBtn').click(function() {
      this_.mode = 'add';
   });
   $('#rmModeBtn').click(function() {
      this_.mode = 'rm';
   });
   $('#exportBtn').click(function() {
      var exportTxt = '';
      for (var i in this_.blocks) {
         var item = this_.blocks[i];
         exportTxt += 'block,' + item[0] + ',' + item[1] + '.';
      }
      $('#exportVal').text(exportTxt);

   });

   return this;

}


$(function() {

   var conf = {
      run_interval : 100,
      canvas_id : 'canvas',
      width : 800,
      height : 500
   };

   var game = Editor(conf);

   game.run();

});

