/**
 * Utility functions for formatting scraped data for Google Sheets export
 */

/**
 * Format event data for Google Sheets
 * @param {Object} event - Event data
 * @param {string} event.venueName - Name of the venue
 * @param {string} event.eventDate - Date of the event
 * @param {string} event.eventTitle - Title of the event
 * @param {string} event.headliner - Main/headlining artist
 * @param {string[]} event.supportingActs - Array of supporting acts
 * @param {string} event.eventUrl - URL to the event page
 * @returns {Object} Formatted event object
 */
function formatEventForSheet(event) {
    return {
        venue: event.venueName || '',
        date: event.eventDate || '',
        title: event.eventTitle || '',
        headliner: event.headliner || '',
        supportingActs: (event.supportingActs || []).join(', '),
        url: event.eventUrl || '',
        scrapedAt: new Date().toISOString()
    };
}

/**
 * Format multiple events for Google Sheets
 * @param {Object[]} events - Array of event objects
 * @returns {Object[]} Array of formatted events
 */
function formatEventsForSheet(events) {
    return events.map(formatEventForSheet);
}

/**
 * Create a sheet-ready data structure with headers
 * @param {Object[]} events - Array of formatted event objects
 * @returns {Object} Object with headers and data arrays
 */
function createSheetData(events) {
    const formattedEvents = formatEventsForSheet(events);
    
    return {
        headers: ['Venue', 'Date', 'Title', 'Headliner', 'Supporting Acts', 'URL', 'Scraped At'],
        data: formattedEvents.map(event => [
            event.venue,
            event.date,
            event.title,
            event.headliner,
            event.supportingActs,
            event.url,
            event.scrapedAt
        ])
    };
}

module.exports = {
    formatEventForSheet,
    formatEventsForSheet,
    createSheetData
};
