import os
import json
from PIL import Image, ImageOps
import shutil

# Directories
ORIGINAL_DIR = 'high_res_pics'
HIGH_RES_DIR = 'high_res_pics'
LOW_RES_DIR = 'low_res_pics'
LOW_RES_WIDTH = 400

# Ensure directories exist
os.makedirs(LOW_RES_DIR, exist_ok=True)

# File to store JavaScript array data
output_file = 'data.txt'

# Supported image extensions
VALID_EXTENSIONS = ('.jpg', '.jpeg', '.png')

# Open file to write JavaScript array
with open(output_file, 'w') as f:
    # Write the start of the array
    f.write('const imageUrls = [\n')
    
    # Process each image in the original directory
    first = True
    for filename in os.listdir(ORIGINAL_DIR):
        if filename.lower().endswith(VALID_EXTENSIONS):
            # Open the image
            img_path = os.path.join(ORIGINAL_DIR, filename)
            with Image.open(img_path) as img:
                # Correct orientation based on EXIF data
                img = ImageOps.exif_transpose(img)

                # Get original dimensions for resizing
                original_width, original_height = img.size
                
                # Resize for low-res
                aspect_ratio = original_height / original_width
                new_height = int(LOW_RES_WIDTH * aspect_ratio)
                low_res_img = img.resize((LOW_RES_WIDTH, new_height), Image.Resampling.LANCZOS)
                
                # Get low-res dimensions
                low_res_width, low_res_height = low_res_img.size
                
                # Save low-res image
                low_res_path = os.path.join(LOW_RES_DIR, filename)
                low_res_img.save(low_res_path, quality=85)
                
                # Write JavaScript array entry with dimensions
                if not first:
                    f.write(',\n')
                f.write(f'    {{ lowRes: "{LOW_RES_DIR}/{filename}", highRes: "{HIGH_RES_DIR}/{filename}", width: {low_res_width}, height: {low_res_height} }}')
                first = False
    
    # Write the end of the array
    f.write('\n];')

print("Image processing complete. JavaScript array data written to data.txt")