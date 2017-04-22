import {AccordionTitle, AccordionPanel} from "./AccordionContainerPanel"
import React from "react"
import {connect} from "react-redux"

import {resetNotes, addNote, removeNote} from "../actions/sessionActions"

const all_notes = [
	{ name: 'Airport Frequencies (Non-Military)', value: 'airfrequencynonmil' },
	{ name: 'Airport Frequencies (Military)', value: 'airfrequencymil' },
	{ name: 'Fix definition info', value: 'fixinfo' },
	{ name: 'Navigation Aid Frequencies', value: 'navfrequency' },
	{ name: 'Runways', value: 'runways' },
	{ name: 'Traffic Pattern Altitude (TPA)', value: 'tpa' },
]

export class NoteContainerPanel extends React.Component {
	constructor(props) {
		super(props)
		this.prefix = "note2"
	}
	render() {
		return <div
				className="panel panel-default">
			<NoteTitle prefix={this.prefix} parent={this.props.parent}/>
			<AccordionPanel prefix={this.prefix} subpanel={NotePanel} />
		</div>
	}
}

@connect((store) => {
	return {
		selected_notes: store.session.selected_notes,
	}
})
class NoteTitle extends AccordionTitle {
	render() {
		let selected_notes = "No Notes Fields"
		if (this.props.selected_notes.size > 0) {
			selected_notes = all_notes.filter(n => this.props.selected_notes.has(n.value)).map(n => n.name).join(", ")
		}
		return this.common_code(this.props.prefix, this.props.parent, "Notes Fields:", selected_notes)
	}
}

@connect((store) => {
	return {
	}
})
class NotePanel extends React.Component {
	constructor(props) {
		super(props)
		this.resetToDefaults = this.resetToDefaults.bind(this)
	}
	resetToDefaults() {
		this.props.dispatch(resetNotes())
	}
	render() {
		let notes = []
		let tuple = []
		all_notes.forEach((n, i) => {
			tuple.push(<NoteCheck key={i} note={n} />)
			if (tuple.length > 2) {
				notes.push(tuple)
				tuple = []
			}
		})
		if (tuple.length > 0) {
			notes.push(tuple)
		}
		const trs = notes.map((c, i) => <tr key={i}>{c}</tr>)
		return <div class="panel-body">
            <h3>"Notes" in the waypoint records</h3>
            <p>This generator uses an extended GPX schema to include extra information for waypoints.
            If your software can use this info, you can select it here.</p>
            <table class="table table-striped table-bordered">
            	<tbody>
               		{trs}
				</tbody>
			</table>
			<button type="button" class="btn btn-default btn-xs" name="resetToDefaults" onClick={this.resetToDefaults}>Clear All</button>
		</div>
	}
}

@connect((store) => {
	return {
		selected_notes: store.session.selected_notes,
	}
})
class NoteCheck extends React.Component {
	constructor(props) {
		super(props)
		this.note = props.note
		this.checkboxChanged = this.checkboxChanged.bind(this)
	}
	checkboxChanged(evt) {
		let is_checked = evt.target.checked
		if (is_checked) {
			this.props.dispatch(addNote(this.note.value))
		} else {
			this.props.dispatch(removeNote(this.note.value))
		}
	}
	render() {
		let is_checked = this.props.selected_notes.has(this.note.value)
		return <td>
			<div class="checkbox">
				<label>
					<input
						type="checkbox"
						name="notes"
						checked={is_checked}
						onChange={this.checkboxChanged}
						/>
					{this.note.name}
				</label>
			</div>
		</td>
	}
}
