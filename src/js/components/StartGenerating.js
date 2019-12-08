import React from 'react';

export default class StartGenerating extends React.Component {
  render () {
    // You can only generate a database if you've selected one or more airport, navaid or chart types
    let classes = 'btn btn-primary';
    if (this.props.error != '') {
      classes += ' disabled';
    }
    return <div className='row'>
      <div className='col-md-12 text-center'>
        <button
          id='generate'
          name='generate'
          className={classes}
        >Start Generating
        </button>
      </div>
           </div>;
  }
}
