import React from 'react';
import PropTypes from 'prop-types';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isToday } from 'date-fns';
import './Calender.css';

const CalenderSection = ({ slots = [] }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const startOfMonthDate = startOfMonth(currentDate);
  const endOfMonthDate = endOfMonth(currentDate);
  const startOfWeekDate = startOfWeek(startOfMonthDate);
  const endOfWeekDate = endOfWeek(endOfMonthDate);

  const days = eachDayOfInterval({ start: startOfWeekDate, end: endOfWeekDate });
  const monthName = format(currentDate, 'MMMM yyyy');

  const isCurrentDate = (date) => isToday(date);

  const getSlotsForDay = (date) => {
    if (!Array.isArray(slots)) {
      console.error('Slots data is not an array');
      return null;
    }

    return slots
      .filter(slot => slot.date && format(new Date(slot.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
      .map(slot => (
        <div key={slot.startTime} className="fc-slot">
          <div>Doctor: {slot.doctorName || 'N/A'}</div>  {/* Display doctor's name */}
          <div>{slot.startTime || 'N/A'} - {slot.endTime || 'N/A'}</div>
        </div>
      ));
  };

  const renderDays = () => {
    const weeks = [];
    let week = [];
    for (let day of days) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length) weeks.push(week); // Push the last week if incomplete

    return weeks.map((week, weekIndex) => (
      <tr className={`fc-week ${weekIndex === 0 ? 'fc-first' : ''}`} key={weekIndex}>
        {week.map((day) => (
          <td
            key={day}
            className={`fc-day ${format(day, 'eee').toLowerCase()} fc-widget-content ${isCurrentDate(day) ? 'fc-today' : ''}`}
            data-date={format(day, 'yyyy-MM-dd')}
          >
            <div>
              <div className="fc-day-number">{format(day, 'd')}</div>
              <div className="fc-day-content">
                {getSlotsForDay(day)}
              </div>
            </div>
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="col-xxl-9 col-lg-8">
      <div className="card h-100 p-0">
        <div className="card-body p-24">
          <div id="wrap">
            <div id="calendar" className="fc fc-ltr">
              <table className="fc-header" style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td className="fc-header-left">
                      <span className="fc-header-title">
                        <h2>{monthName}</h2>
                      </span>
                    </td>
                    <td className="fc-header-right">
                      <span className="fc-button fc-button-prev fc-state-default fc-corner-left" onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))} unselectable="on">
                        <span className="fc-text-arrow">‹</span>
                      </span>
                      <span className="fc-button fc-button-next fc-state-default fc-corner-right" onClick={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))} unselectable="on">
                        <span className="fc-text-arrow">›</span>
                      </span>
                      <span className="fc-header-space"></span>
                      <span className="fc-button fc-button-today fc-state-default fc-corner-left fc-corner-right" onClick={() => setCurrentDate(new Date())} unselectable="on">today</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="fc-content" style={{ position: 'relative' }}>
                <div className="fc-view fc-view-month fc-grid" style={{ position: 'relative' }} unselectable="on">
                  <table className="fc-border-separate" style={{ width: '100%' }} cellSpacing="0">
                    <thead>
                      <tr className="fc-first fc-last">
                        <th className="fc-day-header fc-mon fc-widget-header fc-first" style={{ width: 159 }}>Sun</th>
                        <th className="fc-day-header fc-tue fc-widget-header" style={{ width: 159 }}>Mon</th>
                        <th className="fc-day-header fc-wed fc-widget-header" style={{ width: 159 }}>Tue</th>
                        <th className="fc-day-header fc-thu fc-widget-header" style={{ width: 159 }}>Wed</th>
                        <th className="fc-day-header fc-fri fc-widget-header" style={{ width: 159 }}>Thu</th>
                        <th className="fc-day-header fc-sat fc-widget-header" style={{ width: 159 }}>Fri</th>
                        <th className="fc-day-header fc-sun fc-widget-header fc-last">Sat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderDays()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CalenderSection.propTypes = {
  slots: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
      doctorId: PropTypes.string,  // Added doctorId for future reference
      doctorName: PropTypes.string  // Display doctorName instead of doctorId
    })
  )
};

CalenderSection.defaultProps = {
  slots: []
};

export default CalenderSection;
