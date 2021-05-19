import Moment from 'moment';

const convertDateTime = (dateTime) => Moment(dateTime).format('DD-MM-YYYY HH:mm');

export default convertDateTime;
