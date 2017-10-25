import {AccordionContainerPanel} from "./AccordionContainerPanel"
import React from "react"
import {connect} from "react-redux"

import {updateMaps, resetMaps, addMap, removeMap} from "../actions/sessionActions"

@connect((store) => {
	return {
		selected_charts: store.session.selected_charts,
		map_types: store.session.map_types,
	}
})
export class ChartContainerPanel extends AccordionContainerPanel {
	constructor(props) {
		super(props)
		this.resetToDefaults = this.resetToDefaults.bind(this)
	}

	getTitle() {
		let selected_maps = "No Chart Types"
		if (this.props.selected_charts > 0) {
			selected_maps = this.props.map_types.filter(mt => (mt.code & this.props.selected_charts) != 0).map(mt => mt.name).join(", ")
		}
		return "Fixes in Charts : " + selected_maps
	}

	getPrefix() {
		return "map"
	}

	resetToDefaults() {
		this.props.dispatch(resetMaps())
	}

	getSubPanel() {
		let map_types = []
		let tuple = []
		this.props.map_types.forEach((a, i) => {
			tuple.push(<ChartCheck key={i} map={a} />)
			if (tuple.length > 2) {
				map_types.push(tuple)
				tuple = []
			}
		})
		if (tuple.length > 0) {
			map_types.push(tuple)
		}
		const trs = map_types.map((c, i) => <tr key={i}>{c}</tr>)
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
