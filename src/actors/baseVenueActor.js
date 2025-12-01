const { Actor } = require('apify');
const { CheerioCrawler } = require('crawlee');
const { extractArtists, cleanArtistName } = require('../utils/artistExtractor');
const { formatEventsForSheet } = require('../utils/dataFormatter');

/**
 * Base class for venue calendar actors
 * Extend this class to create venue-specific scrapers
 */
class BaseVenueActor {
    /**
     * @param {Object} config - Actor configuration
     * @param {string} config.venueName - Name of the venue
     * @param {string} config.venueUrl - URL of the venue's calendar page
     * @param {Function} config.parseEvents - Function to parse events from page context
     */
    constructor(config) {
        this.venueName = config.venueName;
        this.venueUrl = config.venueUrl;
        this.parseEvents = config.parseEvents;
        this.events = [];
    }

    /**
     * Initialize and run the actor
     */
    async run() {
        await Actor.init();

        try {
            console.log(`Starting scraper for ${this.venueName}`);
            console.log(`Target URL: ${this.venueUrl}`);

            // Create a crawler
            const self = this;
            const crawler = new CheerioCrawler({
                async requestHandler({ request, $, log }) {
                    log.info(`Scraping ${request.url}`);
                    
                    // Call venue-specific parsing function
                    const rawEvents = await self.parseEvents($, request.url);
                    
                    // Process and format events
                    const processedEvents = rawEvents.map(event => {
                        const artists = extractArtists(event.eventTitle);
                        
                        return {
                            venueName: self.venueName,
                            eventDate: event.eventDate,
                            eventTitle: event.eventTitle,
                            headliner: cleanArtistName(artists.headliner),
                            supportingActs: artists.supportingActs.map(cleanArtistName),
                            eventUrl: event.eventUrl
                        };
                    });

                    self.events.push(...processedEvents);
                    
                    log.info(`Found ${processedEvents.length} events`);
                },
                
                // Error handling
                failedRequestHandler({ request, log }) {
                    log.error(`Request ${request.url} failed multiple times`);
                }
            });

            // Run the crawler
            await crawler.run([this.venueUrl]);

            // Format for Sheet export
            const formattedEvents = formatEventsForSheet(this.events);
            
            console.log(`Total events scraped: ${formattedEvents.length}`);
            
            // Push data to dataset
            await Actor.pushData(formattedEvents);

            console.log('Data pushed to dataset successfully');

        } catch (error) {
            console.error('Actor failed with error:', error);
            throw error;
        } finally {
            await Actor.exit();
        }
    }

    /**
     * Get scraped events
     * @returns {Object[]} Array of scraped events
     */
    getEvents() {
        return this.events;
    }
}

module.exports = BaseVenueActor;
