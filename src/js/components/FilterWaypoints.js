import React from 'react';

import AccordionGroup from './AccordionGroup';

/*
	I'd really love to have a map between the header and the collapsable panel
	to allow the user to select areas and/or countries, but I haven't found anything
	suitable
*/
export default class FilterWaypoints extends React.Component {
  render () {
    return <div>
      <h2>Filter Waypoints</h2>
      <p>Click the options below to make changes</p>
      <AccordionGroup />
           </div>;
  }
}
