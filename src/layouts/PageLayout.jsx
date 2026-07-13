import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { ChevronRight, Home } from 'lucide-react';

const PageLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Generate dynamic breadcrumbs
  const pathnames = location.pathname.split('/').filter(x => x);

  const formatBreadcrumb = (name) => {
    return name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex transition-colors duration-300">
      
      {/* Collapsible Left Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

      {/* Main Container */}
      <div
        className="flex-1 flex flex-col min-h-screen transition-all duration-300"
        style={{ paddingLeft: isSidebarCollapsed ? '80px' : '280px' }}
      >
        {/* Top Navbar */}
        <Navbar toggleSidebarCollapse={() => setIsSidebarCollapsed(prev => !prev)} />

        {/* Scrollable Content Area */}
        <main className="flex-grow p-6 flex flex-col gap-6 max-w-[1600px] w-full mx-auto overflow-x-hidden">
          
          {/* Breadcrumb Navigation */}
          {location.pathname !== '/' && (
            <nav className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium select-none animate-fade-in">
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                <Home className="w-3.5 h-3.5" /> Dashboard
              </Link>
              
              {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return (
                  <React.Fragment key={to}>
                    <ChevronRight className="w-3.5 h-3.5" />
                    {last ? (
                      <span className="text-slate-650 dark:text-slate-300 font-semibold">
                        {formatBreadcrumb(value)}
                      </span>
                    ) : (
                      <Link
                        to={to}
                        className="hover:text-primary dark:hover:text-primary-light transition-colors"
                      >
                        {formatBreadcrumb(value)}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          )}

          {/* Nested Page Routes */}
          <div className="flex-1 flex flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
