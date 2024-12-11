import React from 'react';
import { ApiTester } from './components/ApiTester';
import { ApiDocumentation } from './components/ApiDocumentation';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold">Course Management API</h1>
          </div>
        </div>
      </nav>
      <main className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ApiDocumentation />
          <ApiTester />
        </div>
      </main>
    </div>
  );
}

export default App;