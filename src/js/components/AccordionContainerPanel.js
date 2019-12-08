import React from 'react';

export class AccordionContainerPanel extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      collapsed: true,
      collapsing: false
    };

    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.endTransition = this.endTransition.bind(this);
    this.getSubPanel = this.getSubPanel.bind(this);
  }

  toggleAccordion () {
    // I was trying to do some fancy collapsing thing here, but it's not working so put it aside for now.
    this.setState(
      {
        collapsing: false, // true
        collapsed: !this.state.collapsed
      }

    );
  }

  endTransition () {
    this.setState(
      {
        collapsing: false
      }
    );
  }

  /*
	 * Abstract Methods
	 */
  getTitle () {
    throw new Error('Unimplemented abstract method getTitle');
  }

  getPrefix () {
    throw new Error('Unimplemented abstract method getPrefix');
  }

  getSubPanel () {
    throw new Error('Unimplemented abstract method getSubPanel');
  }

  getLabel () {
    return this.getPrefix() + 'Label';
  }

  getPanel () {
    return this.getPrefix() + 'Panel';
  }

  render () {
    const SubPanel = this.getSubPanel;
    let classes = 'panel-collapse ';
    if (this.state.collapsing) {
      classes += 'collapsing ';
    }
    if (this.state.collapsed) {
      classes += 'collapse';
    } else {
      classes += 'collapse in';
    }
    console.log('render, collapsing = ' + this.state.collapsing + ', collapsed = ' + this.state.collapsed);
    console.log('classes = ' + classes);
    return <div className='panel panel-default'>
      <div
        className={'panel-heading ' + (this.state.collapsed ? 'collapsed' : '')}
        role='tab'
        id={this.getLabel()}
        onClick={this.toggleAccordion}
      >
        <h4 class='panel-title'>
          {this.getTitle()}
        </h4>
      </div>
      <div
        id={this.getPrefix()}
        className={'panel-collapse ' + classes}
        onTransitionEnd={this.endTransition}
        role='tabpanel'
      >
        <SubPanel />
      </div>
           </div>;
  }
}
