/**
 * Main entry point for the calendar crawlers
 * This file allows running any venue actor
 */

const GenericVenueActor = require('./actors/genericVenueActor');
const ExampleVenueActor = require('./actors/exampleVenueActor');

/**
 * Get actor configuration from environment variables or input
 */
async function getActorConfig() {
    const { Actor } = require('apify');
    
    // Try to get input from Apify
    const input = await Actor.getInput();
    
    if (input) {
        return input;
    }
    
    // Fallback to environment variables
    return {
        actorType: process.env.ACTOR_TYPE || 'generic',
        venueName: process.env.VENUE_NAME,
        venueUrl: process.env.VENUE_URL,
        selectors: {
            eventContainer: process.env.EVENT_SELECTOR,
            eventTitle: process.env.TITLE_SELECTOR,
            eventDate: process.env.DATE_SELECTOR,
            eventLink: process.env.LINK_SELECTOR
        }
    };
}

/**
 * Main function to run the appropriate actor
 */
async function main() {
    try {
        const config = await getActorConfig();
        
        console.log('Starting calendar crawler with config:', JSON.stringify(config, null, 2));
        
        let actor;
        
        switch (config.actorType) {
            case 'example':
                actor = new ExampleVenueActor();
                break;
            case 'generic':
            default:
                if (!config.venueName || !config.venueUrl) {
                    throw new Error('venueName and venueUrl are required for generic actor');
                }
                actor = new GenericVenueActor(config);
                break;
        }
        
        await actor.run();
        
    } catch (error) {
        console.error('Main process failed:', error);
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    main();
}

module.exports = { main };
