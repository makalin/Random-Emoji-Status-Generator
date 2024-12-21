# 🎲 Random Emoji Status Generator

Generate fun, randomized emoji status messages for your favorite messaging platforms like Slack, Discord, or Microsoft Teams! This Node.js application comes with both CLI and GUI interfaces, allowing you to quickly create themed status updates with matching emojis.

## ✨ Features

- Multiple themed status generators (Work, Weekend, Food moods)
- Command-line interface for quick status generation
- Electron-based GUI for visual interaction
- Easy-to-use clipboard integration
- Extensible theme system
- Cross-platform compatibility

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/emoji-status-generator

# Navigate to the project directory
cd emoji-status-generator

# Install dependencies
npm install

# Optional: Install globally to use from anywhere
npm install -g .
```

## 💻 Usage

### Command Line Interface

```bash
# Run directly
node emoji-status.js

# If installed globally
emoji-status
```

Follow the prompts to select a theme and generate your status!

### GUI Interface

```bash
# Run with GUI flag
node emoji-status.js --gui

# If installed globally
emoji-status --gui
```

## 🎨 Available Themes

1. **Work Mood** (`work_mood`)
   - Professional and productive vibes
   - Examples: "💻 Coding sprint 💻", "📊 Planning session 📊"

2. **Weekend Vibes** (`weekend_vibes`)
   - Fun and relaxation themed
   - Examples: "🎮 Chilling mood 🎮", "🌴 Vibing life 🌴"

3. **Food Mood** (`food_mood`)
   - Food and drink themed
   - Examples: "🍕 Snacking time 🍕", "☕ Coffee break ☕"

## 🛠️ Development

### Project Structure

```
emoji-status-generator/
├── emoji-status.js     # Main application file
├── package.json
├── README.md
└── node_modules/
```

### Adding New Themes

Create new themes by adding to the `themes` object in `emoji-status.js`:

```javascript
const themes = {
  'your_theme': {
    emojis: ['emoji1', 'emoji2', ...],
    prefixes: ['prefix1', 'prefix2', ...],
    suffixes: ['suffix1', 'suffix2', ...]
  }
};
```

## 📦 Dependencies

- Node.js >= 14.0.0
- Electron (for GUI)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need for fun, dynamic status messages in workplace chat
- Built with ❤️ using Node.js and Electron

## 🐛 Bug Reports

If you discover any bugs, please create an issue in the GitHub repository.

## 🔮 Future Plans

- Additional themes
- Custom theme creation UI
- Direct integration with messaging platforms
- Status scheduling
- Favorite status saving
- Theme sharing capabilities
