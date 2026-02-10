from PIL import Image
import os

icons = {
    "icon-16.png": 16,
    "icon-48.png": 48,
    "icon-128.png": 128
}

base_dir = "public/icons"

for filename, size in icons.items():
    path = os.path.join(base_dir, filename)
    try:
        with Image.open(path) as img:
            print(f"Resizing {filename} from {img.size} to {size}x{size}...")
            # Use ANTIALIAS if available (older Pillow), otherwise rely on default or LANCZOS if imported
            if hasattr(Image, 'Resampling'):
                resample = Image.Resampling.LANCZOS
            elif hasattr(Image, 'LANCZOS'):
                resample = Image.LANCZOS
            else:
                resample = Image.ANTIALIAS
            
            img_resized = img.resize((size, size), resample)
            img_resized.save(path, "PNG")
            print(f"Saved {filename}")
    except Exception as e:
        print(f"Error processing {filename}: {e}")
