"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "../auth/LogoutButton";

interface NavbarProps {
  user: {
    nama: string;
    email: string;
    role: string;
    wilayah_nama?: string | null;
  };
}

const ROLE_LABEL: Record<string, string> = {
  warga: "Warga",
  petugas_pos: "Petugas Pos",
  admin_pemda: "Admin Pemda",
  pusat: "Admin Pusat",
};

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [showLaporanMenu, setShowLaporanMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isDashboardActive = pathname?.startsWith("/dashboard");
  const isLaporanActive = pathname?.startsWith("/laporan");
  const isProfileActive = pathname === "/profile";

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
                <span className="text-xl font-bold text-white">DR</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Dengar Rakyat</span>
            </Link>

            {/* Main Navigation */}
            <div className="hidden md:flex md:space-x-1">
              {/* Dashboard Link */}
              <Link
                href={
                  user.role === "pusat"
                    ? "/dashboard/pusat"
                    : user.role === "admin_pemda"
                    ? "/dashboard/pemda"
                    : user.role === "petugas_pos"
                    ? "/dashboard/pos"
                    : "/dashboard"
                }
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isDashboardActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Dashboard
              </Link>

              {/* Laporan Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowLaporanMenu(!showLaporanMenu)}
                  onBlur={() => setTimeout(() => setShowLaporanMenu(false), 200)}
                  className={`flex items-center space-x-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isLaporanActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span>Laporan</span>
                  <svg
                    className={`h-4 w-4 transition-transform ${showLaporanMenu ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showLaporanMenu && (
                  <div className="absolute left-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
                    <div className="py-1">
                      <Link
                        href="/laporan/baru"
                        className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <span>Buat Laporan Baru</span>
                      </Link>
                      <Link
                        href="/laporan"
                        className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span>Laporan Saya</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Profile & Logout */}
          <div className="flex items-center space-x-4">
            {/* User Info & Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                onBlur={() => setTimeout(() => setShowProfileMenu(false), 200)}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-sm font-semibold text-white shadow-md">
                  {user.nama.charAt(0).toUpperCase()}
                </div>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium text-gray-900">{user.nama}</p>
                  <p className="text-xs text-gray-500">{ROLE_LABEL[user.role]}</p>
                </div>
                <svg
                  className={`hidden h-4 w-4 text-gray-500 transition-transform md:block ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg">
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">{user.nama}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    {user.wilayah_nama && (
                      <p className="mt-1 text-xs text-gray-500">📍 {user.wilayah_nama}</p>
                    )}
                  </div>
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>Profil Saya</span>
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Pengaturan</span>
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-2">
                    <LogoutButton />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="border-t border-gray-200 md:hidden">
        <div className="flex justify-around py-2">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center space-y-1 px-3 py-2 ${
              isDashboardActive ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link
            href="/laporan"
            className={`flex flex-col items-center space-y-1 px-3 py-2 ${
              isLaporanActive ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-xs">Laporan</span>
          </Link>
          <Link
            href="/profile"
            className={`flex flex-col items-center space-y-1 px-3 py-2 ${
              isProfileActive ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs">Profil</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
