# Ustoz Voice — Reading Practice (R va Z Sayyorasi)

A **speech-to-text reading practice** app for the Uzbek language using the Web Speech API. Focuses on practicing "R" and "Z" sounds through themed space-adventure lessons — the user reads words aloud, and the app listens and validates pronunciation syllable by syllable.

## Features

- **Voice Recognition** — Uses browser's Web Speech API with Uzbek language (`uz-UZ`)
- **Syllable-by-Syllable Validation** — Words light up as they're correctly pronounced
- **3 Themed Lessons** — Space-themed topics: "Raketa va Zafar", "Reks va Zoo-park", "Shirin Mevalar"
- **Real-time Feedback** — Active word highlighting, score tracking, progress indicator
- **Space/Neon Theme** — Dark gradient UI with neon accents for an engaging experience
- **No Server Required** — Fully client-side, works offline after first load

## Tech Stack

- HTML5, CSS3 (custom properties, glassmorphism, animations)
- Vanilla JavaScript
- Web Speech API (`SpeechRecognition`)

## How to Run

```bash
# Serve locally (required for microphone access in some browsers):
python3 -m http.server 8080
# Open http://localhost:8080
```

**Note:** Voice recognition requires a browser that supports the Web Speech API (Chrome/Edge recommended). The page must be served over HTTPS or `localhost`.

## 🔗 Rasmiy portfolio
Barcha XOLERIC loyihalari: **https://xolerc.github.io/mydrime/**
