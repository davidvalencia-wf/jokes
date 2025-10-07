"use client"

import { useSession, signOut } from "next-auth/react"
import Image from "next/image"

export function UserProfile() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        <span className="text-white">Loading...</span>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <a
        href="/app/auth/signin"
        className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        Sign In
      </a>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div className="text-white">
          <p className="font-semibold">{session?.user?.name}</p>
          <p className="text-sm text-gray-300">{session?.user?.email}</p>
        </div>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/app" })}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        Sign Out
      </button>
    </div>
  )
}
