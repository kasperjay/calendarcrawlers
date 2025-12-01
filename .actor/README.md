# Calendar Crawler - Venue Events Scraper

This Apify actor scrapes event and artist information from venue calendar pages. It extracts headlining and supporting acts, making it easy to collect artist performance data for analysis or export to Google Sheets.

## Features

- 🎭 Scrapes venue calendar/events pages
- 🎸 Extracts headlining and supporting acts
- 📊 Formats data for easy export to Google Sheets
- 🔧 Configurable CSS selectors for different venue layouts
- 🚀 Built on Apify SDK and Crawlee

## Input Configuration

The actor accepts the following input parameters:

### Required Parameters

- **venueName** (string): Name of the venue to scrape
- **venueUrl** (string): URL of the venue's calendar/events page

### Optional Parameters

- **actorType** (string): Type of actor to run (`generic` or `example`)
  - Default: `generic`
- **selectors** (object): CSS selectors for scraping
  - **eventContainer**: Selector for event containers (default: auto-detect)
  - **eventTitle**: Selector for event titles (default: auto-detect)
  - **eventDate**: Selector for event dates (default: auto-detect)
  - **eventLink**: Selector for event links (default: auto-detect)

### Example Input

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

## Output Format

The actor outputs data in a format ready for Google Sheets:

```json
[
  {
    "venue": "The Fillmore",
    "date": "2024-12-15",
    "title": "Band Name with Supporting Act",
    "headliner": "Band Name",
    "supportingActs": "Supporting Act",
    "url": "https://www.thefillmore.com/event/123",
    "scrapedAt": "2024-12-01T18:00:00.000Z"
  }
]
```

## How It Works

1. **Scraping**: The actor visits the venue's calendar page
2. **Extraction**: Finds event elements using CSS selectors
3. **Parsing**: Extracts artist information from event titles
4. **Formatting**: Structures data for Sheet export
5. **Output**: Saves to Apify dataset

## Artist Extraction

The actor intelligently parses event titles to identify headliners and supporting acts:

- "Artist A with Artist B" → Headliner: Artist A, Supporting: Artist B
- "Artist A w/ Artist B" → Headliner: Artist A, Supporting: Artist B
- "Artist A ft. Artist B" → Headliner: Artist A, Supporting: Artist B
- "Artist A + Artist B" → Headliner: Artist A, Supporting: Artist B

## Using with Google Sheets

The output can be imported into Google Sheets:

1. Run the actor and download the dataset
2. Import CSV/JSON into Google Sheets
3. Data includes: Venue, Date, Title, Headliner, Supporting Acts, URL, Scraped At

## Creating Custom Venue Actors

For venues with unique layouts, you can create custom actors:

1. Extend the `BaseVenueActor` class
2. Implement a custom `parseEvents` function
3. Deploy as a separate actor

See the documentation for more details.

## Error Handling

- Failed requests are retried automatically
- Invalid data is logged but doesn't stop the scrape
- All errors are logged for debugging

## Rate Limiting

The actor respects rate limits and includes delays between requests to avoid overwhelming venue servers.

## Support

For issues or questions, please open an issue on the GitHub repository.
