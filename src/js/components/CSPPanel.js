import {AccordionTitle, AccordionPanel} from "./AccordionContainerPanel"
import React from "react"
import {connect} from "react-redux"

import {clearCountries, addCountry, removeCountry,
		clearStates, addState, removeState,
		clearProvinces, addProvince, removeProvince
} from "../actions/sessionActions"

export class CspContainerPanel extends React.Component {
	constructor(props) {
		super(props)
		this.prefix = "csp"
	}
	render() {
		return <div
				className="panel panel-default">
			<CspTitle prefix={this.prefix} parent={this.props.parent}/>
			<AccordionPanel prefix={this.prefix} subpanel={CspPanel} />
		</div>
	}
}

@connect((store) => {
	return {
		selected_countries: store.session.selected_countries,
		selected_states: store.session.selected_states,
		selected_provinces: store.session.selected_provinces,
	}
})
class CspTitle extends AccordionTitle {
	render() {
		let selected_countries = "All Countries"
		if (this.props.selected_countries.size > 0) {
			selected_countries = "Countries: " + [...this.props.selected_countries].sort().join(", ")
		}
		let selected_states = ""
		if (this.props.selected_states.size > 0) {
			selected_states = ", States: " + [...this.props.selected_states].sort().join(", ")
		}
		let selected_provinces = ""
		if (this.props.selected_provinces.size > 0) {
			selected_provinces = ", Provinces: " + [...this.props.selected_provinces].sort().join(", ")
		}
		let selection = selected_countries + selected_states + selected_provinces
		return this.common_code(this.props.prefix, this.props.parent, "Country/State/Province Selection", selection)
	}
}

@connect((store) => {
	return {
		sel_countries: store.session.selected_countries,
	}
})
class CspPanel extends React.Component {
	constructor(props) {
		super(props)
		this.clearAll = this.clearAll.bind(this)
	}
	clearAll() {
		this.props.dispatch(clearCountries())
		this.props.dispatch(clearStates())
		this.props.dispatch(clearProvinces())
	}
	render() {
		return <div>
			<CountryPanel />
			{this.props.sel_countries.has('US') &&
				<StatePanel />
			}
			{this.props.sel_countries.has('CA') &&
				<ProvincePanel />
			}
			<button type="button" class="btn btn-default btn-xs" name="clearAll" onClick={this.clearAll}>Clear All</button>
		</div>
	}
}

