import {AccordionTitle, AccordionPanel} from "./AccordionContainerPanel"
import React from "react"
import {connect} from "react-redux"

import {updateMaps, resetMaps, addMap, removeMap} from "../actions/sessionActions"

export class ChartContainerPanel extends React.Component {
	constructor(props) {
		super(props)
		this.prefix = "map2"
	}
	render() {
		return <div
				className="panel panel-default">
			<ChartTitle prefix={this.prefix} parent={this.props.parent}/>
			<AccordionPanel prefix={this.prefix} subpanel={ChartPanel} />
		</div>
	}
}

@connect((store) => {
	return {
		selected_charts: store.session.selected_charts,
		map_types: store.session.map_types,
	}
})
class ChartTitle extends AccordionTitle {
	render() {
		let selected_maps = "No Chart Types"
		if (this.props.selected_charts > 0) {
			selected_maps = this.props.map_types.filter(mt => (mt.code & this.props.selected_charts) != 0).map(mt => mt.name).join(", ")
		}
		console.log("selected_maps = " + selected_maps)
		return this.common_code(this.props.prefix, this.props.parent, "Fixes in Charts", selected_maps)
	}
}

@connect((store) => {
	return {
		maps: store.session.map_types,
	}
})
class ChartPanel extends React.Component {
	constructor(props) {
		super(props)
		this.resetToDefaults = this.resetToDefaults.bind(this)
	}
	resetToDefaults() {
		this.props.dispatch(resetMaps())
	}
	render() {
		let maps = []
		let tuple = []
		this.props.maps.forEach((a, i) => {
			tuple.push(<ChartCheck key={i} map={a} />)
			if (tuple.length > 2) {
				maps.push(tuple)
				tuple = []
			}
		})
		if (tuple.length > 0) {
			maps.push(tuple)
		}
		const trs = maps.map((c, i) => <tr key={i}>{c}</tr>)
		return <div class="panel-body">
            <h3>Fixes in Charts</h3>
            <p>The various datasources I use aren't consistent about the "types" they use for navigational fixes, so it's better to
            select them by the type of chart they appear on.</p>
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
		selected_charts: store.session.selected_charts,
	}
})
class ChartCheck extends React.Component {
	constructor(props) {
		super(props)
		this.map = props.map
		this.checkboxChanged = this.checkboxChanged.bind(this)
	}
	checkboxChanged(evt) {
		let is_checked = evt.target.checked
		if (is_checked) {
			this.props.dispatch(addMap(this.map.code))
		} else {
			this.props.dispatch(removeMap(this.map.code))
		}
	}
	render() {
		let is_checked = (this.props.selected_charts & this.map.code) != 0
		return <td>
			<div class="checkbox">
				<label>
					<input
						type="checkbox"
						name="maps"
						checked={is_checked}
						onChange={this.checkboxChanged}
						/>
					{this.map.name}
				</label>
			</div>
		</td>
	}
}
