# Pharmacy Google Review Site

A beautiful, mobile-first website that helps customers leave Google reviews for your pharmacy in seconds.

## How It Works
1. Customer scans QR code → opens this website
2. Customer selects a star rating (1–5)
3. 10 pre-written review options appear (matched to their rating) in a swipeable carousel
4. Customer taps a review (or writes their own)
5. Clicking **Submit** copies the review to clipboard and opens Google Maps
6. Customer pastes & posts their review on Google!

## Deploy to Vercel (via GitHub)

1. Create a new GitHub repository
2. Upload all files from this folder:
   - `index.html`
   - `style.css`
   - `app.js`
   - `vercel.json`
   - `README.md`
3. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
4. Click **Deploy** — done! ✅

## Generate a QR Code

Once deployed, get your Vercel URL (e.g. `https://your-pharmacy.vercel.app`) and generate a QR code at:
- [qr-code-generator.com](https://www.qr-code-generator.com)
- [qrcode-monkey.com](https://www.qrcode-monkey.com)

Print it and place it at your pharmacy counter!

## Customization

In `app.js`, update the Google Maps URL at the top if needed:
```js
const GOOGLE_MAPS_REVIEW_URL = "https://maps.app.goo.gl/4zawPkmMTUpPvFSM7";
```

You can also edit the pre-written review texts in the `reviewsByRating` object to match your pharmacy's name or specific services.
