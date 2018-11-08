/**
 * Created by 吴天祥 on 2018/7/13 11:07
 * Develop by 吴天祥 on 2018/7/13 11:07
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import DateUtil from '../../../util/DateUtil';
import Styles from './CalenderDay.css';

class CalenderDay extends React.Component {
  handleChangeDayClick = (e) => {
    const { currentDate, onDateChange } = this.props;
    const { target: { innerText } } = e;
    if (currentDate.getDate() !== Number(innerText)) {
      onDateChange(new Date(currentDate.getFullYear(),
        currentDate.getMonth(), Number(innerText)));
    }
  };

  renderGrid = (currentDate) => {
    const res = DateUtil.getCalenderDays(currentDate);
    const currentMonth = currentDate.getMonth() + 1;
    return res.map((val, index) => {
      if (currentMonth === val.getMonth() + 1) {
        return (
          <Col key={val} className={`${Styles.day__row__item} ${Styles['day__row--current']}`}>
            <button
              type="button"
              onClick={this.handleChangeDayClick}
              className={(currentDate.getDate()) === val.getDate() ? Styles['button-active'] : ''}
            >
              {val.getDate()}
            </button>
          </Col>
        );
      }
      return (
        <Col key={val} className={Styles.day__row__item}>
          {val.getDate()}
        </Col>
      );
    });
  };

  render() {
    const { currentDate } = this.props;
    return (
      <div className={Styles.day}>
        <Row className={Styles.day__row}>
          {this.renderGrid(currentDate)}
        </Row>
      </div>
    );
  }
}

CalenderDay.propTypes = {
  currentDate: PropTypes.objectOf(Date).isRequired,
  onDateChange: PropTypes.func.isRequired,
};
CalenderDay.defaultProps = {
  selfTimetables: null,
};

export default CalenderDay;
