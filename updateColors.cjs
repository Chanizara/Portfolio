const fs = require('fs');
const path = require('path');

const colorMap = {
  '#00ff88': '#ff00ff', // Pink
  '#00cc6a': '#cc00cc',
  '#007744': '#990099',
  '#4ecdc4': '#00e5ff', // Blue
  '#2a9d94': '#00b8cc',
  '#1e7a73': '#008b99',
  '#ffd700': '#9d00ff', // Purple
  '#fff176': '#d946ef',
  '#fff9c4': '#fbcfe8',
  '#ff6b35': '#ff00a0',
  '#a855f7': '#b5179e',
  '#0a0a1a': '#0f0518',
  '#030814': '#140626',
  '#050510': '#080112',
  '#1e3a5f': '#4c1d95',
  '#3d6080': '#8b5cf6',
  '#050f1e': '#130624',
  '0, 255, 136': '255, 0, 255', // rgb variations
  '78, 205, 196': '0, 229, 255',
  '255, 215, 0': '157, 0, 255',
  '168, 85, 247': '181, 23, 158',
  'glow-green': 'glow-pink',
  'glow-gold': 'glow-purple',
  'glow-cyan': 'glow-blue',
  'pixel-border-gold': 'pixel-border-purple-accent',
  'pixel-border-cyan': 'pixel-border-blue-accent',
};

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.css') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      for (const [oldC, newC] of Object.entries(colorMap)) {
        // case insensitive replace for hex codes
        const regex = new RegExp(oldC, 'gi');
        if (regex.test(content) || content.includes(oldC)) {
          content = content.replace(regex, newC);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log('Modified', fullPath);
      }
    }
  }
}

walk('./src');
console.log("Done updating colors!");
