const BaseVenueActor = require('./baseVenueActor');

/**
 * Example Venue Actor
 * This is a template showing how to create a venue-specific scraper
 * 
 * To create a new venue actor:
 * 1. Copy this file and rename it (e.g., 'theFilmoreActor.js')
 * 2. Update the venueName and venueUrl
 * 3. Customize the parseEvents function to match the venue's HTML structure
 */
class ExampleVenueActor extends BaseVenueActor {
    constructor() {
        super({
            venueName: 'Example Venue',
            venueUrl: 'https://example.com/calendar',
            parseEvents: ExampleVenueActor.parseEvents
        });
    }

    /**
     * Parse events from the venue's calendar page
     * Customize this function based on the venue's HTML structure
     * 
     * @param {CheerioAPI} $ - Cheerio instance loaded with the page
     * @param {string} pageUrl - URL of the page being scraped
     * @returns {Array<Object>} Array of raw event objects
     */
    static parseEvents($, pageUrl) {
        const events = [];

        // Example: Parse events from a typical event listing page
        // Adjust the selectors based on the actual HTML structure
        
        $('.event-item').each((index, element) => {
            const $element = $(element);
            
            // Extract event details
            const eventTitle = $element.find('.event-title').text().trim();
            const eventDate = $element.find('.event-date').text().trim();
            const eventLink = $element.find('a').attr('href');
            
            // Create absolute URL if link is relative
            const eventUrl = eventLink 
                ? (eventLink.startsWith('http') ? eventLink : new URL(eventLink, pageUrl).href)
                : pageUrl;

            if (eventTitle) {
                events.push({
                    eventTitle,
                    eventDate,
                    eventUrl
                });
            }
        });

        return events;
    }
}

// Run the actor if this file is executed directly
if (require.main === module) {
    const actor = new ExampleVenueActor();
    actor.run().catch(error => {
        console.error('Actor failed:', error);
        process.exit(1);
    });
}

module.exports = ExampleVenueActor;
