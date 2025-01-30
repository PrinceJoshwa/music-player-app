import { PlayIcon, PlusIcon } from "@heroicons/react/24/solid"
import { musicLibrary } from "../data/musicData"

function MusicSection({ title, tracks, onTrackSelect, onAddToPlaylist }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="relative bg-gray-800 p-4 rounded-lg overflow-hidden group hover:bg-gray-700 transition-colors"
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
                aria-label="Play"
              >
                <PlayIcon className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToPlaylist(track)
                }}
                className="p-3 bg-blue-500 rounded-full text-white"
                aria-label="Add to playlist"
              >
                <PlusIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home({ onTrackSelect, onAddToPlaylist }) {
  return (
    <div className="p-4 md:p-8">
      <MusicSection
        title="Your Songs"
        tracks={musicLibrary.yourSongs}
        onTrackSelect={onTrackSelect}
        onAddToPlaylist={onAddToPlaylist}
      />
      {/* <MusicSection
        title="Recently Played"
        tracks={musicLibrary.recentlyPlayed}
        onTrackSelect={onTrackSelect}
        onAddToPlaylist={onAddToPlaylist}
      />
      <MusicSection
        title="Trending Now"
        tracks={musicLibrary.trending}
        onTrackSelect={onTrackSelect}
        onAddToPlaylist={onAddToPlaylist}
      />
      <MusicSection
        title="For You"
        tracks={musicLibrary.forYou}
        onTrackSelect={onTrackSelect}
        onAddToPlaylist={onAddToPlaylist}
      /> */}
    </div>
  )
}

