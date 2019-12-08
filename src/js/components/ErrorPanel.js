import React from 'react';

export default class ErrorPanel extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const errors = this.props.errors.map((err, i) => <div key={i} className='alert alert-danger' role='alert'>{err}</div>);
    return <div>
      {errors}
           </div>;
  }
}
