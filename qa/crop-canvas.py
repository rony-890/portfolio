import json
pos = {"x": 190, "y": 232, "w": 900, "h": 240}
from PIL import Image
img = Image.open(r"D:\PROTFOLIO WEBSITE\subhu-jb-portfolio\qa\hero-updated.png")
crop = img.crop((pos["x"], pos["y"], pos["x"]+pos["w"], pos["y"]+pos["h"]))
crop.save(r"D:\PROTFOLIO WEBSITE\subhu-jb-portfolio\qa\canvas-crop-updated.png")
print(f"Cropped: {pos['w']}x{pos['h']} at ({pos['x']}, {pos['y']})")