import {AccordionTitle, AccordionPanel} from "./AccordionContainerPanel"
import React from "react"
import {connect} from "react-redux"

import {updateLatLong} from "../actions/sessionActions"

export class GeographicalContainerPanel extends React.Component {
	constructor(props) {
		super(props)
		this.prefix = "geographicArea"
	}
	render() {
		return <div
				className="panel panel-default">
			<GeographicalTitle prefix={this.prefix} parent={this.props.parent}/>
			<AccordionPanel prefix={this.prefix} subpanel={GeographicalPanel} />
		</div>
	}
}

@connect((store) => {
	return {
		min_lat_val: store.session.min_latitude_val,
		min_lat_ns: store.session.min_latitude_ns,
		max_lat_val: store.session.max_latitude_val,
		max_lat_ns: store.session.max_latitude_ns,
		min_long_val: store.session.min_longitude_val,
		min_long_ew: store.session.min_longitude_ew,
		max_long_val: store.session.max_longitude_val,
		max_long_ew: store.session.max_longitude_ew,
	}
})
class GeographicalTitle extends AccordionTitle {
	render() {
		let selected_area = "None"
		if (this.props.min_lat_val || this.props.max_lat_val ||
			this.props.min_long_val || this.props.max_long_val) {
			selected_area = "(" + this.props.min_lat_val + this.props.min_lat_ns +
				", " + this.props.min_long_val + this.props.min_long_ew + ") - (" +
				this.props.max_lat_val + this.props.max_lat_ns + ", " +
				this.props.max_long_val + this.props.max_long_ew + ")"
		}
		return this.common_code(this.props.prefix, this.props.parent, "Geographic Area", selected_area)
	}
}

@connect((store) => {
	return {
	}
})
class GeographicalPanel extends React.Component {
	constructor(props) {
		super(props)
		this.clearAll = this.clearAll.bind(this)
	}
	clearAll() {
		this.props.dispatch(updateLatLong({
			min_latitude_ns: 'N',
			min_latitude_val: '',
			max_latitude_ns: 'N',
			max_latitude_val: '',
			min_longitude_ew: 'W',
			min_longitude_val: '',
			max_longitude_ew: 'W',
			max_longitude_val: '',
			})
		)
	}
	render() {
		return <div class="panel-body">
			<h3>Geographic Area</h3>
			<p>Select the a geographic area to restrict your selection to.
			This will also reduce the number of countries or states/provinces
			that are shown in the Country/State Selection panel.</p>
			<table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>Minimum<br/>(decimal degrees NN.NNN)</th>
                  <th>Maximum<br/>(decimal degrees NN.NNN)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Latitude</th>
                  <td>
                  	<MinimumLatitude />
                  </td>
                  <td>
                  	<MaximumLatitude />
                  </td>
                </tr>
                <tr>
                  <th scope="row">Longitude</th>
                  <td>
                  	<MinimumLongitude />
                  </td>
                  <td>
                  	<MaximumLongitude />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="button" class="btn btn-default btn-xs" name="clearAll" onClick={this.clearAll}>Clear All</button>
		</div>
	}
}

// TODO: Coerce lat/long entries into valid numbers
@connect((store) => {
	return {
		value: store.session.min_latitude_val,
		ns: store.session.min_latitude_ns,
	}
})
class MinimumLatitude extends React.Component {
	constructor(props) {
		super(props)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSelectChange = this.handleSelectChange.bind(this)
	}

	handleInputChange(event) {
		this.props.dispatch(updateLatLong({min_latitude_val: event.target.value}))
	}

	handleSelectChange(event) {
		this.props.dispatch(updateLatLong({min_latitude_ns: event.target.value}))
	}

	render() {
		return <div class="row">
	  		<div class="col-sm-8">
	  			<input
	  				type="text"
	  				class="form-control"
	  				placeholder="Minimum Latitude"
	  				value={this.props.value}
	  				onInput={this.handleInputChange}/>
	  		</div>
	  		<div class="col-sm-4">
	  			<select class="form-control" value={this.props.ns} onChange={this.handleSelectChange}>
	  				<option value="N">North</option>
	  				<option value="S">South</option>
	  			</select>
	  		</div>
	  	</div>
	}
}

@connect((store) => {
	return {
		value: store.session.max_latitude_val,
		ns: store.session.max_latitude_ns,
	}
})
class MaximumLatitude extends React.Component {
	constructor(props) {
		super(props)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSelectChange = this.handleSelectChange.bind(this)
	}

	handleInputChange(event) {
		this.props.dispatch(updateLatLong({max_latitude_val: event.target.value}))
	}

	handleSelectChange(event) {
		this.props.dispatch(updateLatLong({max_latitude_ns: event.target.value}))
	}

	render() {
		return <div class="row">
	  		<div class="col-sm-8">
	  			<input
	  				type="text"
	  				class="form-control"
	  				placeholder="Maximum Latitude"
	  				value={this.props.value}
	  				onInput={this.handleInputChange}/>
	  		</div>
	  		<div class="col-sm-4">
	  			<select class="form-control" value={this.props.ns} onChange={this.handleSelectChange}>
	  				<option value="N">North</option>
	  				<option value="S">South</option>
	  			</select>
	  		</div>
	  	</div>
	}
}


@connect((store) => {
	return {
		value: store.session.min_longitude_val,
		ew: store.session.min_longitude_ew,
	}
})
class MinimumLongitude extends React.Component {
	constructor(props) {
		super(props)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSelectChange = this.handleSelectChange.bind(this)
	}

	handleInputChange(event) {
		this.props.dispatch(updateLatLong({min_longitude_val: event.target.value}))
	}

	handleSelectChange(event) {
		this.props.dispatch(updateLatLong({min_longitude_ew: event.target.value}))
	}

	render() {
		return <div class="row">
	  		<div class="col-sm-8">
	  			<input
	  				type="text"
	  				class="form-control"
	  				placeholder="Minimum Longitude"
	  				value={this.props.value}
	  				onInput={this.handleInputChange}/>
	  		</div>
	  		<div class="col-sm-4">
	  			<select class="form-control" value={this.props.ew} onChange={this.handleSelectChange}>
	  				<option value="E">East</option>
	  				<option value="W">West</option>
	  			</select>
	  		</div>
	  	</div>
	}
}

@connect((store) => {
	return {
		value: store.session.max_longitude_val,
		ew: store.session.max_longitude_ew,
	}
})
class MaximumLongitude extends React.Component {
	constructor(props) {
		super(props)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSelectChange = this.handleSelectChange.bind(this)
	}

	handleInputChange(event) {
		this.props.dispatch(updateLatLong({max_longitude_val: event.target.value}))
	}

	handleSelectChange(event) {
		this.props.dispatch(updateLatLong({max_longitude_ew: event.target.value}))
	}

	render() {
		return <div class="row">
	  		<div class="col-sm-8">
	  			<input
	  				type="text"
	  				class="form-control"
	  				placeholder="Maximum Longitude"
	  				value={this.props.value}
	  				onInput={this.handleInputChange}/>
	  		</div>
	  		<div class="col-sm-4">
	  			<select class="form-control" value={this.props.ew} onChange={this.handleSelectChange}>
	  				<option value="E">East</option>
	  				<option value="W">West</option>
	  			</select>
	  		</div>
	  	</div>
	}
}
