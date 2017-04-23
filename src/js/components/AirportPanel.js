import {AccordionTitle, AccordionPanel} from "./AccordionContainerPanel"
import React from "react"
import {connect} from "react-redux"

import {updateAirports, resetAirports, addAirport, removeAirport} from "../actions/sessionActions"

export class AirportContainerPanel extends React.Component {
	constructor(props) {
		super(props)
		this.prefix = "airport"
	}
	render() {
		return <div
				className="panel panel-default">
			<AirportTitle prefix={this.prefix} parent={this.props.parent}/>
			<AccordionPanel prefix={this.prefix} subpanel={AirportPanel} />
		</div>
	}
}

@connect((store) => {
	return {
		selected_airports: store.session.selected_airports,
	}
})
class AirportTitle extends AccordionTitle {
	render() {
		let selected_airports = "No Airport Types"
		if (this.props.selected_airports.size > 0) {
			selected_airports = [...this.props.selected_airports].sort().join(", ")
		}
		return this.common_code(this.props.prefix, this.props.parent, "Airport Types:", selected_airports)
	}
}

@connect((store) => {
	return {
		airports: store.session.airport_types,
	}
})
class AirportPanel extends React.Component {
	constructor(props) {
		super(props)
		this.resetToDefaults = this.resetToDefaults.bind(this)
	}
	resetToDefaults() {
		this.props.dispatch(resetAirports())
	}
	render() {
		let airports = []
		let tuple = []
		this.props.airports.forEach((a, i) => {
			tuple.push(<AirportCheck key={i} airport={a.name} />)
			if (tuple.length > 2) {
				airports.push(tuple)
				tuple = []
			}
		})
		if (tuple.length > 0) {
			airports.push(tuple)
		}
		const trs = airports.map((c, i) => <tr key={i}>{c}</tr>)
		return <div class="panel-body">
            <h3>Airport Types</h3>
            <table class="table table-striped table-bordered">
            	<tbody>
               		{trs}
				</tbody>
			</table>
			<button type="button" class="btn btn-default btn-xs" name="resetToDefaults" onClick={this.resetToDefaults}>Reset To Defaults</button>
		</div>
	}
}

@connect((store) => {
	return {
		selected_airports: store.session.selected_airports,
	}
})
class AirportCheck extends React.Component {
	constructor(props) {
		super(props)
		this.airport = props.airport
		this.checkboxChanged = this.checkboxChanged.bind(this)
	}
	checkboxChanged(evt) {
		let is_checked = evt.target.checked
		if (is_checked) {
			this.props.dispatch(addAirport(this.airport))
		} else {
			this.props.dispatch(removeAirport(this.airport))
		}
	}
	render() {
		let is_checked = this.props.selected_airports.has(this.airport)
		return <td>
			<div class="checkbox">
				<label>
					<input
						type="checkbox"
						name="airports"
						checked={is_checked}
						onChange={this.checkboxChanged}
						value={this.airport}
						/>
					{this.airport}
				</label>
			</div>
		</td>
	}
}
