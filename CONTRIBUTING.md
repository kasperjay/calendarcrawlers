# Contributing to Calendar Crawlers

Thank you for your interest in contributing! This guide will help you add support for new venues.

## Adding a New Venue

There are two approaches to add a new venue:

### Approach 1: Use the Generic Actor (Recommended)

If the venue has a standard calendar layout, you can use the generic actor with custom selectors.

1. **Inspect the venue's calendar page:**
   - Open the page in a browser
   - Right-click and select "Inspect" or press F12
   - Find the HTML elements that contain event information

2. **Identify CSS selectors:**
   - Event container: The element that wraps each event
   - Event title: The element containing the event/artist name
   - Event date: The element containing the date
   - Event link: The link to the event details page

3. **Create a configuration:**

   Create a new file `venues/[venue-name].json`:
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

4. **Test locally:**
   ```bash
   VENUE_NAME="The Fillmore" \
   VENUE_URL="https://www.thefillmore.com/events" \
   EVENT_SELECTOR=".event-item" \
   TITLE_SELECTOR=".event-title" \
   DATE_SELECTOR=".event-date" \
   npm start
   ```

### Approach 2: Create a Custom Actor

For venues with complex or unique layouts, create a custom actor.

1. **Create a new actor file:**

   Create `src/actors/[venueName]Actor.js`:

   ```javascript
   const BaseVenueActor = require('./baseVenueActor');

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
       
       // Your custom parsing logic
       $('.event').each((index, element) => {
         const $el = $(element);
         
         events.push({
           eventTitle: $el.find('.title').text().trim(),
           eventDate: $el.find('.date').text().trim(),
           eventUrl: $el.find('a').attr('href')
         });
       });
       
       return events;
     }
   }

   // Enable running directly
   if (require.main === module) {
     const actor = new MyVenueActor();
     actor.run().catch(error => {
       console.error('Actor failed:', error);
       process.exit(1);
     });
   }

   module.exports = MyVenueActor;
   ```

2. **Test your actor:**
   ```bash
   node src/actors/myVenueActor.js
   ```

3. **Update main.js** (if needed):
   
   Add your actor to the main entry point if you want it selectable via configuration.

## CSS Selector Tips

### Finding the Right Selectors

1. **Event Container:** Look for repeating elements
   - Common classes: `.event`, `.show`, `.performance`
   - Structure: Usually a `<div>` or `<li>` element

2. **Event Title:** Usually the most prominent text
   - Common elements: `<h2>`, `<h3>`, `<span>`
   - Common classes: `.title`, `.name`, `.headline`

3. **Event Date:** Look for date/time elements
   - Common elements: `<time>`, `<span>`
   - Common classes: `.date`, `.datetime`
   - May have `datetime` attribute: `<time datetime="2024-12-15">`

4. **Event Link:** Usually wraps the title or entire event
   - Element: `<a>`
   - May need to get `href` attribute

### Testing Selectors in Browser Console

```javascript
// Test event container
document.querySelectorAll('.event-item').length

// Test title selector
document.querySelector('.event-item .event-title').textContent

// Test date selector
document.querySelector('.event-item .event-date').textContent
```

## Artist Parsing

The system automatically extracts artists from event titles. If your venue uses unique patterns, you may need to:

1. **Add new patterns** to `src/utils/artistExtractor.js`
2. **Test with actual event titles** from the venue
3. **Handle edge cases** like multiple supporting acts

## Code Style

- Use camelCase for variables and functions
- Use PascalCase for class names
- Include JSDoc comments for functions
- Keep functions focused and single-purpose

## Testing

Before submitting:

1. **Run the actor** and verify it scrapes events correctly
2. **Check the output** matches the expected format
3. **Test with different dates** if the venue shows upcoming events
4. **Verify artist extraction** works for various title formats

## Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b venue/venue-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear message: `git commit -m "Add support for [Venue Name]"`
6. Push to your fork: `git push origin venue/venue-name`
7. Create a pull request

## Pull Request Guidelines

Include in your PR description:

- **Venue name and URL**
- **Approach used** (generic or custom)
- **CSS selectors used** (if generic)
- **Sample output** showing successful scraping
- **Any special considerations** or edge cases

## Questions?

Open an issue if you need help adding a venue!
