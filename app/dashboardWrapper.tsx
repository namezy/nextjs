"use client";
import React, { useEffect } from "react";
import Navbar from "@/app/(components)/Navbar";
import Sidebar from "@/app/(components)/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";
function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div className="flex h-screen min-h-screen w-screen bg-gray-50 text-gray-900">
      {/* sidebar */}
      <Sidebar />
      <main
        className={`transition-all duration-300 flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${isSidebarCollapsed ? "pl-0" : "md:pl-64"}`}
      >
        {/* navbar */}
        <Navbar />
        {children}
      </main>
    </div>
  );
}

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
