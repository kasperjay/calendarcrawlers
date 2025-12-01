# Venue Setup Checklist

Use this checklist when adding a new venue to ensure complete and accurate scraping.

## Pre-Setup Research

- [ ] Identify the venue's calendar/events page URL
- [ ] Check if the venue uses a known platform (Bandsintown, Ticketmaster, etc.)
- [ ] Verify the page doesn't require JavaScript rendering (or note if it does)
- [ ] Check robots.txt for scraping permissions
- [ ] Note any rate limiting or access restrictions

## HTML Inspection

- [ ] Open the calendar page in a browser
- [ ] Open Developer Tools (F12 or Right-click → Inspect)
- [ ] Locate the event listing section
- [ ] Identify the repeating event container element
- [ ] Find the CSS selector for the container
- [ ] Locate event title element and selector
- [ ] Locate event date element and selector
- [ ] Locate event link element
- [ ] Check for any dynamic content loading

## Selector Testing

Test selectors in browser console:

```javascript
// Replace with your selectors
const eventSelector = '.event-item';
const titleSelector = '.event-title';
const dateSelector = '.event-date';

// Test event count
console.log('Events found:', document.querySelectorAll(eventSelector).length);

// Test first event data
const firstEvent = document.querySelector(eventSelector);
console.log('Title:', firstEvent.querySelector(titleSelector)?.textContent);
console.log('Date:', firstEvent.querySelector(dateSelector)?.textContent);
console.log('Link:', firstEvent.querySelector('a')?.href);
```

## Selector Checklist

- [ ] Event container selector returns expected number of events
- [ ] Title selector returns artist name(s)
- [ ] Date selector returns event date
- [ ] Link selector returns full event URL
- [ ] Selectors work on multiple events (test with first 3-5)
- [ ] No null/undefined values for critical fields

## Configuration Decision

Choose your approach:

### Option A: Use Generic Actor
- [ ] Venue has standard HTML structure
- [ ] All data accessible via CSS selectors
- [ ] No complex JavaScript interactions
- [ ] → Proceed with generic actor

### Option B: Use Platform-Specific Actor
- [ ] Venue uses Bandsintown widget → Use BandsintownVenueActor
- [ ] Venue uses other known platform → Check for existing actor
- [ ] → Use platform-specific actor

### Option C: Create Custom Actor
- [ ] Complex or unusual page structure
- [ ] Requires JavaScript interaction
- [ ] Multiple pages or AJAX loading
- [ ] → Create custom actor extending BaseVenueActor

## Configuration Setup

For generic actor:

- [ ] Set venue name
- [ ] Set venue URL
- [ ] Set event container selector
- [ ] Set title selector
- [ ] Set date selector
- [ ] Set link selector

Example:
```json
{
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

## Local Testing

- [ ] Set environment variables or create config
- [ ] Run: `npm start`
- [ ] Verify console output shows events found
- [ ] Check extracted data includes:
  - [ ] Venue name
  - [ ] Event dates
  - [ ] Event titles
  - [ ] Artist names (headliners)
  - [ ] Supporting acts (if applicable)
  - [ ] Event URLs
- [ ] Verify no errors or warnings

## Data Quality Check

Review the scraped data:

- [ ] All events from the page were captured
- [ ] Artist names are clean (no extra whitespace/characters)
- [ ] Dates are in readable format
- [ ] Headliners correctly identified
- [ ] Supporting acts correctly separated
- [ ] URLs are complete and valid
- [ ] No duplicate events

## Artist Parsing Validation

Test with various event title formats:

- [ ] Solo artist (e.g., "Taylor Swift")
- [ ] Headliner with support (e.g., "Band A with Band B")
- [ ] Using "w/" (e.g., "Artist w/ Support")
- [ ] Using "ft." (e.g., "Artist ft. Featured")
- [ ] Multiple supporting acts (e.g., "A + B + C")
- [ ] With parenthetical info (e.g., "Artist (18+ show)")

## Edge Cases

Test edge cases:

- [ ] Events with no supporting acts
- [ ] Events with multiple supporting acts
- [ ] Events with special characters in names
- [ ] Events with cancelled/postponed status
- [ ] Past events (if shown on page)
- [ ] TBA/TBD dates
- [ ] All-day events
- [ ] Multi-day events/festivals

## Documentation

- [ ] Create venue config file in `venues/` directory
- [ ] Document any special requirements
- [ ] Note any known issues or limitations
- [ ] Add example output
- [ ] Update venue list if maintaining one

## Deployment (Apify)

If deploying to Apify:

- [ ] Test configuration works in main.js
- [ ] Verify input schema matches your config
- [ ] Deploy with `apify push`
- [ ] Test on Apify platform
- [ ] Set up scheduling (if desired)
- [ ] Configure Google Sheets integration (if desired)
- [ ] Monitor first few runs

## Monitoring Setup

- [ ] Note when venue typically updates calendar
- [ ] Set appropriate scraping frequency
- [ ] Configure error notifications
- [ ] Plan for handling site changes
- [ ] Document any seasonal patterns

## Maintenance Plan

- [ ] Schedule regular verification runs
- [ ] Monitor for HTML structure changes
- [ ] Update selectors if venue redesigns site
- [ ] Check for new event types or formats
- [ ] Validate data quality periodically

## Success Criteria

✅ All criteria must be met:

- [ ] Successfully scrapes at least 5 events
- [ ] Artist names correctly extracted
- [ ] Headliners and supporting acts properly separated
- [ ] Dates captured in readable format
- [ ] URLs are complete and clickable
- [ ] No errors during scraping
- [ ] Output format matches expected schema
- [ ] Data imports successfully to Google Sheets
- [ ] Reproducible on different days/times
- [ ] Handles page changes gracefully

## Troubleshooting

If issues occur:

### No events found
- [ ] Re-verify selectors in browser console
- [ ] Check if page loaded completely
- [ ] Look for AJAX/dynamic content
- [ ] Try more general selectors

### Wrong data extracted
- [ ] Verify selector specificity
- [ ] Check for multiple matching elements
- [ ] Inspect actual HTML structure
- [ ] Test with .first() or :nth-child()

### Missing data
- [ ] Check if fields are optional on page
- [ ] Add fallback selectors
- [ ] Handle null/undefined gracefully
- [ ] Document expected missing fields

### Rate limiting
- [ ] Add delays between requests
- [ ] Reduce scraping frequency
- [ ] Check venue's robots.txt
- [ ] Contact venue if necessary

## Completion

- [ ] All checklist items completed
- [ ] Local testing successful
- [ ] Data quality verified
- [ ] Documentation updated
- [ ] Deployed (if using Apify)
- [ ] Initial monitoring shows success

## Notes

Use this section for venue-specific notes:

```
Venue Name: _______________
Date Setup: _______________
Completed By: _____________

Special Notes:
- 
- 
- 

Known Issues:
- 
- 
```

---

**Ready to go?** Start scraping and collecting artist data! 🎸
