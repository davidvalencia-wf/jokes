"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams?.get("error") || null

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return "There is a problem with the server configuration."
      case "AccessDenied":
        return "Access was denied. You may not have permission to sign in."
      case "Verification":
        return "The verification token has expired or has already been used."
      default:
        return "An error occurred during authentication."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="text-center space-y-6">
            <div className="text-6xl">😞</div>
            <h1 className="text-3xl font-bold text-white">
              Authentication Error
            </h1>
            <p className="text-gray-300">
              {getErrorMessage(error)}
            </p>
            
            <div className="space-y-3">
              <Link
                href="/auth/signin"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Try Again
              </Link>
              <Link
                href="/"
                className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthError() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700">
            <div className="text-center space-y-6">
              <div className="text-6xl">⏳</div>
              <h1 className="text-3xl font-bold text-white">
                Loading...
              </h1>
            </div>
          </div>
        </div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  )
}
