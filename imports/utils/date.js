import Moment from 'moment';

export function extractDate(date) {
  return new Moment(date).format('YYYY-MM-DD');
}

export function setTimeToMidnight(date) {
  let res = new Date(date);
  res.setHours(0, 0, 0, 0);

  return res;
}
  
export function addDays(date, days) {
  let res = new Date(date);
  res.setDate(res.getDate() + days);

  return res;
}