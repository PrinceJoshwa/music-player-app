import React from "react"
import { TrashIcon } from "@heroicons/react/24/outline"

export default function Playlist({ playlist, onTrackSelect, onRemoveFromPlaylist }) {
  if (playlist.length === 0) {
    return (
      <div className="p-4 md:p-8 text-center text-gray-400">
        <p>Your playlist is empty. Add some tracks from the library!</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Your Playlist</h2>
      <div className="space-y-4">
        {playlist.map((track) => (
          <div
            key={track.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <img src={track.cover} alt={track.title} className="w-16 h-16 rounded-lg" />
              <div>
                <h3 className="font-semibold">{track.title}</h3>
                <p className="text-gray-400">{track.artist}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => onTrackSelect(track)} className="text-blue-500 hover:text-blue-400">
                Play
              </button>
              <button onClick={() => onRemoveFromPlaylist(track.id)} className="text-gray-400 hover:text-red-500">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