function extentsOverlap(
	min_lat_val, min_lat_ns, max_lat_val, max_lat_ns,
	min_long_val, min_long_ew, max_long_val, max_long_ew,
	csp
) {
	let lat1 = Number(min_lat_val)
	if (min_lat_ns == 'S') {
		lat1 = -1 * lat1
	}
	let lat2 = Number(max_lat_val)
	if (max_lat_ns == 'S') {
		lat2 = -1 * lat2
	}
	let long1 = Number(min_long_val)
	if (min_long_ew == 'W') {
		long1 = -1 * long1
	}
	let long2 = Number(max_long_val)
	if (max_long_ew == 'W') {
		long2 = -1 * long2
	}
	const min_lat = Math.min(lat1, lat2)
	const max_lat = Math.max(lat1, lat2)
	const min_long = Math.min(long1, long2)
	const max_long = Math.max(long1, long2)
	if (csp.east_extents) {
		if (min_lat <= csp.east_extents.max_lat &&
			max_lat >= csp.east_extents.min_lat &&
			min_long <= csp.east_extents.max_long &&
			max_long >= csp.east_extents.min_long) {
			return true
		}
	}
	if (csp.west_extents) {
		if (min_lat <= csp.west_extents.max_lat &&
			max_lat >= csp.west_extents.min_lat &&
			min_long <= csp.west_extents.max_long &&
			max_long >= csp.west_extents.min_long) {
			return true
		}
	}
	return false
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
		countries: store.extents.countries,
	}
})
class CountryPanel extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let country_keys = Object.keys(this.props.countries).filter(ck => ck != "CA" && ck != "US").sort()
		if ("CA" in this.props.countries) {country_keys.unshift("CA");}
		if ("US" in this.props.countries) {country_keys.unshift("US");}
		if (country_keys.length < 1) {
			return	<div class="panel-body">
				<h3>Countries</h3>
	         	<p className="strong">Country data has not loaded yet!</p>
			</div>
		}
		let countries = []
		if (this.props.min_lat_val && this.props.max_lat_val &&
			this.props.min_long_val && this.props.max_long_val) {
			let tuple = []
			country_keys.forEach((c, i) => {
				const country = this.props.countries[c]
				if (extentsOverlap(
					this.props.min_lat_val,
					this.props.min_lat_ns,
					this.props.max_lat_val,
					this.props.max_lat_ns,
					this.props.min_long_val,
					this.props.min_long_ew,
					this.props.max_long_val,
					this.props.max_long_ew,
					country)) {
						tuple.push(<CountryCheck key={c} country={country} />)
					if (tuple.length > 2) {
						countries.push(tuple)
						tuple = []
					}
				}
			})
			if (tuple.length > 0) {
				countries.push(tuple)
			}
		} else {
			let tuple = []
			country_keys.forEach((c, i) => {
				tuple.push(<CountryCheck key={c} country={this.props.countries[c]} />)
				if (tuple.length > 2) {
					countries.push(tuple)
					tuple = []
				}
			})
			if (tuple.length > 0) {
				countries.push(tuple)
			}
		}
		const trs = countries.map((c, i) => <tr key={i}>{c}</tr>)
		return	<div class="panel-body">
			<h3>Countries</h3>
         	<p>If you leave all the checkboxes unchecked, it will return waypoints in all countries that meet all the other criteria. If you select US or Canada, you will be able to select states or provinces from a further list below, or leave those checkboxes empty to select the whole country.</p>
          	<p>The two letter country codes you see below are from <a href="https://en.wikipedia.org/wiki/List_of_FIPS_country_codes">FIPS 10.4</a>, not the more common <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166</a>, which is why you might not recognize some of these codes.</p>
          	<p><strong>Note: Non-USA data is not as current as USA data, so carefully check this data.</strong> Actually, you should always check all this data against current official data sources.</p>
          	<table class="table table-striped table-bordered">
            	<tbody>
              	{trs}
              	</tbody>
            </table>
		</div>
	}
}

@connect((store) => {
	return {
		sel_countries: store.session.selected_countries,
	}
})
class CountryCheck extends React.Component {
	constructor(props) {
		super(props)
		this.country = props.country
		this.checkboxChanged = this.checkboxChanged.bind(this)
	}
	checkboxChanged(evt) {
		let is_checked = evt.target.checked
		if (is_checked) {
			this.props.dispatch(addCountry(this.country.code))
		} else {
			this.props.dispatch(removeCountry(this.country.code))
		}
	}
	render() {
		let is_checked = this.props.sel_countries.has(this.country.code)
		return <td>
			<div class="checkbox">
				<label>
					<input
						type="checkbox"
						name="countries"
						checked={is_checked}
						onChange={this.checkboxChanged}
						value={this.country.code}
						/>
					{this.country.code} - {this.country.name}
				</label>
			</div>
		</td>
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
		states: store.extents.states,
	}
})
class StatePanel extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let state_keys = Object.keys(this.props.states).sort()
		let states = []
		if (this.props.min_lat_val && this.props.max_lat_val &&
			this.props.min_long_val && this.props.max_long_val) {
			let tuple = []
			state_keys.forEach(s => {
				const state = this.props.states[s]
				if (extentsOverlap(
					this.props.min_lat_val,
					this.props.min_lat_ns,
					this.props.max_lat_val,
					this.props.max_lat_ns,
					this.props.min_long_val,
					this.props.min_long_ew,
					this.props.max_long_val,
					this.props.max_long_ew,
					state)) {
						tuple.push(<StateCheck key={s} state={state} />)
					if (tuple.length > 2) {
						states.push(tuple)
						tuple = []
					}
				}
			})
			if (tuple.length > 0) {
				states.push(tuple)
			}
		} else {
			let tuple = []
			state_keys.forEach(s => {
				tuple.push(<StateCheck key={s} state={this.props.states[s]} />)
				if (tuple.length > 2) {
					states.push(tuple)
					tuple = []
				}
			})
			if (tuple.length > 0) {
				states.push(tuple)
			}
		}
		const trs = states.map((s, i) => <tr key={i}>{s}</tr>)
		return	<div class="panel-body">
			<h3>States</h3>
         	<p>Some US waypoints do not have any state associated with them, because they are in strange places like Utirik Island or Mejit Atoll or because they are over water. If you want these US waypoints, be sure and either leave all the state selections unchecked or also check "No State"</p>
          	<table class="table table-striped table-bordered">
            	<tbody>
              	{trs}
              	</tbody>
            </table>
		</div>
	}
}

