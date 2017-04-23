import {AccordionTitle, AccordionPanel} from "./AccordionContainerPanel"
import React from "react"
import {connect} from "react-redux"

import {updateNavaids, resetNavaids, addNavaid, removeNavaid} from "../actions/sessionActions"

export class NavaidContainerPanel extends React.Component {
	constructor(props) {
		super(props)
		this.prefix = "navaid"
	}
	render() {
		return <div
				className="panel panel-default">
			<NavaidTitle prefix={this.prefix} parent={this.props.parent}/>
			<AccordionPanel prefix={this.prefix} subpanel={NavaidPanel} />
		</div>
	}
}

@connect((store) => {
	return {
		selected_navaids: store.session.selected_navaids,
	}
})
class NavaidTitle extends AccordionTitle {
	render() {
		let selected_navaids = "No Navaid Types"
		if (this.props.selected_navaids.size > 0) {
			selected_navaids = [...this.props.selected_navaids].sort().join(", ")
		}
		return this.common_code(this.props.prefix, this.props.parent, "Navaid Types:", selected_navaids)
	}
}

@connect((store) => {
	return {
		navaids: store.session.navaid_types,
	}
})
class NavaidPanel extends React.Component {
	constructor(props) {
		super(props)
		this.resetToDefaults = this.resetToDefaults.bind(this)
	}
	resetToDefaults() {
		this.props.dispatch(resetNavaids())
	}
	render() {
		let navaids = []
		let tuple = []
		this.props.navaids.forEach((a, i) => {
			tuple.push(<NavaidCheck key={i} navaid={a.name} />)
			if (tuple.length > 2) {
				navaids.push(tuple)
				tuple = []
			}
		})
		if (tuple.length > 0) {
			navaids.push(tuple)
		}
		const trs = navaids.map((c, i) => <tr key={i}>{c}</tr>)
		return <div class="panel-body">
            <h3>Navaid Types</h3>
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
		selected_navaids: store.session.selected_navaids,
	}
})
class NavaidCheck extends React.Component {
	constructor(props) {
		super(props)
		this.navaid = props.navaid
		this.checkboxChanged = this.checkboxChanged.bind(this)
	}
	checkboxChanged(evt) {
		let is_checked = evt.target.checked
		if (is_checked) {
			this.props.dispatch(addNavaid(this.navaid))
		} else {
			this.props.dispatch(removeNavaid(this.navaid))
		}
	}
	render() {
		let is_checked = this.props.selected_navaids.has(this.navaid)
		return <td>
			<div class="checkbox">
				<label>
					<input
						type="checkbox"
						name="navaids"
						checked={is_checked}
						onChange={this.checkboxChanged}
						value={this.navaid}
						/>
					{this.navaid}
				</label>
			</div>
		</td>
	}
}
