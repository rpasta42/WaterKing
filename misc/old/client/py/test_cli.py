import time
import Box2D  # The main library
# Box2D.b2 maps Box2D.b2Vec2 to vec2 (and so on)
from Box2D.b2 import (world, polygonShape, staticBody, dynamicBody)
import sys, os


# --- constants ---
# Box2D deals with meters, but we want to display pixels,
# so define a conversion factor:
PPM = 20.0  # pixels per meter
TARGET_FPS = 60
TIME_STEP = 1.0 / TARGET_FPS
SCREEN_WIDTH, SCREEN_HEIGHT = 640, 480


# --- pybox2d world setup ---
# Create the world
world = world(gravity=(0, -10), doSleep=True)

# And a static body to hold the ground shape
ground_body = world.CreateStaticBody(
    position=(0, 1),
    shapes=polygonShape(box=(50, 5)),
)

'''
# Create a dynamic body
dynamic_body = world.CreateDynamicBody(position=(10, 15), angle=15)

# And add a box fixture onto it (with a nonzero density, so it will move)
box = dynamic_body.CreatePolygonFixture(box=(2, 1), density=1, friction=0.3)
'''
#body = world.CreateDynamicBody(position=(20, 45))
#circle = body.CreateCircleFixture(radius=0.5, density=1, friction=0.3)

body = world.CreateDynamicBody(position=(20, 35))
circle = body.CreatePolygonFixture(box=(3,1), density=1, friction=0.3)


for x in range(0, 10):
   body = world.CreateDynamicBody(position=(30-x*2, 35+x*10), angle=15)
   box = body.CreatePolygonFixture(box=(2, 1), density=1, friction=0.3)


body = world.CreateDynamicBody(position=(30, 35), angle=15)
box = body.CreatePolygonFixture(box=(2, 1), density=1, friction=0.3)

body = world.CreateDynamicBody(position=(30, 25), angle=15)
box = body.CreatePolygonFixture(box=(2, 1), density=1, friction=0.3)


body = world.CreateDynamicBody(position=(10, 15), angle=45)
box = body.CreatePolygonFixture(box=(2, 1), density=1, friction=0.3)


colors = {
    staticBody: (255, 255, 255, 255),
    dynamicBody: (127, 127, 127, 255),
}

SLEEP_TIME = 0.01
zz = 0

#def kk_draw(color, verts):
def kk_draw(vert_lst):
   '''global zz
   zz += 1
   if zz % 1 == 0:
      pass
   else:
      return
   '''
   os.system('clear')

   verts = []

   for vert_shape in vert_lst:
      verts += vert_shape

   #print(verts)
   new_verts = []

   range1 = range(0, 30)
   range2 = range(-55, 55)
   div_num = 20

   #range1 = range(0, 100)
   #range2 = range(-105, 105)
   #div_num = 10

   for vert in verts:
      x, y = vert
      x = x/div_num
      y = y/div_num
      new_verts.append((int(x), int(y)))

   #return


   for y in range1:
      line = ''

      for x in range2:
         if (x, y) in new_verts:
            line += 'x'
            #sys.stdout.write('x')
         else:
            #sys.stdout.write('-')
            line += ' '

      print(line)
      #sys.stdout.write('\n')


   #print(verts)
   #print(zz, new_verts)

   print('============')

   time.sleep(SLEEP_TIME)
   pass

while True:
   # Draw the world

   vert_lst = []
   for body in world.bodies: #(ground_body, dynamic_body):  # or: world.bodies
      # The body gives us the position and angle of its shapes

      for fixture in body.fixtures:
         # The fixture holds information like density and friction,
         # and also the shape.
         shape = fixture.shape

         # Naively assume that this is a polygon shape. (not good normally!)
         # We take the body's transform and multiply it with each
         # vertex, and then convert from meters to pixels with the scale
         # factor.
         vertices = [(body.transform * v) * PPM for v in shape.vertices]

         # But wait! It's upside-down! Pygame and Box2D orient their
         # axes in different ways. Box2D is just like how you learned
         # in high school, with positive x and y directions going
         # right and up. Pygame, on the other hand, increases in the
         # right and downward directions. This means we must flip
         # the y components.
         vertices = [(v[0], SCREEN_HEIGHT - v[1]) for v in vertices]

         vert_lst.append(vertices)
         #kk_draw(colors[body.type], vertices)

   kk_draw(vert_lst)
   world.Step(TIME_STEP, 10, 10)


