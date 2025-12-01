/**
 * Utility functions for extracting artist information from event text
 */

/**
 * Extract headliner and supporting acts from event text
 * Common patterns:
 * - "Artist A with Artist B"
 * - "Artist A w/ Artist B"
 * - "Artist A ft. Artist B"
 * - "Artist A + Artist B"
 * - "Artist A, Artist B, Artist C"
 * 
 * @param {string} eventText - Event title or description text
 * @returns {Object} Object with headliner and supportingActs
 */
function extractArtists(eventText) {
    if (!eventText || typeof eventText !== 'string') {
        return { headliner: '', supportingActs: [] };
    }

    const text = eventText.trim();
    
    // Pattern 1: "Artist with/w/ Artist"
    // Non-capturing group (?:...) used to match but not capture parentheses or end of string
    const withPattern = /^([^(]+?)\s+(?:with|w\/)\s+(.+?)(?=\s*\(|$)/i;
    let match = text.match(withPattern);
    if (match) {
        return {
            headliner: match[1].trim(),
            supportingActs: splitArtists(match[2])
        };
    }

    // Pattern 2: "Artist ft./feat./featuring Artist"
    const featPattern = /^([^(]+?)\s+(?:ft\.|feat\.|featuring)\s+(.+?)(?=\s*\(|$)/i;
    match = text.match(featPattern);
    if (match) {
        return {
            headliner: match[1].trim(),
            supportingActs: splitArtists(match[2])
        };
    }

    // Pattern 3: "Artist + Artist" or "Artist & Artist"
    const plusPattern = /^([^+&]+)[+&](.+?)(?=\s*\(|$)/;
    match = text.match(plusPattern);
    if (match) {
        return {
            headliner: match[1].trim(),
            supportingActs: splitArtists(match[2])
        };
    }

    // Default: treat entire text as headliner
    return {
        headliner: text.split('(')[0].trim(),
        supportingActs: []
    };
}

/**
 * Split a string of multiple artists into an array
 * @param {string} artistsText - Text containing multiple artists
 * @returns {string[]} Array of artist names
 */
function splitArtists(artistsText) {
    if (!artistsText) return [];
    
    // Split by common separators: comma, ampersand, plus, "and"
    return artistsText
        .split(/,|\+|&|\band\b/i)
        .map(artist => artist.trim())
        .filter(artist => artist.length > 0);
}

/**
 * Clean artist name by removing common prefixes/suffixes
 * @param {string} artistName - Raw artist name
 * @returns {string} Cleaned artist name
 */
function cleanArtistName(artistName) {
    if (!artistName) return '';
    
    return artistName
        .replace(/\([^)]*\)/g, '') // Remove parenthetical text
        .replace(/\[[^\]]*\]/g, '') // Remove bracketed text
        .trim();
}

module.exports = {
    extractArtists,
    splitArtists,
    cleanArtistName
};
