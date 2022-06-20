/*
 * ------------------------ date ---------------------------------------
 * 
 * Package:         client
 * Module:          helpers
 * File:            date.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import dayjs from 'dayjs';
import it from 'dayjs/locale/it';

// Return now timestamp
const now = () => dayjs();

// Return a formatted date, starting from the given timestamp
const format = (date) => dayjs(date).locale(it).format('DD MMMM YYYY, HH:mm');

export { now, format };