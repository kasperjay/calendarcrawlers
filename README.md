# Calendar Crawlers

Scrape artist data from calendar pages one by one to reduce errors. A collection of Apify actors for scraping venue calendar/events pages and extracting headlining and supporting acts artist information.

## 🎯 Purpose

This project provides a set of Apify actors that scrape individual venue calendar pages to extract:
- Event dates and titles
- Headlining artists
- Supporting acts
- Event URLs

The data is formatted for easy export to Google Sheets for analysis and tracking.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Running Locally

Run the generic venue actor:

```bash
VENUE_NAME="Example Venue" \
VENUE_URL="https://example.com/events" \
npm start
```

### Using Environment Variables

Configure the scraper with environment variables:

```bash
export ACTOR_TYPE="generic"
export VENUE_NAME="The Fillmore"
export VENUE_URL="https://www.thefillmore.com/events"
export EVENT_SELECTOR=".event-item"
export TITLE_SELECTOR=".event-title"
export DATE_SELECTOR=".event-date"
export LINK_SELECTOR="a"

npm start
```

## 📦 Project Structure

```
calendarcrawlers/
├── .actor/                    # Apify actor configuration
│   ├── actor.json            # Actor metadata
│   ├── input_schema.json     # Input schema definition
│   ├── Dockerfile            # Docker configuration
│   └── README.md             # Actor documentation
├── src/
│   ├── actors/               # Actor implementations
│   │   ├── baseVenueActor.js      # Base class for all venue actors
│   │   ├── genericVenueActor.js   # Configurable generic actor
│   │   └── exampleVenueActor.js   # Example template
│   ├── utils/                # Utility functions
│   │   ├── artistExtractor.js     # Artist parsing logic
│   │   └── dataFormatter.js       # Sheet formatting utilities
│   └── main.js               # Main entry point
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🎭 Actor Types

### 1. Generic Venue Actor

A flexible actor that works with most venue calendar layouts through configurable CSS selectors.

**Use when:** The venue has a standard event listing page with predictable HTML structure.

### 2. Custom Venue Actors

Create venue-specific actors by extending the `BaseVenueActor` class for venues with unique layouts.

**Use when:** The venue has a complex or non-standard layout that requires custom parsing logic.

## 🔧 Creating a New Venue Actor

### Option 1: Use the Generic Actor

Most venues can use the generic actor with custom selectors:

```javascript
const GenericVenueActor = require('./src/actors/genericVenueActor');

const actor = new GenericVenueActor({
  venueName: 'My Venue',
  venueUrl: 'https://myvenue.com/calendar',
  selectors: {
    eventContainer: '.event',
    eventTitle: '.title',
    eventDate: '.date',
    eventLink: 'a'
  }
});

actor.run();
```

### Option 2: Create a Custom Actor

For complex venues, extend the base class:

```javascript
const BaseVenueActor = require('./src/actors/baseVenueActor');

class MyVenueActor extends BaseVenueActor {
  constructor() {
    super({
      venueName: 'My Venue',
      venueUrl: 'https://myvenue.com/calendar',
      parseEvents: MyVenueActor.parseEvents
    });
  }

  static parseEvents($, pageUrl) {
    const events = [];
    
    // Custom parsing logic here
    $('.my-event-class').each((i, el) => {
      events.push({
        eventTitle: $(el).find('.title').text(),
        eventDate: $(el).find('.date').text(),
        eventUrl: $(el).find('a').attr('href')
      });
    });
    
    return events;
  }
}

module.exports = MyVenueActor;
```

## 📊 Output Format

All actors output data in the same format for Google Sheets compatibility:

```json
{
  "venue": "Venue Name",
  "date": "2024-12-15",
  "title": "Band Name with Supporting Act",
  "headliner": "Band Name",
  "supportingActs": "Supporting Act",
  "url": "https://venue.com/event/123",
  "scrapedAt": "2024-12-01T18:00:00.000Z"
}
```

## 🎸 Artist Extraction

The system automatically parses event titles to identify artists:

| Pattern | Example | Headliner | Supporting |
|---------|---------|-----------|------------|
| "with" | "Artist A with Artist B" | Artist A | Artist B |
| "w/" | "Artist A w/ Artist B" | Artist A | Artist B |
| "ft." | "Artist A ft. Artist B" | Artist A | Artist B |
| "+" | "Artist A + Artist B" | Artist A | Artist B |

## 🌐 Deploying to Apify

1. **Install Apify CLI:**
   ```bash
   npm install -g apify-cli
   ```

2. **Login to Apify:**
   ```bash
   apify login
   ```

3. **Deploy the actor:**
   ```bash
   apify push
   ```

## 📝 Google Sheets Integration

### Manual Import

1. Run the actor on Apify
2. Download the dataset as CSV
3. Import into Google Sheets

### Automated Integration

Use Apify's Google Sheets integration:
1. Connect your Google account
2. Configure automatic exports
3. Data syncs after each run

## 🛠️ Development

### Adding Dependencies

```bash
npm install <package-name>
```

### Testing Locally

```bash
# Run with environment variables
VENUE_NAME="Test" VENUE_URL="https://example.com" npm start
```

### Project Dependencies

- **apify** - Apify SDK for actor development
- **crawlee** - Web scraping and crawling framework
- **cheerio** - Fast, flexible HTML parsing

## 📚 Utility Functions

### Artist Extractor (`src/utils/artistExtractor.js`)

Functions for parsing artist information from event titles:
- `extractArtists(eventText)` - Extract headliner and supporting acts
- `splitArtists(artistsText)` - Split multiple artists
- `cleanArtistName(artistName)` - Clean artist names

### Data Formatter (`src/utils/dataFormatter.js`)

Functions for formatting data for Google Sheets:
- `formatEventForSheet(event)` - Format single event
- `formatEventsForSheet(events)` - Format multiple events
- `createSheetData(events)` - Create sheet-ready structure

## 🤝 Contributing

To add support for a new venue:

1. Create a new actor file in `src/actors/`
2. Extend `BaseVenueActor` or use `GenericVenueActor`
3. Implement venue-specific parsing logic
4. Test locally
5. Submit a pull request

## 📄 License

ISC

## 🐛 Troubleshooting

### No events found
- Verify the venue URL is correct
- Check CSS selectors match the page structure
- Inspect the page HTML to identify correct selectors

### Rate limiting
- Add delays between requests
- Use Apify's auto-retry features
- Respect robots.txt

### Missing artists
- Review the event title format
- Adjust artist extraction patterns if needed
- Create custom parsing logic for complex formats
