# Calendar Crawlers - Project Summary

## Overview

Calendar Crawlers is a complete solution for scraping venue calendar/events pages using Apify actors. The system extracts headlining and supporting acts artist information and formats it for Google Sheets integration.

## Problem Solved

Music venues, event promoters, and researchers need to collect artist performance data from multiple venue websites. Manual data collection is time-consuming and error-prone. This project provides automated, reliable scraping with:

- **Individual venue targeting** - Scrape one venue at a time to reduce errors
- **Artist extraction** - Intelligently parse event titles to identify headliners and supporting acts
- **Structured output** - Data formatted ready for Google Sheets import
- **Flexible configuration** - Generic actor works with most venues, custom actors for special cases

## Architecture

### Core Components

```
calendarcrawlers/
├── src/
│   ├── actors/              # Actor implementations
│   │   ├── baseVenueActor.js        # Base class for all actors
│   │   ├── genericVenueActor.js     # Configurable generic actor
│   │   ├── bandsintownVenueActor.js # Bandsintown platform support
│   │   └── exampleVenueActor.js     # Template for custom actors
│   ├── utils/               # Shared utilities
│   │   ├── artistExtractor.js       # Parse artists from event titles
│   │   └── dataFormatter.js         # Format data for Google Sheets
│   └── main.js              # Entry point
├── .actor/                  # Apify configuration
└── venues/                  # Example configurations
```

### Actor Types

1. **BaseVenueActor** - Abstract base class providing:
   - Crawler initialization
   - Event processing pipeline
   - Error handling
   - Dataset output

2. **GenericVenueActor** - Configurable actor for standard layouts:
   - CSS selector configuration
   - Auto-detection fallbacks
   - Works with most venue websites

3. **BandsintownVenueActor** - Specialized for Bandsintown:
   - Pre-configured selectors
   - Multi-pattern detection
   - No configuration needed

4. **Custom Actors** - Extend BaseVenueActor for complex cases

### Utility Functions

**artistExtractor.js:**
- `extractArtists(text)` - Parse event titles for artists
- Supports patterns: "with", "w/", "ft.", "+", "&"
- Cleans parenthetical notes
- Returns structured artist data

**dataFormatter.js:**
- `formatEventForSheet(event)` - Format single event
- `formatEventsForSheet(events)` - Format multiple events
- `createSheetData(events)` - Create sheet-ready structure
- Includes timestamps for tracking

## Data Flow

```
1. Input Configuration
   ↓
2. CheerioCrawler loads page
   ↓
3. CSS selectors extract raw event data
   ↓
4. artistExtractor parses titles
   ↓
5. dataFormatter structures output
   ↓
6. Apify dataset stores results
   ↓
7. Export to Google Sheets
```

## Output Schema

```json
{
  "venue": "string",           // Venue name
  "date": "string",            // Event date
  "title": "string",           // Full event title
  "headliner": "string",       // Main artist
  "supportingActs": "string",  // Comma-separated supporting acts
  "url": "string",             // Event URL
  "scrapedAt": "ISO 8601"      // Scrape timestamp
}
```

## Key Features

### 1. Intelligent Artist Parsing

Automatically extracts headliners and supporting acts from various formats:
- "Band A with Band B"
- "Artist w/ Supporting Act"
- "Headliner ft. Featured Artist"
- "Act 1 + Act 2"

### 2. Flexible Configuration

Three levels of customization:
- **Environment variables** - Quick local testing
- **JSON configuration** - Apify platform input
- **Code extension** - Custom actor classes

### 3. Google Sheets Ready

Output format designed for direct import:
- Header row with field names
- Clean data rows
- Timestamp tracking
- URL preservation

### 4. Error Handling

Robust error management:
- Request retry logic
- Failed request logging
- Graceful degradation
- Detailed error messages

### 5. Scalability

Built for multiple venues:
- One actor per venue approach
- Parallel execution support
- Apify scheduling integration
- Dataset aggregation

## Use Cases

### 1. Music Industry Research
Track touring patterns, venue relationships, artist pairings

### 2. Event Promotion
Monitor competing venues, track artist availability

### 3. Data Analysis
Analyze music trends, genre patterns, venue booking strategies

### 4. Fan Tools
Create comprehensive show listings, track favorite artists

## Technical Stack

- **Apify SDK** - Actor framework and infrastructure
- **Crawlee** - Web scraping and crawling
- **Cheerio** - Fast HTML parsing
- **Node.js** - Runtime environment

## Deployment Options

### Local Development
```bash
npm install
VENUE_NAME="..." VENUE_URL="..." npm start
```

### Apify Platform
```bash
apify login
apify push
```

### Scheduled Runs
Configure via Apify platform for automatic scraping

### Google Sheets Integration
Built-in Apify integration for automatic data export

## Performance Considerations

- **Selector Efficiency**: Specific selectors faster than wildcards
- **Request Rate**: Respects venue server limits
- **Memory Usage**: Processes events in batches
- **Error Recovery**: Automatic retry with exponential backoff

## Extensibility

### Adding New Venues

**Easy:** Use generic actor with custom selectors
**Medium:** Create venue-specific configuration
**Advanced:** Extend BaseVenueActor class

### Custom Processing

Extend actors to add:
- Data validation
- Additional fields
- Custom filtering
- API integrations

### New Platforms

Add support for other event platforms:
- Ticketmaster venues
- Eventbrite pages
- WordPress event plugins
- Custom CMS systems

## Future Enhancements

Potential improvements:
- [ ] Multi-page pagination support
- [ ] Date parsing and normalization
- [ ] Genre classification
- [ ] Duplicate event detection
- [ ] Historical data tracking
- [ ] API endpoint for data access
- [ ] Dashboard for monitoring
- [ ] Batch venue processing

## Documentation

- **README.md** - Project overview and setup
- **QUICKSTART.md** - 5-minute getting started guide
- **EXAMPLES.md** - Detailed usage examples
- **CONTRIBUTING.md** - Guide for adding venues
- **.actor/README.md** - Apify platform documentation

## Testing

**Utility Tests:**
- Artist extraction patterns
- Data formatting
- Edge cases

**Manual Testing:**
- Run against test venues
- Verify output format
- Check Google Sheets import

## Maintenance

### Regular Updates
- Monitor venue HTML changes
- Update selectors as needed
- Test with new venue sites

### Error Monitoring
- Review failed scrapes
- Update patterns for new formats
- Enhance error messages

## Success Metrics

- ✅ Successfully scrapes events from target venues
- ✅ Accurately extracts headliners and supporting acts
- ✅ Outputs data compatible with Google Sheets
- ✅ Minimal configuration required for most venues
- ✅ Handles errors gracefully
- ✅ Extensible for new venues

## Conclusion

Calendar Crawlers provides a robust, flexible solution for automated venue calendar scraping. The modular architecture supports both quick configuration for standard venues and deep customization for complex cases. With Apify integration and Google Sheets compatibility, it offers a complete end-to-end solution for collecting and analyzing artist performance data.
