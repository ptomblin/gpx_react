import {AccordionTitle, AccordionPanel} from "./AccordionContainerPanel"
import React from "react"
import {connect} from "react-redux"

import {updateFineDetails, resetFineDetails} from "../actions/sessionActions"

export class FineDetailsContainerPanel extends React.Component {
	constructor(props) {
		super(props)
		this.prefix = "fineDetails"
	}
	render() {
		return <div
				className="panel panel-default">
			<FineDetailsTitle prefix={this.prefix} parent={this.props.parent}/>
			<AccordionPanel prefix={this.prefix} subpanel={FineDetailsPanel} />
		</div>
	}
}

@connect((store) => {
	return {
		use_public: store.session.use_public,
		use_private: store.session.use_private,
		expand_countries: store.session.expand_countries,
		minimum_runway_length: store.session.minimum_runway_length,
		runway_lengths_in: store.session.runway_lengths_in,
	}
})
export class FineDetailsTitle extends AccordionTitle {
	render() {
		let selected_fine = "None"
		let titles = []
		if (this.props.use_public) {
			titles.push("Public Airports/Navaids")
		}
		if (this.props.use_private) {
			titles.push("Private Airports/Navaids")
		}
		if (this.props.expand_countries) {
			titles.push("Expand Country Codes")
		}
		if (this.props.minimum_runway_length) {
			titles.push("Minimum Runway Length: " + this.props.minimum_runway_length)
		}
		if (this.props.runway_lengths_in) {
			if (this.props.runway_lengths_in == "F") {
				titles.push("Runway Units: Feet")
			} else if (this.props.runway_lengths_in == "M") {
				titles.push("Runway Units: Metres")
			}
		}
		if (titles.length > 0) {
			selected_fine = titles.join(", ")
		}
		return this.common_code(
			this.props.prefix, this.props.parent, "Fine Details Selection", selected_fine)
	}
}

@connect((store) => {
	return {
	}
})
export class FineDetailsPanel extends React.Component {
	constructor(props) {
		super(props)
		this.resetAll = this.resetAll.bind(this)
	}
	resetAll() {
		this.props.dispatch(resetFineDetails())
	}
	render() {
		return <div class="panel-body">
			<h3>Fine Details</h3>
			<table class="table table-striped table-bordered">
				<tbody>
					<tr>
						<PublicAirports />
					</tr>
					<tr>
						<PrivateAirports />
					</tr>
					<tr>
						<ExpandCountries />
					</tr>
					<tr>
						<MinimumRunwayLength />
						<RunwayLengthUnits />
					</tr>
				</tbody>
            </table>
            <button
            	type="button"
            	className="btn btn-default btn-xs"
            	name="resetAll"
            	onClick={this.resetAll}>Reset to Defaults</button>
		</div>
	}
}

@connect((store) => {
	return {
		use_public: store.session.use_public,
	}
})
class PublicAirports extends React.Component {
	constructor(props) {
		super(props)
		this.checkboxChanged = this.checkboxChanged.bind(this)
	}

	checkboxChanged(event) {
		this.props.dispatch(updateFineDetails({use_public: event.target.checked}))
	}

	render() {
		return <td colSpan="2">
			<div class="checkbox">
				<label>
					<input
						type="checkbox"
						checked={this.props.use_public}
						onChange={this.checkboxChanged}
						name="public_airports"/>Include Public Airports/Navaids?
				</label>
			</div>
		</td>
	}
}

@connect((store) => {
	return {
		use_private: store.session.use_private,
	}
})
class PrivateAirports extends React.Component {
	constructor(props) {
		super(props)
		this.checkboxChanged = this.checkboxChanged.bind(this)
	}

	checkboxChanged(event) {
		this.props.dispatch(updateFineDetails({use_private: event.target.checked}))
	}

	render() {
		return <td colSpan="2">
			<div class="checkbox">
				<label>
					<input
						type="checkbox"
						checked={this.props.use_private}
						onChange={this.checkboxChanged}
						name="private_airports"/>Include Private Airports/Navaids?
				</label>
			</div>
		</td>
	}
}

@connect((store) => {
	return {
		expand_countries: store.session.expand_countries,
	}
})
class ExpandCountries extends React.Component {
	constructor(props) {
		super(props)
		this.checkboxChanged = this.checkboxChanged.bind(this)
	}

	checkboxChanged(event) {
		this.props.dispatch(updateFineDetails({expand_countries: event.target.checked}))
	}

	render() {
		return <td colSpan="2">
			<div class="checkbox">
				<label>
					<input
						type="checkbox"
						checked={this.props.expand_countries}
						onChange={this.checkboxChanged}
						name="expand_countries"/>Expand Country Codes?
				</label>
			</div>
		</td>
	}
}

@connect((store) => {
	return {
		minimum_runway_length: store.session.minimum_runway_length,
	}
})
class MinimumRunwayLength extends React.Component {
	constructor(props) {
		super(props)
		this.numberChanged = this.numberChanged.bind(this)
	}

	numberChanged(event) {
		this.props.dispatch(updateFineDetails({minimum_runway_length: event.target.value}))
	}

	render() {
		return <td>
			<div class="form-inline">
				<div class="form-group">
					<label for="runway_length">Minimum Runway Length &nbsp;</label>
					<input
						type="text"
						name="runway_length"
						className="form-control"
						id="runway_length"
						value={this.props.minimum_runway_length}
						onInput={this.numberChanged}
						placeholder=""/>
				</div>
			</div>
		</td>
	}
}


@connect((store) => {
	return {
		runway_lengths_in: store.session.runway_lengths_in,
	}
})
class RunwayLengthUnits extends React.Component {
	constructor(props) {
		super(props)
		this.unitChanged = this.unitChanged.bind(this)
	}

	unitChanged(event) {
		this.props.dispatch(updateFineDetails({runway_lengths_in: event.target.value}))
	}

	render() {
		return  <td>
	    	<div class="row">
	        	<div class="col-md-6 text-right">Runway Lengths In</div>
	        	<div class="col-md-6">
	        		<label class="radio-inline">
	        			<input
	        				type="radio"
	        				name="runway_lengths_in"
	        				value="F"
	        				checked={this.props.runway_lengths_in == "F"}
	        				onChange={this.unitChanged}
	        			/>Feet
	        		</label>
	        		<label class="radio-inline">
	        			<input
	        				type="radio"
	        				name="runway_lengths_in"
	        				value="M"
	        				checked={this.props.runway_lengths_in == "M"}
	        				onChange={this.unitChanged}
	        			/>Metres
	        		</label>
	        	</div>
	        </div>
	    </td>
	}
}
