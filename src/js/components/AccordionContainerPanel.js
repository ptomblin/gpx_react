import React from "react"

// Abstract base classes for accordion panels


export class AccordionTitle extends React.Component {
	common_code(prefix, id, title, selected) {
		let parent = "#" + id
		let label = prefix + "Label"
		let panel = prefix + "Panel"
		let hashpanel = "#" + panel
		return <div
				className="panel-heading"
				role="tab"
				id={label}
				data-toggle="collapse"
				data-parent={parent}
				data-target={hashpanel}
				aria-expanded="true"
				aria-controls={panel}>
			<h4 class="panel-title">
				<a role="button">{title}: {selected}</a>
			</h4>
		</div>
	}
}

export class AccordionPanel extends React.Component {
	render() {
		const prefix = this.props.prefix
		let id = prefix + "Panel"
		let label = prefix + "Label"
		const title = this.props.title
		const SubPanel = this.props.subpanel
		return <div id={id} className="panel-collapse collapse" role="tabpanel" aria-labelledby={label}>
				<SubPanel />
		</div>
	}
}