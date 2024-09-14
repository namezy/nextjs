"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  AlertCircle,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  OctagonAlert,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const [showProjects, setShowProjects] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  return (
    <div
      className={`fixed z-40 flex h-full flex-col overflow-y-auto bg-white shadow-xl transition-all duration-300 dark:bg-black ${isSidebarCollapsed ? "w-0 overflow-hidden" : "w-64"}`}
    >
      <div className="flex h-full flex-col">
        <div className="flex min-h-[56px] flex-nowrap items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            EDLIST
          </div>
          {!isSidebarCollapsed && (
            <button
              className="py-3"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <X className="h-6 w-6 text-gray-700 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* team */}
        <div className="flex flex-nowrap items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image
            className="h-10 w-10 min-w-10"
            src="/logo.png"
            width={40}
            height={40}
            alt="logo"
          />
          <div>
            <h3 className="whitespace-nowrap text-sm font-bold tracking-wide dark:text-gray-200">
              EDROTH TEAM
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <LockIcon className="h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Private
              </p>
            </div>
          </div>
        </div>
        {/* NAVBAR LINKS */}
        <nav className="w-full">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="Users" href="/users" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>
        {/* PROJECTS LINKS */}
        <button
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          onClick={() => setShowProjects((prev) => !prev)}
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {/* PROJECTS LIST */}
        {/* PRIORITY LINKS */}
        <button
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          onClick={() => setShowPriority((prev) => !prev)}
        >
          <span className="">Priotity</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {/* PRIORITY LIST  */}
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink icon={OctagonAlert} label="Low" href="/priority/low" />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}
const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center justify-start gap-3 px-8 py-3 transition-colors duration-300 hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""} `}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-1 bg-blue-200"></div>
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100"></Icon>
        <span className="font-medium text-gray-800 dark:text-gray-100">
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
