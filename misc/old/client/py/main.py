import pygame
from pygame.locals import *
import sys, time

sys.path.append('~/projects/pygames/')
pyganim.init()

windowSurface = pygame.display.set_mode((320, 240), 0, 32)
pygame.display.set_caption('WaterKing')

charAnim = pyganim.PygAnimation(

