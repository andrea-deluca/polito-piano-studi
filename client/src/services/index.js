/*
 * ------------------------ services ----------------------------------
 * 
 * Package:         client
 * Module:          services
 * File:            index.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import api from "./api";
import sessions from "./sessions";
import courses from "./courses";
import plans from "./plans";

export {
    api,
    sessions,
    courses,
    plans
};