import React from "react"
import { connect } from "react-redux"

import LastUpdate from "./LastUpdate"
import FilterWaypoints from "./FilterWaypoints"
import StartGenerating from "./StartGenerating"

import {fetchSession} from "../actions/sessionActions"
import {fetchExtents} from "../actions/extentsActions"

@connect((store) => {
  return {
    session: store.session,
  };
})
export default class Layout extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchSession())
    this.props.dispatch(fetchExtents())
  }

  render() {
    return <div>
      <LastUpdate/>
      {
      // I'd really love to put a map on here to pick areas and countries, but I can't find an appropriate one
      // Would a running count of how many waypoints you've selected be fast enough?
      }
      <FilterWaypoints/>
      <StartGenerating />
    </div>
  }
}