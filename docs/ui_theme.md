# FIFA WORLD CUP 2026 Checklist — UI Theme (Album Style)

## 🎨 Design Principles
- Bold geometric shapes (no soft gradients)
- Solid, saturated colors
- Layered backgrounds with organic shapes
- Editorial / sports visual style

---

## 🎨 Color Tokens

```css
:root {
  --bg-main: #0f172a;
  --bg-card: #1e293b;

  --green: #22c55e;
  --yellow: #facc15;
  --orange: #f97316;
  --red: #ef4444;
  --blue: #3b82f6;
  --purple: #8b5cf6;

  --text-main: #ffffff;
  --text-muted: #94a3b8;

  --radius: 20px;
}
```

---

## 🌈 Background System (Album Style)

```css
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background: var(--bg-main);
  color: var(--text-main);
  overflow-x: hidden;
  position: relative;
}

body::before {
  content: "";
  position: absolute;
  width: 500px;
  height: 500px;
  background: var(--green);
  border-radius: 50%;
  top: -200px;
  left: -200px;
}

body::after {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  background: var(--orange);
  border-radius: 40%;
  bottom: -150px;
  right: -150px;
}
```

---

## 🧩 Layout Container

```css
.app {
  position: relative;
  z-index: 1;
  padding: 24px;
}
```

---

## 🟥 Header

```css
.header {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 20px;
}
```

---

## 🟦 Match Card Component

```css
.match-card {
  background: var(--bg-card);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
}

.match-card::before {
  content: "";
  position: absolute;
  width: 120px;
  height: 120px;
  background: var(--red);
  border-radius: 50%;
  top: -40px;
  right: -40px;
  opacity: 0.3;
}
```

---

## ⚽ Match Content

```css
.match-teams {
  font-weight: 600;
  font-size: 18px;
}

.match-date {
  color: var(--text-muted);
  font-size: 14px;
}
```

---

## 🟩 Status System

```css
.status {
  margin-top: 10px;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 12px;
}

.completed {
  background: var(--green);
}

.in-progress {
  background: var(--orange);
}

.pending {
  background: #334155;
}
```

---

## ⭐ Favorite Tag

```css
.favorite {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--yellow);
  color: black;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
}
```

---

## 🔘 Buttons

```css
.button {
  background: var(--blue);
  border: none;
  padding: 12px 16px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
}
```

---

## 🧱 Team Grid

```css
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.team-card {
  padding: 16px;
  border-radius: var(--radius);
  color: white;
  font-weight: 600;
}

.team-brazil { background: #22c55e; }
.team-spain { background: #ef4444; }
.team-france { background: #3b82f6; }
```

---

## 🧪 Example HTML

```html
<div class="app">
  <div class="header">World Cup 2026 Checklist</div>

  <div class="match-card">
    <div class="favorite">⭐</div>
    <div class="match-teams">Spain vs Brazil</div>
    <div class="match-date">June 18 - 20:00</div>
    <div class="status in-progress">In Progress</div>
  </div>

  <button class="button">Add Match</button>
</div>
```

---

## 🎬 Animations

```css
* {
  transition: all 0.2s ease;
}
```

---

## 🚀 Notes for OpenSpec
- Use tokens as global variables
- Components are modular and reusable
- Avoid gradients — prioritize solid shapes
- Keep contrast high for readability
