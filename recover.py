import json
import os

transcript_path = r'C:\Users\Yui\.gemini\antigravity-ide\brain\4cfbd81f-73ce-4763-bb5f-ee8685950757\.system_generated\logs\transcript.jsonl'

files = [
    'components/Navbar.tsx',
    'components/Hero.tsx',
    'components/Experience.tsx',
    'components/Projects.tsx',
    'components/About.tsx',
    'components/Contact.tsx',
    'components/Footer.tsx',
    'app/layout.tsx',
    'app/page.tsx',
    'next.config.js'
]

file_contents = {}

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            if data.get('type') == 'TOOL_RESPONSE' and data.get('source') == 'SYSTEM':
                # Tool responses might contain the first view_file output
                content = data.get('content', '')
                if 'File Path:' in content and 'Showing lines 1 to ' in content:
                    # extract file path
                    for file in files:
                        if file in content.replace('\\', '/') and file not in file_contents:
                            # Extract lines
                            lines = content.split('The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.')[1]
                            lines = lines.split('The above content')[0]
                            
                            original_text = []
                            for l in lines.strip().split('\n'):
                                if ': ' in l:
                                    original_text.append(l.split(': ', 1)[1])
                                else:
                                    original_text.append(l)
                            
                            file_contents[file] = '\n'.join(original_text)
                            print(f"Found {file}")
        except Exception as e:
            pass

for k, v in file_contents.items():
    with open(f"recovered_{k.replace('/', '_')}", 'w', encoding='utf-8') as f:
        f.write(v)

print("Done")
