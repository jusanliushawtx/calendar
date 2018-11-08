import React, { Component } from 'react';
import Calender from './component/calender/Calender';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarDate: new Date(),
    }
  }
  handleDateChange = (date) => {
    this.setState({
      calendarDate: date,
    })
  };

  render() {
    const { calendarDate } = this.state;
    return (
      <div className="App">
        <div
          style={{
            width: '30rem'
          }}
        >
          <Calender
            calendarDate={calendarDate}
            onDateChange={this.handleDateChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
