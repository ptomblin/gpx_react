// Store for extents info
import * as events from '../events';

export default function reducer (state = {
  countries: {},
  states: {},
  provinces: {},
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case events.FETCH_CSP: {
      return { ...state, fetching: true };
    }
    case events.FETCH_CSP_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case events.FETCH_CSP_FULFILLED: {
      // Clone the arrays from the payload
      // Not sure if this is strictly necessary since it's only loaded once.
      const countries = {};
      const states = {};
      const provinces = {};
      action.payload.countries.forEach(c => countries[c.code] = c);
      if (action.payload.states) {
        action.payload.states.forEach(s => states[s.code] = s);
      }
      if (action.payload.provinces) {
        action.payload.provinces.forEach(p => provinces[p.code] = p);
      }
      return {
        ...state,
        fetching: false,
        fetched: true,
        countries: countries,
        states: states,
        provinces: provinces
      };
    }
  }
  return state;
}
