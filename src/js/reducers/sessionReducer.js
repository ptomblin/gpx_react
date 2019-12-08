// Store for session info
import * as events from '../events';

// airport_types, navaid_types, and map_types should only be loaded from the server and never changed
// on the client. I'd put them in a separate store, except I need them to reset selected_airports,
// selected_navaids and selected_charts

export default function reducer (state = {
  cookie: null,
  last_db_update: null,
  last_db_generated: null,
  min_latitude_val: '',
  min_latitude_ns: 'N',
  max_latitude_val: '',
  max_latitude_ns: 'N',
  min_longitude_val: '',
  min_longitude_ew: 'W',
  max_longitude_val: '',
  max_longitude_ew: 'W',
  selected_countries: new Set(),
  selected_states: new Set(),
  selected_provinces: new Set(),
  use_public: true,
  use_private: false,
  expand_countries: false,
  minimum_runway_length: 0,
  runway_lengths_in: 'F',
  selected_airports: new Set(),
  selected_navaids: new Set(),
  selected_charts: 0,
  airport_types: [],
  navaid_types: [],
  map_types: [],
  selected_notes: new Set(),
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case events.FETCH_SESSION: {
      return { ...state, fetching: true };
    }
    case events.FETCH_SESSION_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case events.FETCH_SESSION_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        ...action.payload
      };
    }

    case events.SESSION_UPDATE_LATLONG: {
      // Because I don't have country/state/province
      // extends in this state, I can't check if this update
      // invalidates the country/state/province selections,
      // so always invalidate them
      const new_state = {
        ...state,
        selected_countries: new Set(),
        selected_states: new Set(),
        selected_provinces: new Set(),
        ...action.payload
      };
      return new_state;
    }

    case events.SESSION_CLEAR_COUNTRIES: {
      return {
        ...state,
        selected_countries: new Set()
      };
    }
    case events.SESSION_CLEAR_STATES: {
      return {
        ...state,
        selected_states: new Set()
      };
    }
    case events.SESSION_CLEAR_PROVINCES: {
      return {
        ...state,
        selected_provinces: new Set()
      };
    }

    case events.SESSION_ADD_COUNTRIES: {
      const countries = new Set(state.selected_countries);
      countries.add(action.payload);
      return {
        ...state,
        selected_countries: countries
      };
    }
    case events.SESSION_ADD_STATES: {
      const states = new Set(state.selected_states);
      states.add(action.payload);
      return {
        ...state,
        selected_states: states
      };
    }
    case events.SESSION_ADD_PROVINCES: {
      const provinces = new Set(state.selected_provinces);
      provinces.add(action.payload);
      return {
        ...state,
        selected_provinces: provinces
      };
    }

    case events.SESSION_REMOVE_COUNTRIES: {
      const countries = new Set(state.selected_countries);
      countries.delete(action.payload);
      let states = state.selected_states;
      let provinces = state.selected_provinces;
      // If you're unchecking US, clear states
      // If you're unchecking CA, clear provinces
      if (action.payload == 'US') {
        states = new Set();
      }
      if (action.payload == 'CA') {
        provinces = new Set();
      }
      return {
        ...state,
        selected_countries: countries,
        selected_states: states,
        selected_provinces: provinces
      };
    }
    case events.SESSION_REMOVE_STATES: {
      const states = new Set(state.selected_states);
      states.delete(action.payload);
      return {
        ...state,
        selected_states: states
      };
    }
    case events.SESSION_REMOVE_PROVINCES: {
      const provinces = new Set(state.selected_provinces);
      provinces.delete(action.payload);
      return {
        ...state,
        selected_provinces: provinces
      };
    }

    case events.SESSION_UPDATE_FINE: {
      return {
        ...state,
        ...action.payload
      };
    }
    case events.SESSION_RESET_FINE: {
      return {
        ...state,
        use_public: true,
        use_private: false,
        expand_countries: false,
        minimum_runway_length: 0,
        runway_lengths_in: 'F'
      };
    }

    case events.SESSION_UPDATE_AIRPORTS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case events.SESSION_ADD_AIRPORT: {
      const airports = new Set(state.selected_airports);
      airports.add(action.payload);
      return {
        ...state,
        selected_airports: airports
      };
    }
    case events.SESSION_REMOVE_AIRPORT: {
      const airports = new Set(state.selected_airports);
      airports.delete(action.payload);
      return {
        ...state,
        selected_airports: airports
      };
    }
    case events.SESSION_RESET_AIRPORTS: {
      const selected_airports = new Set(
        state.airport_types.filter(at => at.selected_by_default).map(at => at.name));
      return {
        ...state,
        selected_airports: selected_airports
      };
    }

    case events.SESSION_UPDATE_NAVAIDS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case events.SESSION_ADD_NAVAID: {
      const navaids = new Set(state.selected_navaids);
      navaids.add(action.payload);
      return {
        ...state,
        selected_navaids: navaids
      };
    }
    case events.SESSION_REMOVE_NAVAID: {
      const navaids = new Set(state.selected_navaids);
      navaids.delete(action.payload);
      return {
        ...state,
        selected_navaids: navaids
      };
    }
    case events.SESSION_RESET_NAVAIDS: {
      const selected_navaids = new Set(
        state.navaid_types.filter(nt => nt.selected_by_default).map(nt => nt.name));
      return {
        ...state,
        selected_navaids: selected_navaids
      };
    }

    case events.SESSION_UPDATE_MAPS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case events.SESSION_ADD_MAP: {
      const map = state.selected_charts | action.payload;
      return {
        ...state,
        selected_charts: map
      };
    }
    case events.SESSION_REMOVE_MAP: {
      const map = state.selected_charts & ~action.payload;
      return {
        ...state,
        selected_charts: map
      };
    }
    case events.SESSION_RESET_MAPS: {
      const map = state.map_types.filter(mt => mt.selected_by_default).reduce((acc, val) => acc | val.code, 0);
      return {
        ...state,
        selected_charts: map
      };
    }

    case events.SESSION_ADD_NOTE: {
      const notes = new Set(state.selected_notes);
      notes.add(action.payload);
      return {
        ...state,
        selected_notes: notes
      };
    }
    case events.SESSION_REMOVE_NOTE: {
      const notes = new Set(state.selected_notes);
      notes.delete(action.payload);
      return {
        ...state,
        selected_notes: notes
      };
    }
    case events.SESSION_RESET_NOTES: {
      return {
        ...state,
        selected_notes: new Set()
      };
    }
  }

  return state;
}
