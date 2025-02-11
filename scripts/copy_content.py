import os
import shutil
from pathlib import Path

def extract_language(filename, dir_path):
    # Cek format index.[lang].md
    if filename.startswith('index.') and filename.endswith('.md'):
        parts = filename.split('.')
        if len(parts) == 3:
            return parts[1]
    # Cek format [nama_folder].[lang].md
    dir_name = os.path.basename(dir_path)
    if filename.startswith(f"{dir_name}.") and filename.endswith('.md'):
        lang_part = filename[len(dir_name)+1:-3]
        if '.' not in lang_part:
            return lang_part
    return None

def copy_and_transform(source_dir, output_dir):
    source = Path(source_dir)
    output = Path(output_dir)
    languages = set()

    # Proses file dan kumpulkan bahasa
    for root, dirs, files in os.walk(source):
        rel_dir = os.path.relpath(root, source)
        current_langs = set()
        
        # Proses file markdown
        for file in [f for f in files if f.endswith('.md')]:
            lang = extract_language(file, root)
            src_path = Path(root) / file
            
            if lang:
                current_langs.add(lang)
                languages.add(lang)
                dest = output / lang / rel_dir / "index.md"
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy(src_path, dest)
            else:
                dest = output / rel_dir / file
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy(src_path, dest)
        
        # Proses aset
        for file in [f for f in files if not f.endswith('.md')]:
            for lang in current_langs:
                dest = output / lang / rel_dir / file
                shutil.copy(Path(root) / file, dest)
    
    # Pastikan semua direktori dibuat untuk semua bahasa
    for root, dirs, _ in os.walk(source):
        rel_dir = os.path.relpath(root, source)
        for lang in languages:
            (output / lang / rel_dir).mkdir(parents=True, exist_ok=True)

if __name__ == '__main__':
    copy_and_transform('./blog', './blog')