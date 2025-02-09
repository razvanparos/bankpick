import React from "react";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <main className="flex items-center justify-center">
      <Outlet />
    </main>
  );
}

export default Layout;
