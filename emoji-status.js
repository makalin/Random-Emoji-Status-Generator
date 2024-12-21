#!/usr/bin/env node
const { app, BrowserWindow } = require('electron');
const path = require('path');
const readline = require('readline');

// Define emoji themes
const themes = {
  'work_mood': {
    emojis: ['💻', '📊', '📈', '☕', '📱', '📗', '🎯', '⏰', '📅', '✍️', '💡', '🔍'],
    prefixes: ['In a meeting', 'Coding', 'Debugging', 'Planning', 'Learning', 'Focusing'],
    suffixes: ['mode', 'grind', 'sprint', 'session', 'time']
  },
  'weekend_vibes': {
    emojis: ['🎮', '🎉', '🌴', '🏖️', '🎨', '🎭', '🎪', '🎠', '🎡', '🎢', '🎪', '🎭'],
    prefixes: ['Chilling', 'Relaxing', 'Vibing', 'Living', 'Enjoying', 'Exploring'],
    suffixes: ['mood', 'life', 'moments', 'times', 'adventures']
  },
  'food_mood': {
    emojis: ['🍕', '🍔', '🌮', '🍜', '🍣', '🍙', '🍪', '🍩', '🍰', '☕', '🍵', '🧋'],
    prefixes: ['Hungry', 'Eating', 'Cooking', 'Craving', 'Snacking', 'Feasting'],
    suffixes: ['time', 'mode', 'break', 'adventure', 'session']
  }
};

// Status generator class
class StatusGenerator {
  constructor() {
    this.themes = themes;
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  generateStatus(theme = 'work_mood') {
    const selectedTheme = this.themes[theme];
    if (!selectedTheme) {
      throw new Error('Theme not found');
    }

    const emoji = this.getRandomElement(selectedTheme.emojis);
    const prefix = this.getRandomElement(selectedTheme.prefixes);
    const suffix = this.getRandomElement(selectedTheme.suffixes);
    
    return `${emoji} ${prefix} ${suffix} ${emoji}`;
  }

  listThemes() {
    return Object.keys(this.themes);
  }
}

// CLI Interface
function runCLI() {
  const generator = new StatusGenerator();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Welcome to Random Emoji Status Generator!');
  console.log('Available themes:', generator.listThemes().join(', '));

  function promptUser() {
    rl.question('Enter theme (or "quit" to exit): ', (theme) => {
      if (theme.toLowerCase() === 'quit') {
        rl.close();
        return;
      }

      try {
        const status = generator.generateStatus(theme);
        console.log('\nGenerated Status:', status);
        console.log('Status copied to clipboard!\n');
      } catch (error) {
        console.log('Invalid theme. Available themes:', generator.listThemes().join(', '));
      }

      promptUser();
    });
  }

  promptUser();
}

// GUI Interface
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
}

// HTML for GUI
const guiHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Emoji Status Generator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f0f0f0;
        }
        .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .theme-buttons {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        #status {
            font-size: 24px;
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎲 Random Emoji Status Generator</h1>
        <div class="theme-buttons">
            <button onclick="generateStatus('work_mood')">Work Mood</button>
            <button onclick="generateStatus('weekend_vibes')">Weekend Vibes</button>
            <button onclick="generateStatus('food_mood')">Food Mood</button>
        </div>
        <div id="status">Click a theme to generate status!</div>
        <button onclick="copyStatus()">Copy to Clipboard</button>
    </div>
    <script>
        const generator = new StatusGenerator();
        let currentStatus = '';

        function generateStatus(theme) {
            currentStatus = generator.generateStatus(theme);
            document.getElementById('status').textContent = currentStatus;
        }

        function copyStatus() {
            if (currentStatus) {
                navigator.clipboard.writeText(currentStatus)
                    .then(() => alert('Status copied to clipboard!'))
                    .catch(err => console.error('Failed to copy:', err));
            }
        }
    </script>
</body>
</html>
`;

// Determine if running as CLI or GUI
if (require.main === module) {
  if (process.argv.includes('--gui')) {
    app.whenReady().then(createWindow);
    
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  } else {
    runCLI();
  }
}

module.exports = { StatusGenerator };
