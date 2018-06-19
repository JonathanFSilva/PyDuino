import React from 'react';

import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';


function TabContainer(props) {
  return (
      <textarea
        readOnly
        value={props.children}
        style={
          {
            fontSize: 16,
            resize: 'none',
            backgroundColor: '#e8e8e8',
            width: '100%',
            height: '18vh',
            padding: '0px',
            border: 'none',
            outline: 'none'
          }
        }
      />
  );
}

class Console extends React.PureComponent {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { tokens, errors } = this.props;

    return (
      <div>
        <Paper style={{ backgroundColor: '#EEE' }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor={'primary'}
            textColor={'primary'}
          >
            <Tab label="Tokens" />
            <Tab label="Saída" />
          </Tabs>
        </Paper>
        {
          value === 0 &&
          <TabContainer>
            {tokens}
          </TabContainer>
        }
        {
          value === 1 &&
          <TabContainer>
            {errors}
          </TabContainer>
        }
      </div>
    );
  }
}

export default Console;
