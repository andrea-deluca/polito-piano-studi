/*
 * ------------------------ api ----------------------------------------
 * 
 * Package:         client
 * Module:          services
 * File:            api.js
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-08
 * 
 * Used in:         
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import sessions from "./sessions";
import courses from "./courses";
import plans from "./plans";

const api = {
    sessions,
    courses,
    plans
}

export default api;