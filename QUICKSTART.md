# Quick Start Guide

Get up and running with Calendar Crawlers in 5 minutes!

## 🚀 Installation

```bash
git clone https://github.com/kasperjay/calendarcrawlers.git
cd calendarcrawlers
npm install
```

## 🎯 Run Your First Scraper

### Option 1: Quick Test

```bash
# Set your venue details
export VENUE_NAME="Your Venue Name"
export VENUE_URL="https://yourvenue.com/events"

# Run the scraper
npm start
```

### Option 2: With Custom Selectors

```bash
VENUE_NAME="The Fillmore" \
VENUE_URL="https://www.thefillmore.com/events" \
EVENT_SELECTOR=".event-item" \
TITLE_SELECTOR=".event-title" \
DATE_SELECTOR=".event-date" \
npm start
```

## 🔍 Find Your Selectors

1. **Open the venue's calendar page in your browser**

2. **Right-click on an event → Inspect**

3. **Find the CSS selectors:**
   - Look for the element that wraps each event
   - Note its class name (e.g., `event-item`)
   - Find the title, date, and link elements inside

4. **Test in browser console:**
   ```javascript
   document.querySelectorAll('.event-item').length
   ```

## 📊 View Your Results

Results are stored in Apify's dataset. When running locally, check the console output.

When deployed to Apify:
1. Go to your actor's run page
2. Click "Dataset"
3. Download as CSV or JSON
4. Import to Google Sheets

## 🎭 Choosing an Actor Type

| Actor Type | When to Use | Configuration |
|------------|-------------|---------------|
| **Generic** | Most venues | Requires CSS selectors |
| **Bandsintown** | Venues using Bandsintown | Auto-detects selectors |
| **Custom** | Complex layouts | Create your own actor |

## 📝 Example Output

```json
{
  "venue": "The Fillmore",
  "date": "2024-12-15",
  "title": "The Black Keys with Gary Clark Jr.",
  "headliner": "The Black Keys",
  "supportingActs": "Gary Clark Jr.",
  "url": "https://www.thefillmore.com/events/12345",
  "scrapedAt": "2024-12-01T18:00:00.000Z"
}
```

## 🚢 Deploy to Apify

1. **Install Apify CLI:**
   ```bash
   npm install -g apify-cli
   ```

2. **Login:**
   ```bash
   apify login
   ```

3. **Deploy:**
   ```bash
   apify push
   ```

4. **Run on Apify:**
   - Go to apify.com
   - Find your actor
   - Click "Try for free"
   - Configure input and run

## 🆘 Need Help?

- **No events found?** → Check your CSS selectors
- **Wrong artists?** → Verify event title format
- **Missing dates?** → Try different date selectors

See [EXAMPLES.md](EXAMPLES.md) for detailed troubleshooting.

## 📚 Next Steps

1. **Read the full documentation:** [README.md](README.md)
2. **See more examples:** [EXAMPLES.md](EXAMPLES.md)
3. **Learn to contribute:** [CONTRIBUTING.md](CONTRIBUTING.md)
4. **Check venue configs:** [venues/](venues/)

## 💡 Pro Tips

- Start with the generic actor before creating custom ones
- Test selectors in browser console first
- Use Bandsintown actor for common platforms
- Schedule regular scrapes on Apify
- Set up Google Sheets integration for automatic updates

Happy scraping! 🎸
