import React from "react"
import { connect } from "react-redux"

@connect((store) => {
  return {
    session: store.session,
  };
})
export default class LastUpdate extends React.Component {
	render() {
		const {last_db_update, last_db_generated} = this.props.session
		let generated = null
		return  <div>
			<h2>Last Database Update</h2>
		    <p>The database was last updated on {last_db_update || "unknown"}</p>
		    {last_db_generated !== null ?
		    	<p>You last generated a database on {last_db_generated}</p> :
		    	<p>&nbsp;</p>
		    }
		</div>
	}
}