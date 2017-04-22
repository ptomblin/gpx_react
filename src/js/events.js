// Events

// Get a list of countries, states and provinces and their extents
export const FETCH_CSP = "FETCH_CSP"
export const FETCH_CSP_REJECTED = "FETCH_CSP_REJECTED"
export const FETCH_CSP_FULFILLED = "FETCH_CSP_FULFILLED"

// Get the current "session state" for the user
// ie send their cookie, and get back what they generated last time.
// If there isn't a cookie, get back a cookie to store and defaults
export const FETCH_SESSION = "FETCH_SESSION"
export const FETCH_SESSION_REJECTED = "FETCH_SESSION_REJECTED"
export const FETCH_SESSION_FULFILLED = "FETCH_SESSION_FULFILLED"


export const SESSION_UPDATE_LATLONG = "SESSION_UPDATE_LATLONG"
export const SESSION_CLEAR_COUNTRIES = "SESSION_CLEAR_COUNTRIES"
export const SESSION_CLEAR_STATES = "SESSION_CLEAR_STATES"
export const SESSION_CLEAR_PROVINCES = "SESSION_CLEAR_PROVINCES"
export const SESSION_ADD_COUNTRIES = "SESSION_ADD_COUNTRIES"
export const SESSION_ADD_STATES = "SESSION_ADD_STATES"
export const SESSION_ADD_PROVINCES = "SESSION_ADD_PROVINCES"
export const SESSION_REMOVE_COUNTRIES = "SESSION_REMOVE_COUNTRIES"
export const SESSION_REMOVE_STATES = "SESSION_REMOVE_STATES"
export const SESSION_REMOVE_PROVINCES = "SESSION_REMOVE_PROVINCES"

export const SESSION_UPDATE_FINE = "SESSION_UPDATE_FINE"
export const SESSION_RESET_FINE = "SESSION_RESET_FINE"

export const SESSION_UPDATE_AIRPORTS = "SESSION_UPDATE_AIRPORTS"
export const SESSION_ADD_AIRPORT = "SESSION_ADD_AIRPORT"
export const SESSION_REMOVE_AIRPORT = "SESSION_REMOVE_AIRPORT"
export const SESSION_RESET_AIRPORTS = "SESSION_RESET_AIRPORTS"

export const SESSION_UPDATE_NAVAIDS = "SESSION_UPDATE_NAVAIDS"
export const SESSION_ADD_NAVAID = "SESSION_ADD_NAVAID"
export const SESSION_REMOVE_NAVAID = "SESSION_REMOVE_NAVAID"
export const SESSION_RESET_NAVAIDS = "SESSION_RESET_NAVAIDS"

export const SESSION_UPDATE_MAPS = "SESSION_UPDATE_MAPS"
export const SESSION_ADD_MAP = "SESSION_ADD_MAP"
export const SESSION_REMOVE_MAP = "SESSION_REMOVE_MAP"
export const SESSION_RESET_MAPS = "SESSION_RESET_MAPS"

export const SESSION_ADD_NOTE = "SESSION_ADD_NOTE"
export const SESSION_REMOVE_NOTE = "SESSION_REMOVE_NOTE"
export const SESSION_RESET_NOTES = "SESSION_RESET_NOTES"