@connect((store) => {
	return {
		sel_states: store.session.selected_states,
	}
})
class StateCheck extends React.Component {
	constructor(props) {
		super(props)
		this.state = props.state
		this.checkboxChanged = this.checkboxChanged.bind(this)
	}
	checkboxChanged(evt) {
		let is_checked = evt.target.checked
		if (is_checked) {
			this.props.dispatch(addState(this.state.code))
		} else {
			this.props.dispatch(removeState(this.state.code))
		}
	}
	render() {
		let is_checked = this.props.sel_states.has(this.state.code)
		let state_name = this.state.name
		if (this.state.code) {
			state_name = this.state.code + " - " + state_name
		}
		return <td>
			<div class="checkbox">
				<label>
					<input
						type="checkbox"
						name="states"
						checked={is_checked}
						onChange={this.checkboxChanged}
						value={this.state.code}
						/>
					{state_name}
				</label>
			</div>
		</td>
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
		provinces: store.extents.provinces,
	}
})
class ProvincePanel extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let prov_keys = Object.keys(this.props.provinces).sort()
		let provinces = []
		if (this.props.min_lat_val && this.props.max_lat_val &&
			this.props.min_long_val && this.props.max_long_val) {
			let tuple = []
			prov_keys.forEach(p => {
				const province = this.props.provinces[p]
				if (extentsOverlap(
					this.props.min_lat_val,
					this.props.min_lat_ns,
					this.props.max_lat_val,
					this.props.max_lat_ns,
					this.props.min_long_val,
					this.props.min_long_ew,
					this.props.max_long_val,
					this.props.max_long_ew,
					province)) {
						tuple.push(<ProvinceCheck key={p} province={province} />)
					if (tuple.length > 2) {
						provinces.push(tuple)
						tuple = []
					}
				}
			})
			if (tuple.length > 0) {
				provinces.push(tuple)
			}
		} else {
			let tuple = []
			prov_keys.forEach(p => {
				tuple.push(<ProvinceCheck key={p} province={this.props.provinces[p]} />)
				if (tuple.length > 2) {
					provinces.push(tuple)
					tuple = []
				}
			})
			if (tuple.length > 0) {
				provinces.push(tuple)
			}
		}
		const trs = provinces.map((p, i) => <tr key={i}>{p}</tr>)
		return	<div class="panel-body">
			<h3>Provinces</h3>
         	<p>Some Canadian waypoints do not have any province associated with them, because they are in strange places in the gaps between provincial boundaries or they're over wayt. If you want these Canadian waypoints, be sure and either leave all the province selections unchecked or also check "No Province"</p>
          	<table class="table table-striped table-bordered">
            	<tbody>
              	{trs}
              	</tbody>
            </table>
		</div>
	}
}

@connect((store) => {
	return {
		sel_provs: store.session.selected_provinces,
	}
})
class ProvinceCheck extends React.Component {
	constructor(props) {
		super(props)
		this.province = props.province
		this.checkboxChanged = this.checkboxChanged.bind(this)
	}
	checkboxChanged(evt) {
		let is_checked = evt.target.checked
		if (is_checked) {
			this.props.dispatch(addProvince(this.province.code))
		} else {
			this.props.dispatch(removeProvince(this.province.code))
		}
	}
	render() {
		let is_checked = this.props.sel_provs.has(this.province.code)
		let province_name = this.province.name
		if (this.province.code) {
			province_name = this.province.code + " - " + province_name
		}
		return <td>
			<div class="checkbox">
				<label>
					<input
						type="checkbox"
						name="provinces"
						checked={is_checked}
						onChange={this.checkboxChanged}
						value={this.province.code}
						/>
					{province_name}
				</label>
			</div>
		</td>
	}
}
