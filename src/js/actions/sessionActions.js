import axios from 'axios';
import * as events from '../events';
import dateFormat from 'dateformat';

export function fetchSession () {
  return function (dispatch) {
    setTimeout(
      function () {
        const today = new Date();
        const aMonth = new Date();
        aMonth.setDate(aMonth.getDate() - 30);
        dispatch({
          type: events.FETCH_SESSION_FULFILLED,
          payload: {
            last_db_update: dateFormat(aMonth, 'isoDate'),
            last_db_generated: dateFormat(today, 'isoDate'),
            selected_airports: new Set(['AIRPORT']),
            selected_navaids: new Set(['DME', 'DVOR/DME', 'FAN MARKER', 'NDB']),
            selected_charts: 3,
            airport_types: [
              { name: 'AIRPORT', selected_by_default: true },
              { name: 'BALLOONPORT', selected_by_default: false },
              { name: 'GLIDERPORT', selected_by_default: false },
              { name: 'HELIPORT', selected_by_default: true },
              { name: 'PARACHUTE', selected_by_default: false },
              { name: 'PLATFORM', selected_by_default: true },
              { name: 'SEAPLANE BASE', selected_by_default: false },
              { name: 'STOLPORT', selected_by_default: false },
              { name: 'ULTRALIGHT', selected_by_default: false }
            ],
            navaid_types: [
              { name: 'DME', selected_by_default: true },
              { name: 'DVOR/DME', selected_by_default: true },
              { name: 'FAN MARKER', selected_by_default: true },
              { name: 'MARINE NDB', selected_by_default: false },
              { name: 'NDB', selected_by_default: true },
              { name: 'NDB/DME', selected_by_default: true },
              { name: 'TACAN', selected_by_default: true },
              { name: 'TVOR', selected_by_default: true },
              { name: 'TVOR/DME', selected_by_default: true },
              { name: 'UHF/NDB', selected_by_default: true },
              { name: 'UNSPECIFIED NAVAID', selected_by_default: true },
              { name: 'VOR', selected_by_default: true },
              { name: 'VOR/DME', selected_by_default: true },
              { name: 'VORTAC', selected_by_default: true },
              { name: 'VOR/TACAN', selected_by_default: true },
              { name: 'VOT', selected_by_default: false }
            ],
            map_types: [
              { name: 'IFR Enroute High Altitude', selected_by_default: false, code: 4 },
              { name: 'IFR Enroute Low Altitude', selected_by_default: true, code: 2 },
              { name: 'Instrument Approach', selected_by_default: false, code: 16 },
              { name: 'RNAV', selected_by_default: false, code: 8 },
              { name: 'VFR (Sectional or WAC)', selected_by_default: true, code: 1 }
            ]
          }
        });
      }, 3000);
    dispatch({
      type: events.FETCH_SESSION
    });
  };
}

export function updateLatLong (payload) {
  return {
    type: events.SESSION_UPDATE_LATLONG,
    payload
  };
}

export function clearCountries () {
  return {
    type: events.SESSION_CLEAR_COUNTRIES
  };
}
export function clearStates () {
  return {
    type: events.SESSION_CLEAR_STATES
  };
}
export function clearProvinces () {
  return {
    type: events.SESSION_CLEAR_PROVINCES
  };
}

export function addCountry (country) {
  return {
    type: events.SESSION_ADD_COUNTRIES,
    payload: country
  };
}
export function addState (state) {
  return {
    type: events.SESSION_ADD_STATES,
    payload: state
  };
}
export function addProvince (province) {
  return {
    type: events.SESSION_ADD_PROVINCES,
    payload: province
  };
}

export function removeCountry (country) {
  return {
    type: events.SESSION_REMOVE_COUNTRIES,
    payload: country
  };
}
export function removeState (state) {
  return {
    type: events.SESSION_REMOVE_STATES,
    payload: state
  };
}
export function removeProvince (province) {
  return {
    type: events.SESSION_REMOVE_PROVINCES,
    payload: province
  };
}

export function updateFineDetails (payload) {
  return {
    type: events.SESSION_UPDATE_FINE,
    payload
  };
}
export function resetFineDetails (payload) {
  return {
    type: events.SESSION_RESET_FINE
  };
}

export function updateAirports (payload) {
  return {
    type: events.SESSION_UPDATE_AIRPORTS,
    payload
  };
}
export function addAirport (airport) {
  return {
    type: events.SESSION_ADD_AIRPORT,
    payload: airport
  };
}
export function removeAirport (airport) {
  return {
    type: events.SESSION_REMOVE_AIRPORT,
    payload: airport
  };
}
export function resetAirports (payload) {
  return {
    type: events.SESSION_RESET_AIRPORTS
  };
}
export function updateNavaids (payload) {
  return {
    type: events.SESSION_UPDATE_NAVAIDS,
    payload
  };
}
export function addNavaid (navaid) {
  return {
    type: events.SESSION_ADD_NAVAID,
    payload: navaid
  };
}
export function removeNavaid (navaid) {
  return {
    type: events.SESSION_REMOVE_NAVAID,
    payload: navaid
  };
}
export function resetNavaids (payload) {
  return {
    type: events.SESSION_RESET_NAVAIDS
  };
}
export function updateMaps (payload) {
  return {
    type: events.SESSION_UPDATE_MAPS,
    payload
  };
}
export function addMap (map) {
  return {
    type: events.SESSION_ADD_MAP,
    payload: map
  };
}
export function removeMap (map) {
  return {
    type: events.SESSION_REMOVE_MAP,
    payload: map
  };
}
export function resetMaps (payload) {
  return {
    type: events.SESSION_RESET_MAPS
  };
}
export function addNote (note) {
  return {
    type: events.SESSION_ADD_NOTE,
    payload: note
  };
}
export function removeNote (note) {
  return {
    type: events.SESSION_REMOVE_NOTE,
    payload: note
  };
}
export function resetNotes (payload) {
  return {
    type: events.SESSION_RESET_NOTES
  };
}
