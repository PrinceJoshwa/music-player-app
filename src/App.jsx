import { useState, useEffect } from "react"
import { useLocalStorage } from "./hooks/useLocalStorage"
import Library from "./components/Library"
import Playlist from "./components/Playlist"
import Sidebar from "./components/Sidebar"
import MusicPlayer from "./components/MusicPlayer"
import Home from "./components/Home"
import "./index.css"

function App() {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [playlist, setPlaylist] = useLocalStorage("playlist", [])
  const [activeTab, setActiveTab] = useState("home")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleTrackSelect = (track) => {
    if (currentTrack && currentTrack.id === track.id) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTrack(track)
      const index = playlist.findIndex((t) => t.id === track.id)
      setCurrentTrackIndex(index !== -1 ? index : 0)
      setIsPlaying(true)
    }
  }

  const handleAddToPlaylist = (track) => {
    if (!playlist.find((t) => t.id === track.id)) {
      setPlaylist([...playlist, track])
    }
  }

  const handleRemoveFromPlaylist = (trackId) => {
    setPlaylist(playlist.filter((track) => track.id !== trackId))
  }

  const handleNextTrack = () => {
    if (playlist.length > 0) {
      const nextIndex = (currentTrackIndex + 1) % playlist.length
      setCurrentTrackIndex(nextIndex)
      setCurrentTrack(playlist[nextIndex])
      setIsPlaying(true)
    }
  }

  const handlePreviousTrack = () => {
    if (playlist.length > 0) {
      const previousIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length
      setCurrentTrackIndex(previousIndex)
      setCurrentTrack(playlist[previousIndex])
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if (playlist.length > 0 && !currentTrack) {
      setCurrentTrack(playlist[0])
      setCurrentTrackIndex(0)
    }
  }, [playlist, currentTrack])

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex flex-1 overflow-hidden ">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 p-4 md:p-6 overflow-y-auto pt-16 md:pt-4">
            {activeTab === "home" && (
              <Home
                onTrackSelect={handleTrackSelect}
                onAddToPlaylist={handleAddToPlaylist}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                playlistTracks={playlist}
              />
            )}
            {activeTab === "playlist" && (
              <Playlist
                playlist={playlist}
                onTrackSelect={handleTrackSelect}
                onRemoveFromPlaylist={handleRemoveFromPlaylist}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
              />
            )}
            {activeTab === "library" && (
              <Library
                onTrackSelect={handleTrackSelect}
                onAddToPlaylist={handleAddToPlaylist}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                playlistTracks={playlist}
              />
            )}
          </main>
        </div>
      </div>

      <footer className="bg-gray-800 border-t border-gray-700">
        <MusicPlayer
          currentTrack={currentTrack}
          onNextTrack={handleNextTrack}
          onPreviousTrack={handlePreviousTrack}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </footer>
    </div>
  )
}

export default App

