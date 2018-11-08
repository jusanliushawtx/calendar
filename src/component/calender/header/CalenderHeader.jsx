/**
 * Created by 吴天祥 on 2018/7/13 10:26
 * Develop by 吴天祥 on 2018/7/13 10:26
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import DateUtil from '../../../util/DateUtil';
import Styles from './CalenderHeader.css';

class CalenderHeader extends React.Component {
  setYearMonth = (offsetMonth) => {
    const { currentDate, onDateChange } = this.props;
    onDateChange(DateUtil.offsetYearMonth(offsetMonth, currentDate));
  };

  handleBackClick = () => {
    this.setYearMonth(-1);
  };

  handleForwardClick = () => {
    this.setYearMonth(+1);
  };

  render() {
    const { currentDate } = this.props;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    return (
      <div className={Styles.header}>
        <div className={Styles.header__left}>
          <div className={Styles.header__left__month}>
            <span>
              {month < 10 ? `0${month}` : month}
            </span>
            月
          </div>
          <div className={Styles.header__left__year}>
            <span>
              {year}
            </span>
            年
          </div>
        </div>
        <div className={Styles.header__right}>
          <button type="button" onClick={this.handleBackClick}>
            <Icon type="left" />
          </button>
          <button type="button" onClick={this.handleForwardClick}>
            <Icon type="right" />
          </button>
        </div>
      </div>
    );
  }
}

CalenderHeader.propTypes = {
  currentDate: PropTypes.objectOf(Date).isRequired,
  onDateChange: PropTypes.func.isRequired,
};
CalenderHeader.defaultProps = {};


export default CalenderHeader;
