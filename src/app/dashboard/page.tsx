"use client"

import ProtectedPage from "@/components/protected-page"
import AuthButton from "@/components/auth-button"

export default function Dashboard() {
  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Protected Dashboard
            </h1>
            
            <div className="mb-6">
              <AuthButton />
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Authentication Successful!
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      You have successfully authenticated with Google OAuth. 
                      This page is only accessible to authenticated users.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                What's Next?
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Add more OAuth providers (GitHub, Facebook, etc.)</li>
                <li>Implement role-based access control</li>
                <li>Add user profile management</li>
                <li>Integrate with a database to store user data</li>
                <li>Add middleware for route protection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedPage>
  )
}
