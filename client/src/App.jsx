/*
 * ------------------------ App ---------------------------------------
 * 
 * Package:         client
 * File:            App.jsx
 * 
 * Author:          Andrea Deluca - S303906
 * Last modified:   2022-06-21
 * 
 * Copyright (c) 2022 - Andrea Deluca
 * All rights reserved.
 * --------------------------------------------------------------------
 */

import { Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from 'framer-motion'

import { Session } from "./contexts";
import { Utils } from "./components";
import * as Pages from "./pages";

function App() {
  const location = useLocation();

  return (
    <Session.SessionProvider>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route element={<Utils.LayoutRoute />}>
            <Route element={<Utils.GuestRoute />}>
              <Route index path="/" element={<Pages.Home />} />
              <Route path="/login" element={<Pages.Login />} />
            </Route>
            <Route path="/esplora" element={<Pages.Explore />} />
            <Route element={<Utils.ProtectedRoute />}>
              <Route path="/dashboard" element={<Pages.Dashboard />} />
              <Route path="/study-plan" element={<Pages.Plan />} />
              <Route path="/study-plan/edit" element={<Pages.EditPlan />} />
            </Route>
            <Route path="*" element={<Pages.NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Session.SessionProvider>
  );
}

export default App;