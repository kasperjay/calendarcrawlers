# Venue Configurations

This directory contains example configurations for different venues. Each file demonstrates how to configure the generic actor for a specific venue.

## Using a Venue Configuration

### Method 1: Environment Variables

```bash
VENUE_NAME="Example Venue" \
VENUE_URL="https://example.com/events" \
EVENT_SELECTOR=".event-item" \
TITLE_SELECTOR=".event-title" \
DATE_SELECTOR=".event-date" \
npm start
```

### Method 2: Apify Input

When running on Apify platform, use the input schema:

```json
{
  "actorType": "generic",
  "venueName": "Example Venue",
  "venueUrl": "https://example.com/events",
  "selectors": {
    "eventContainer": ".event-item",
    "eventTitle": ".event-title",
    "eventDate": ".event-date",
    "eventLink": "a"
  }
}
```

## Adding a New Venue

1. Research the venue's calendar page structure
2. Identify the appropriate CSS selectors
3. Create a configuration file (optional, for documentation)
4. Test with the generic actor
5. If the generic actor doesn't work, create a custom actor

## Example Configurations

The files in this directory are examples and templates. You'll need to:

1. Update the URLs to actual venue websites
2. Inspect the actual HTML to find the correct selectors
3. Test and adjust as needed

## Common Venue Platforms

Many venues use common platforms. Here are some starting points:

### Ticketmaster Venues
```json
{
  "selectors": {
    "eventContainer": ".event-listing",
    "eventTitle": ".event-name",
    "eventDate": ".event-date",
    "eventLink": "a.event-link"
  }
}
```

### Eventbrite Venues
```json
{
  "selectors": {
    "eventContainer": ".event-card",
    "eventTitle": ".event-title",
    "eventDate": ".event-date",
    "eventLink": "a"
  }
}
```

### Custom Venue Sites
Will require inspecting the specific HTML structure.
