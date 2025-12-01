const BaseVenueActor = require('./baseVenueActor');

/**
 * Bandsintown Venue Actor
 * Many venues use Bandsintown widget for their event listings
 * This actor is designed to work with those venues
 */
class BandsintownVenueActor extends BaseVenueActor {
    /**
     * @param {Object} config
     * @param {string} config.venueName - Name of the venue
     * @param {string} config.venueUrl - URL of the venue's calendar page
     */
    constructor(config) {
        super({
            venueName: config.venueName,
            venueUrl: config.venueUrl,
            parseEvents: BandsintownVenueActor.parseEvents
        });
    }

    /**
     * Parse events from Bandsintown widget
     * Bandsintown typically uses specific class names and structure
     */
    static parseEvents($, pageUrl) {
        const events = [];

        // Bandsintown common selectors
        const selectors = [
            '.bit-event',           // Bandsintown widget event container
            '.bit-upcoming-event',  // Alternative Bandsintown class
            '[data-bit-event]'      // Data attribute approach
        ];

        // Try each selector until we find events
        for (const selector of selectors) {
            const $events = $(selector);
            
            if ($events.length > 0) {
                $events.each((index, element) => {
                    const $element = $(element);
                    
                    // Common Bandsintown structure
                    let eventTitle = $element.find('.bit-artist, .artist-name').text().trim();
                    let eventDate = $element.find('.bit-date, .event-date').text().trim();
                    let eventLink = $element.find('a').first().attr('href');

                    // Fallback: try getting from link text if title not found
                    if (!eventTitle) {
                        eventTitle = $element.find('a').first().text().trim();
                    }

                    // Try datetime attribute
                    if (!eventDate) {
                        const timeElement = $element.find('time');
                        eventDate = timeElement.attr('datetime') || timeElement.text().trim();
                    }

                    const eventUrl = eventLink 
                        ? (eventLink.startsWith('http') ? eventLink : new URL(eventLink, pageUrl).href)
                        : pageUrl;

                    if (eventTitle) {
                        events.push({
                            eventTitle,
                            eventDate: eventDate || 'Date TBD',
                            eventUrl
                        });
                    }
                });
                
                // If we found events with this selector, stop trying others
                if (events.length > 0) {
                    break;
                }
            }
        }

        return events;
    }
}

// Run the actor if this file is executed directly
if (require.main === module) {
    const venueName = process.env.VENUE_NAME || 'Bandsintown Venue';
    const venueUrl = process.env.VENUE_URL || 'https://example.com/events';
    
    const actor = new BandsintownVenueActor({ venueName, venueUrl });
    actor.run().catch(error => {
        console.error('Actor failed:', error);
        process.exit(1);
    });
}

module.exports = BandsintownVenueActor;
