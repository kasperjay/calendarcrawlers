const BaseVenueActor = require('./baseVenueActor');

/**
 * Generic Venue Actor with flexible configuration
 * This actor can be configured to work with many common venue calendar layouts
 */
class GenericVenueActor extends BaseVenueActor {
    /**
     * @param {Object} config - Venue configuration
     * @param {string} config.venueName - Name of the venue
     * @param {string} config.venueUrl - URL of the venue's calendar page
     * @param {Object} config.selectors - CSS selectors for scraping
     * @param {string} config.selectors.eventContainer - Selector for event containers
     * @param {string} config.selectors.eventTitle - Selector for event title
     * @param {string} config.selectors.eventDate - Selector for event date
     * @param {string} config.selectors.eventLink - Selector for event link
     */
    constructor(config) {
        const selectors = config.selectors || {};
        
        super({
            venueName: config.venueName,
            venueUrl: config.venueUrl,
            parseEvents: ($, pageUrl) => GenericVenueActor.parseEvents($, pageUrl, selectors)
        });
    }

    /**
     * Parse events using configurable selectors
     */
    static parseEvents($, pageUrl, selectors) {
        const events = [];
        
        // Default selectors if not provided
        const eventSelector = selectors.eventContainer || '.event, .show, .performance, [class*="event"]';
        const titleSelector = selectors.eventTitle || '.title, .name, h2, h3, [class*="title"]';
        const dateSelector = selectors.eventDate || '.date, time, [class*="date"]';
        const linkSelector = selectors.eventLink || 'a';

        $(eventSelector).each((index, element) => {
            const $element = $(element);
            
            // Extract event details
            let eventTitle = $element.find(titleSelector).first().text().trim();
            
            // If title not found with selector, try getting from link text
            if (!eventTitle) {
                eventTitle = $element.find('a').first().text().trim();
            }
            
            // Extract date
            let eventDate = $element.find(dateSelector).first().text().trim();
            
            // Try to get date from datetime attribute if available
            if (!eventDate) {
                const timeElement = $element.find('time').first();
                eventDate = timeElement.attr('datetime') || timeElement.text().trim();
            }
            
            // Extract link
            const eventLink = $element.find(linkSelector).first().attr('href');
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

        return events;
    }
}

// Example usage with configuration
if (require.main === module) {
    // Example configuration for a venue
    const venueConfig = {
        venueName: process.env.VENUE_NAME || 'Sample Venue',
        venueUrl: process.env.VENUE_URL || 'https://example.com/events',
        selectors: {
            eventContainer: process.env.EVENT_SELECTOR || '.event-item',
            eventTitle: process.env.TITLE_SELECTOR || '.event-title',
            eventDate: process.env.DATE_SELECTOR || '.event-date',
            eventLink: process.env.LINK_SELECTOR || 'a'
        }
    };

    const actor = new GenericVenueActor(venueConfig);
    actor.run().catch(error => {
        console.error('Actor failed:', error);
        process.exit(1);
    });
}

module.exports = GenericVenueActor;
