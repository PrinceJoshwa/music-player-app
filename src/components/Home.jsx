import { useState, useEffect } from "react"
import { PlayIcon, PauseIcon, PlusIcon, CheckIcon } from "@heroicons/react/24/solid"
import { musicLibrary } from "../data/musicData"

function MusicSection({ title, tracks, onTrackSelect, onAddToPlaylist, currentTrack, isPlaying, playlistTracks }) {
  const [addedTracks, setAddedTracks] = useState({})

  useEffect(() => {
    const newAddedTracks = {}
    playlistTracks.forEach((track) => {
      newAddedTracks[track.id] = true
    })
    setAddedTracks(newAddedTracks)
  }, [playlistTracks])

  const handlePlayClick = (track) => {
    onTrackSelect(track)
  }

  const handleAddToPlaylist = (track) => {
    onAddToPlaylist(track)
    setAddedTracks((prev) => ({ ...prev, [track.id]: true }))
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tracks.map((track) => (
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
                onClick={() => handlePlayClick(track)}
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
                onClick={() => handleAddToPlaylist(track)}
                className="p-3 bg-blue-500 rounded-full text-white"
                aria-label="Add to playlist"
              >
                {addedTracks[track.id] ? <CheckIcon className="h-6 w-6" /> : <PlusIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="sm:hidden">
        {tracks.map((track) => (
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
                onClick={() => handlePlayClick(track)}
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
                onClick={() => handleAddToPlaylist(track)}
                className="p-2 bg-blue-500 rounded-full text-white"
                aria-label="Add to playlist"
              >
                {addedTracks[track.id] ? <CheckIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home({ onTrackSelect, onAddToPlaylist, currentTrack, isPlaying, playlistTracks }) {
  return (
    <div className="p-4 md:p-8">
      <MusicSection
        title="Your Songs"
        tracks={musicLibrary.yourSongs}
        onTrackSelect={onTrackSelect}
        onAddToPlaylist={onAddToPlaylist}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        playlistTracks={playlistTracks}
      />
      {/* Other MusicSection components... */}
    </div>
  )
}

