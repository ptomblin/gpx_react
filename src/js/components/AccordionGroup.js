import React from "react"

import {GeographicalContainerPanel} from "./GeographicalPanel"
import {CspContainerPanel} from "./CSPPanel"
import {FineDetailsContainerPanel} from "./FineDetailsPanel"
import {AirportContainerPanel} from "./AirportPanel"
import {NavaidContainerPanel} from "./NavaidPanel"
import {ChartContainerPanel} from "./ChartPanel"
import {NoteContainerPanel} from "./NotesPanel"


export default class AccordionGroup extends React.Component {
	constructor() {
		super()
		this.id = "accordion"
	}

	render() {
		return <div className="panel-group" id={this.id} role="tabllist" aria-multiselectable="false">
			<GeographicalContainerPanel parent={this.id}/>
			<CspContainerPanel parent={this.id} />
			<FineDetailsContainerPanel parent={this.id} />
			<AirportContainerPanel parent={this.id} />
			<NavaidContainerPanel parent={this.id} />
			<ChartContainerPanel parent={this.id} />
			<NoteContainerPanel parent={this.id} />
		</div>
	}
}