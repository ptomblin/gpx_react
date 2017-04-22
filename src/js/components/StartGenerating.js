import React from "react"
import { connect } from "react-redux"

@connect((store) => {
  return {
    session: store.session,
  };
})
export default class StartGenerating extends React.Component {
	render() {
		// You can only generate a database if you've selected one or more airport, navaid or chart types
		const {selected_airports, selected_navaids, selected_charts} = this.props.session
		const canGenerate = selected_airports.size > 0 || selected_navaids.size > 0 || selected_charts > 0
		let classes = "btn btn-primary"
		if (!canGenerate) {
			classes += " disabled"
		}
		return  <div clasName="row">
			<div className="col-md-12 text-center">
				<button
					id="generate"
					name="generate"
					className={classes}
				>Start Generating</button>
			</div>
		</div>
	}
}