/**
 * Created by 吴天祥 on 2018/7/13 11:07
 * Develop by 吴天祥 on 2018/7/13 11:07
 */
import React from 'react';
import PropTypes from 'prop-types';
import CalenderHeader from './header/CalenderHeader';
import CalenderBody from './body/CalenderBody';

class Calender extends React.Component {
  handleDateChange = (date) => {
    const { onDateChange } = this.props;
    onDateChange(date);
  };

  render() {
    const { calendarDate } = this.props;
    return (
      <div>
        <CalenderHeader
          onDateChange={this.handleDateChange}
          currentDate={calendarDate}
        />
        <CalenderBody
          currentDate={calendarDate}
          onDateChange={this.handleDateChange}
        />
      </div>
    );
  }
}

Calender.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  calendarDate: PropTypes.objectOf(Date).isRequired,
};
Calender.defaultProps = {
  date: new Date(),
};

export default Calender;
