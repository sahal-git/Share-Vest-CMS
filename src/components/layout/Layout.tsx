import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Settings, LayoutGrid, Terminal } from 'lucide-react';
import { Logo } from '../common/Logo';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Categories', href: '/categories', icon: LayoutGrid },
  { name: 'API Tester', href: '/api-tester', icon: Terminal },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed inset-y-0 flex w-64 flex-col">
          {/* Sidebar content */}
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <Link to="/" className="flex items-center">
                  <Logo size="lg" />
                </Link>
              </div>
              <nav className="mt-8 flex-1 space-y-1 px-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                        isActive
                          ? 'bg-green-50 text-green-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 flex-shrink-0 ${
                          isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">ShareVest Admin</p>
                  <p className="text-xs text-gray-500">v1.0.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="pl-64 flex-1">
          <main className="py-8 px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
