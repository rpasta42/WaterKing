
function Block(type, x, y) {
   var this_ = this;

   this.type = type;
   this.x = x;
   this.y = y;

   this.health = 100;

   this.debugPrint = function() {
      console.log('type:', this_.type,
                  'x:', this_.x, 'y:', this_.y,
                  'health:', this_.health);
   }

   return this;
}

function get_level() {
   var lvl_str='block,2,5.block,2,3.block,4,3.block,3,3.block,0,0.block,0,2.block,1,2.block,5,2.block,6,3.block,6,2.block,7,2.block,8,2.block,4,2.block,2,2.block,3,5.block,4,5.block,6,5.block,7,5.block,8,5.block,9,5.block,6,6.block,5,6.block,4,6.block,2,6.block,3,6.block,1,6.block,0,6.';

   var split_result = lvl_str.split('.');
   var lvl_blocks = [];

   for (var i in split_result) {
      var block_str = split_result[i];
      var str_lst = block_str.split(',');

      if (block_str == '')
         continue;

      var block = new Block(str_lst[0],
                            parseInt(str_lst[1]),
                            parseInt(str_lst[2]));
      //console.log('block:', block);
      //block.debugPrint();

      lvl_blocks.push(block);
   }

   return lvl_blocks;
}


