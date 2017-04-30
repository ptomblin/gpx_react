import React from "react"
import { connect } from "react-redux"

import LastUpdate from "./LastUpdate"
import FilterWaypoints from "./FilterWaypoints"
import StartGenerating from "./StartGenerating"
import ErrorPanel from "./ErrorPanel"

import {fetchSession} from "../actions/sessionActions"
import {fetchExtents} from "../actions/extentsActions"

@connect((store) => {
  return {
    session: store.session,
  };
})
export default class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(fetchSession())
    this.props.dispatch(fetchExtents())
  }

  outOfRange(str, maxVal) {
    if (!str || isNaN(str)) {
      return false
    }
    let num = Number(str)
    return num < 0 || num > maxVal
  }

  calculateError() {
    let errors = []
    let min_lat = this.props.session.min_latitude_val
    let min_long = this.props.session.min_longitude_val
    let max_lat = this.props.session.max_latitude_val
    let max_long = this.props.session.max_longitude_val
    if (min_lat || min_long || max_lat || max_long) {
      if (!min_lat || !min_long || !max_lat || !max_long) {
        errors.push("Missing latitude(s) or longitude(s)")
      }
      if ((min_lat && isNaN(min_lat)) ||
          (min_long && isNaN(min_long)) ||
          (max_lat && isNaN(max_lat)) ||
          (max_long && isNaN(max_long))) {
        errors.push("Invalid latitude(s) or longitude(s)")
      }
      if (this.outOfRange(min_lat, 90) || this.outOfRange(max_lat, 90) ||
        this.outOfRange(min_long, 180) || this.outOfRange(max_long, 180)) {
        errors.push("Latitude(s)/Longitude(s) values out of range")
      }
    }
    if ((this.props.session.selected_airports.size +
      this.props.session.selected_navaids.size +
      this.props.session.selected_charts) == 0) {
      errors.push("No waypoint types (airports, navaids or charts) selected")
    }
    return errors
  }

  render() {
    const errors = this.calculateError()
    return <div>
      <LastUpdate/>
      <ErrorPanel errors={errors}/>
      {
      // I'd really love to put a map on here to pick areas and countries, but I can't find an appropriate one
      // Would a running count of how many waypoints you've selected be fast enough?
      }
      <FilterWaypoints/>
      <StartGenerating error={errors}/>
    </div>
  }
}