# Life Pharmacy — Review Collection Website

A beautiful, mobile-first website that makes it effortless for customers to leave Google reviews for Life Pharmacy, Amravati.

## How It Works

1. Customer scans QR code → website opens
2. Selects star rating (1–5 stars)
3. Swipes through 10–12 pre-written reviews (matching their rating) and picks one — or writes their own
4. Taps **Copy & Open Google Maps**
5. Review text is auto-copied → Google Maps opens → customer pastes and posts!

---

## Deploy to Vercel (2 minutes)

### Step 1 — Push to GitHub
1. Go to [github.com](https://github.com) → New Repository → name it `life-pharmacy-reviews`
2. Upload these files:
   - `index.html`
   - `style.css`
   - `app.js`
   - `vercel.json`
3. Commit.

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Click **Deploy** — done! You'll get a live URL like `https://life-pharmacy-reviews.vercel.app`

---

## Generate QR Code

1. Go to [qrcode-monkey.com](https://qrcode-monkey.com) or [qr-code-generator.com](https://qr-code-generator.com)
2. Paste your Vercel URL
3. Customize colors (use green `#14a361` to match the pharmacy brand)
4. Download as PNG/SVG
5. Print and place at counter, on receipts, or on a table tent

---

## Google Place ID

The site uses Place ID: `ChIJl4cbe0ClNjkRhqSBkyLzvKc`  
Business: **Life Pharmacy, Amravati, Maharashtra**

To update the Place ID, edit line 7 of `app.js`:
```js
const PLACE_ID = "ChIJl4cbe0ClNjkRhqSBkyLzvKc";
```

---

## Customizing Reviews

Reviews are in `app.js` inside the `REVIEWS` object, organized by star rating (1–5). Each rating has 10–12 pre-written options. Edit freely to match your pharmacy's tone.

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure |
| `style.css` | Pharmacy-themed green design |
| `app.js` | All logic — stars, carousel, clipboard, redirect |
| `vercel.json` | Vercel deployment config |
| `README.md` | This file |
