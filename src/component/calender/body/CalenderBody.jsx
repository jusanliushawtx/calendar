/**
 * Created by 吴天祥 on 2018/7/13 10:29
 * Develop by 吴天祥 on 2018/7/13 10:29
 */
import React from 'react';
import PropTypes from 'prop-types';
import CalenderDay from '../day/CalenderDay';
import styles from './CalenderBody.css';

class CalenderBody extends React.Component {
  handleDateChange = (date) => {
    const { onDateChange } = this.props;
    onDateChange(date);
  };

  render() {
    const { currentDate } = this.props;
    return (
      <div className={styles.body}>
        <div className={styles.body__header}>
          <div className={styles.body__header__item}>
            一
          </div>
          <div className={styles.body__header__item}>
            二
          </div>
          <div className={styles.body__header__item}>
            三
          </div>
          <div className={styles.body__header__item}>
            四
          </div>
          <div className={styles.body__header__item}>
            五
          </div>
          <div className={styles.body__header__item}>
            六
          </div>
          <div className={styles.body__header__item}>
            日
          </div>
        </div>
        <CalenderDay
          currentDate={currentDate}
          onDateChange={this.handleDateChange}
        />
      </div>
    );
  }
}

CalenderBody.propTypes = {
  currentDate: PropTypes.objectOf(Date).isRequired,
  onDateChange: PropTypes.func.isRequired,
};
CalenderBody.defaultProps = {};

export default CalenderBody;
