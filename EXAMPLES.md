# Usage Examples

This document provides practical examples of how to use the Calendar Crawlers actors.

## Table of Contents

- [Running Locally](#running-locally)
- [Actor Types](#actor-types)
- [Example Configurations](#example-configurations)
- [Output Examples](#output-examples)

## Running Locally

### Prerequisites

```bash
npm install
```

### Method 1: Environment Variables

```bash
# Generic venue with custom selectors
VENUE_NAME="The Fillmore" \
VENUE_URL="https://www.thefillmore.com/events" \
EVENT_SELECTOR=".event-item" \
TITLE_SELECTOR=".event-title" \
DATE_SELECTOR=".event-date" \
npm start
```

### Method 2: Direct Actor Execution

```bash
# Run a specific actor directly
VENUE_NAME="My Venue" \
VENUE_URL="https://example.com/events" \
node src/actors/genericVenueActor.js
```

### Method 3: Using Apify Platform

Deploy to Apify and configure via the web interface with JSON input:

```json
{
  "actorType": "generic",
  "venueName": "The Fillmore",
  "venueUrl": "https://www.thefillmore.com/events",
  "selectors": {
    "eventContainer": ".event-item",
    "eventTitle": ".event-title",
    "eventDate": ".event-date",
    "eventLink": "a"
  }
}
```

## Actor Types

### 1. Generic Venue Actor

**Best for:** Most venues with standard HTML event listings

**Configuration:**
```bash
ACTOR_TYPE="generic" \
VENUE_NAME="Example Venue" \
VENUE_URL="https://example.com/events" \
EVENT_SELECTOR=".event" \
TITLE_SELECTOR=".title" \
DATE_SELECTOR=".date" \
npm start
```

**Apify Input:**
```json
{
  "actorType": "generic",
  "venueName": "Example Venue",
  "venueUrl": "https://example.com/events",
  "selectors": {
    "eventContainer": ".event",
    "eventTitle": ".title",
    "eventDate": ".date",
    "eventLink": "a"
  }
}
```

### 2. Bandsintown Venue Actor

**Best for:** Venues using Bandsintown widget or API

**Configuration:**
```bash
ACTOR_TYPE="bandsintown" \
VENUE_NAME="Local Music Hall" \
VENUE_URL="https://localmusichal.com/shows" \
npm start
```

**Apify Input:**
```json
{
  "actorType": "bandsintown",
  "venueName": "Local Music Hall",
  "venueUrl": "https://localmusichal.com/shows"
}
```

**Note:** Bandsintown actor automatically detects common selectors. No custom selectors needed!

### 3. Example Venue Actor

**Best for:** Learning and testing

**Configuration:**
```bash
ACTOR_TYPE="example" \
npm start
```

## Example Configurations

### Ticketmaster Venues

Many venues use Ticketmaster for ticketing:

```json
{
  "actorType": "generic",
  "venueName": "The Arena",
  "venueUrl": "https://thearena.com/events",
  "selectors": {
    "eventContainer": ".event-listing",
    "eventTitle": ".event-name",
    "eventDate": ".event-date",
    "eventLink": "a.event-link"
  }
}
```

### WordPress Event Plugins

Common WordPress event plugin structure:

```json
{
  "actorType": "generic",
  "venueName": "Community Center",
  "venueUrl": "https://communitycenter.org/events",
  "selectors": {
    "eventContainer": ".tribe-events-list-event",
    "eventTitle": ".tribe-event-title",
    "eventDate": ".tribe-event-date-start",
    "eventLink": "a"
  }
}
```

### Custom HTML Structures

For unique venue websites:

```json
{
  "actorType": "generic",
  "venueName": "Indie Venue",
  "venueUrl": "https://indievenue.com/calendar",
  "selectors": {
    "eventContainer": "article.show",
    "eventTitle": "h2.show-name",
    "eventDate": "time.show-date",
    "eventLink": "a.show-link"
  }
}
```

## Output Examples

### Single Event Output

```json
{
  "venue": "The Fillmore",
  "date": "December 15, 2024",
  "title": "The Black Keys with Gary Clark Jr.",
  "headliner": "The Black Keys",
  "supportingActs": "Gary Clark Jr.",
  "url": "https://www.thefillmore.com/events/12345",
  "scrapedAt": "2024-12-01T18:00:00.000Z"
}
```

### Multiple Artists Event

```json
{
  "venue": "Madison Square Garden",
  "date": "2024-12-20",
  "title": "Green Day & Weezer & Fall Out Boy",
  "headliner": "Green Day",
  "supportingActs": "Weezer, Fall Out Boy",
  "url": "https://msg.com/events/67890",
  "scrapedAt": "2024-12-01T18:00:00.000Z"
}
```

### Solo Artist Event

```json
{
  "venue": "The Roxy",
  "date": "January 5, 2025",
  "title": "Taylor Swift",
  "headliner": "Taylor Swift",
  "supportingActs": "",
  "url": "https://theroxy.com/taylor-swift",
  "scrapedAt": "2024-12-01T18:00:00.000Z"
}
```

## Google Sheets Import

### Method 1: Manual CSV Import

1. Run the actor on Apify
2. Download dataset as CSV
3. In Google Sheets: File → Import → Upload
4. Select the CSV file
5. Choose "Replace data at selected cell" or "Insert new sheet"

### Method 2: Apify Integration

1. In Apify, go to your actor's runs
2. Click "Integrations"
3. Select "Google Sheets"
4. Authorize your Google account
5. Choose spreadsheet and sheet
6. Configure automatic updates

### Example Sheet Structure

| Venue | Date | Title | Headliner | Supporting Acts | URL | Scraped At |
|-------|------|-------|-----------|----------------|-----|------------|
| The Fillmore | 2024-12-15 | The Black Keys with Gary Clark Jr. | The Black Keys | Gary Clark Jr. | https://... | 2024-12-01T18:00:00.000Z |
| The Roxy | 2025-01-05 | Taylor Swift | Taylor Swift | | https://... | 2024-12-01T18:00:00.000Z |

## Troubleshooting Examples

### Problem: No Events Found

**Solution:** Check selectors in browser console:

```javascript
// Open browser console on the venue page
document.querySelectorAll('.event-item').length // Should return number of events
document.querySelector('.event-item .title').textContent // Should return first event title
```

### Problem: Wrong Artists Extracted

**Solution:** Check event title format and adjust parsing if needed.

Example titles that work well:
- ✅ "Artist A with Artist B"
- ✅ "Artist A w/ Artist B"  
- ✅ "Artist A ft. Artist B"
- ✅ "Artist A + Artist B"

### Problem: Missing Dates

**Solution:** Try different date selectors:

```json
{
  "selectors": {
    "eventDate": "time, .date, .datetime, [datetime]"
  }
}
```

## Testing New Venues

### Step 1: Inspect the Page

1. Visit the venue's calendar page
2. Right-click on an event → Inspect
3. Identify the HTML structure

### Step 2: Find Selectors

Look for:
- Container element (wraps each event)
- Title element (artist name)
- Date element
- Link element

### Step 3: Test in Console

```javascript
// Count events
document.querySelectorAll('YOUR_SELECTOR').length

// Get first event title
document.querySelector('YOUR_SELECTOR .title').textContent

// Get first event date
document.querySelector('YOUR_SELECTOR .date').textContent
```

### Step 4: Run Locally

```bash
VENUE_NAME="Test Venue" \
VENUE_URL="https://testvenue.com/events" \
EVENT_SELECTOR="YOUR_SELECTOR" \
TITLE_SELECTOR="YOUR_TITLE_SELECTOR" \
DATE_SELECTOR="YOUR_DATE_SELECTOR" \
npm start
```

### Step 5: Verify Output

Check the Apify storage or console output to ensure events are scraped correctly.

## Advanced Usage

### Scraping Multiple Venues

Create a script to run multiple actors:

```javascript
const GenericVenueActor = require('./src/actors/genericVenueActor');

const venues = [
  {
    venueName: 'Venue 1',
    venueUrl: 'https://venue1.com/events',
    selectors: { /* ... */ }
  },
  {
    venueName: 'Venue 2',
    venueUrl: 'https://venue2.com/events',
    selectors: { /* ... */ }
  }
];

async function scrapeAll() {
  for (const config of venues) {
    const actor = new GenericVenueActor(config);
    await actor.run();
  }
}

scrapeAll();
```

### Scheduling with Apify

1. Deploy your actor to Apify
2. Go to "Schedules" tab
3. Create a new schedule
4. Set frequency (e.g., daily, weekly)
5. Configure input for each venue
6. Enable Google Sheets integration

### Custom Data Processing

Extend the actors for custom needs:

```javascript
const GenericVenueActor = require('./src/actors/genericVenueActor');

class CustomActor extends GenericVenueActor {
  async run() {
    await super.run();
    
    // Custom post-processing
    const events = this.getEvents();
    const filtered = events.filter(e => e.headliner.includes('Rock'));
    
    // Do something with filtered events
    console.log('Rock events:', filtered);
  }
}
```

## Getting Help

If you're having trouble:

1. Check the selectors in browser console
2. Review the venue's HTML structure
3. Try the generic actor first
4. Check existing venue configurations in `/venues`
5. Open an issue on GitHub with:
   - Venue URL
   - HTML structure sample
   - Expected vs actual output
