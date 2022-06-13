import dayjs from 'dayjs';
import it from 'dayjs/locale/it';

const now = () => dayjs();
const format = (date) => dayjs(date).locale(it).format('DD MMMM YYYY, hh:mm');

export { now, format };