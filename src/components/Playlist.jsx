//31-01-2025
// import React from "react"
// import { TrashIcon } from "@heroicons/react/24/outline"

// export default function Playlist({ playlist, onTrackSelect, onRemoveFromPlaylist }) {
//   if (playlist.length === 0) {
//     return (
//       <div className="p-4 md:p-8 text-center text-gray-400">
//         <p>Your playlist is empty. Add some tracks from the library!</p>
//       </div>
//     )
//   }

//   return (
//     <div className="p-4 md:p-8">
//       <h2 className="text-2xl font-bold mb-6">Your Playlist</h2>
//       <div className="space-y-4">
//         {playlist.map((track) => (
//           <div
//             key={track.id}
//             className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
//           >
//             <div className="flex items-center space-x-4 mb-4 sm:mb-0">
//               <img src={track.cover} alt={track.title} className="w-16 h-16 rounded-lg" />
//               <div>
//                 <h3 className="font-semibold">{track.title}</h3>
//                 <p className="text-gray-400">{track.artist}</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button onClick={() => onTrackSelect(track)} className="text-blue-500 hover:text-blue-400">
//                 Play
//               </button>
//               <button onClick={() => onRemoveFromPlaylist(track.id)} className="text-gray-400 hover:text-red-500">
//                 <TrashIcon className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

import { PlayIcon, PauseIcon, TrashIcon } from "@heroicons/react/24/solid"

export default function Playlist({ playlist, onTrackSelect, onRemoveFromPlaylist, currentTrack, isPlaying }) {
  if (playlist.length === 0) {
    return (
      <div className="p-4 md:p-8 text-center text-gray-400">
        <p>Your playlist is empty. Add some tracks from the library!</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl font-bold mb-6">Your Playlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {playlist.map((track) => (
          <div
            key={track.id}
            className="relative bg-gray-800 p-4 rounded-lg overflow-hidden group hover:bg-gray-700 transition-colors sm:block hidden"
          >
            <img
              src={track.cover || "/placeholder.svg"}
              alt={track.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg">{track.title}</h3>
            <p className="text-gray-400">{track.artist}</p>

            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onTrackSelect(track)}
                className="p-3 bg-white rounded-full text-black mr-2"
                aria-label={isPlaying && currentTrack?.id === track.id ? "Pause" : "Play"}
              >
                {isPlaying && currentTrack?.id === track.id ? (
                  <PauseIcon className="h-6 w-6" />
                ) : (
                  <PlayIcon className="h-6 w-6" />
                )}
              </button>
              <button
                onClick={() => onRemoveFromPlaylist(track.id)}
                className="p-3 bg-red-500 rounded-full text-white"
                aria-label="Remove from playlist"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="sm:hidden">
        {playlist.map((track) => (
          <div
            key={track.id}
            className="flex items-center bg-gray-800 p-4 rounded-lg mb-2 hover:bg-gray-700 transition-colors"
          >
            <img
              src={track.cover || "/placeholder.svg"}
              alt={track.title}
              className="w-16 h-16 object-cover rounded-lg mr-4"
            />
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">{track.title}</h3>
              <p className="text-gray-400">{track.artist}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => onTrackSelect(track)}
                className="p-2 bg-white rounded-full text-black mr-2"
                aria-label={isPlaying && currentTrack?.id === track.id ? "Pause" : "Play"}
              >
                {isPlaying && currentTrack?.id === track.id ? (
                  <PauseIcon className="h-5 w-5" />
                ) : (
                  <PlayIcon className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => onRemoveFromPlaylist(track.id)}
                className="p-2 bg-red-500 rounded-full text-white"
                aria-label="Remove from playlist"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

