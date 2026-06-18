const fs = require('fs');

const transcriptPath = 'C:\\Users\\Yui\\.gemini\\antigravity-ide\\brain\\4cfbd81f-73ce-4763-bb5f-ee8685950757\\.system_generated\\logs\\transcript.jsonl';

const files = [
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
];

const fileContents = {};

const content = fs.readFileSync(transcriptPath, 'utf8');
const lines = content.split('\n');

for (const line of lines) {
    if (!line) continue;
    try {
        const data = JSON.parse(line);
        if (data.type === 'TOOL_RESPONSE' && data.source === 'SYSTEM') {
            const text = data.content || '';
            if (text.includes('File Path:') && text.includes('Showing lines 1 to ')) {
                for (const file of files) {
                    if (text.replace(/\\/g, '/').includes(file) && !fileContents[file]) {
                        let parts = text.split('The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.');
                        if (parts.length > 1) {
                            let extracted = parts[1].split('The above content')[0].trim();
                            let originalText = [];
                            for (let l of extracted.split('\n')) {
                                let match = l.match(/^\d+:\s(.*)/);
                                if (match) {
                                    originalText.push(match[1]);
                                } else {
                                    originalText.push(l.replace(/^\d+:/, ''));
                                }
                            }
                            fileContents[file] = originalText.join('\n');
                            console.log('Found ' + file);
                        }
                    }
                }
            }
        }
    } catch (e) {
    }
}

for (const [k, v] of Object.entries(fileContents)) {
    fs.writeFileSync('recovered_' + k.replace(/\//g, '_'), v);
}
console.log('Done');
