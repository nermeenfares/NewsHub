import React, { useState } from "react";
import { Menu, X, Search, Globe } from "lucide-react";
import { ThemeDropdown } from "../dropdowns/ThemeDropdown";

const Navbar = ({ onSearchToggle, onMobileMenuToggle, isMobileMenuOpen }) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Globe className="h-8 w-8 text-blue-600" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900">NewsHub</h1>
              <span className="text-xs text-gray-500 hidden sm:block">
                Your Global News Source
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              World
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Technology
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Business
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Sports
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={onSearchToggle}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />

              {/* <ThemeDropdown /> */}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={onMobileMenuToggle}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-3">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              >
                World
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              >
                Technology
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              >
                Business
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              >
                Sports
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
