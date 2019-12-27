import moment from 'moment';  

const formatterTime = (val) => {
	return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : ''
}
export {formatterTime}