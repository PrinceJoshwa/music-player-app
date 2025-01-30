// import { useState, useEffect } from "react"
// import { useLocalStorage } from "./hooks/useLocalStorage"
// import Library from "./components/Library"
// import Playlist from "./components/Playlist"
// import Sidebar from "./components/Sidebar"
// import MusicPlayer from "./components/MusicPlayer"
// import Home from "./components/Home"
// import "./index.css"

// function App() {
//   const [currentTrack, setCurrentTrack] = useState(null)
//   const [playlist, setPlaylist] = useLocalStorage("playlist", [])
//   const [activeTab, setActiveTab] = useState("home")
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

//   const handleTrackSelect = (track) => {
//     setCurrentTrack(track)
//     const index = playlist.findIndex((t) => t.id === track.id)
//     setCurrentTrackIndex(index !== -1 ? index : 0)
//   }

//   const handleAddToPlaylist = (track) => {
//     if (!playlist.find((t) => t.id === track.id)) {
//       setPlaylist([...playlist, track])
//     }
//   }

//   const handleRemoveFromPlaylist = (trackId) => {
//     setPlaylist(playlist.filter((track) => track.id !== trackId))
//   }

//   const handleNextTrack = () => {
//     const nextIndex = (currentTrackIndex + 1) % playlist.length
//     setCurrentTrackIndex(nextIndex)
//     setCurrentTrack(playlist[nextIndex])
//   }

//   const handlePreviousTrack = () => {
//     const previousIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length
//     setCurrentTrackIndex(previousIndex)
//     setCurrentTrack(playlist[previousIndex])
//   }

//   useEffect(() => {
//     if (playlist.length > 0 && !currentTrack) {
//       setCurrentTrack(playlist[0])
//       setCurrentTrackIndex(0)
//     }
//   }, [playlist, currentTrack])

//   return (
//     <div className="flex flex-col h-screen bg-gray-900 text-white">
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//         />

//         <div className="flex-1 flex flex-col overflow-hidden">
//           <main className="flex-1 p-4 md:p-6 overflow-y-auto">
//             {activeTab === "home" && <Home onTrackSelect={handleTrackSelect} onAddToPlaylist={handleAddToPlaylist} />}
//             {activeTab === "playlist" && (
//               <Playlist
//                 playlist={playlist}
//                 onTrackSelect={handleTrackSelect}
//                 onRemoveFromPlaylist={handleRemoveFromPlaylist}
//               />
//             )}
//             {activeTab === "library" && (
//               <Library onTrackSelect={handleTrackSelect} onAddToPlaylist={handleAddToPlaylist} />
//             )}
//           </main>
//         </div>
//       </div>

//       <footer className="bg-gray-800 border-t border-gray-700">
//         <MusicPlayer currentTrack={currentTrack} onNextTrack={handleNextTrack} onPreviousTrack={handlePreviousTrack} />
//       </footer>
//     </div>
//   )
// }

// export default App

import { useState, useEffect, useRef } from "react"
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
  const audioRef = useRef(new Audio())

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
    const nextIndex = (currentTrackIndex + 1) % playlist.length
    setCurrentTrackIndex(nextIndex)
    setCurrentTrack(playlist[nextIndex])
  }

  const handlePreviousTrack = () => {
    const previousIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length
    setCurrentTrackIndex(previousIndex)
    setCurrentTrack(playlist[previousIndex])
  }

  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack.audioUrl
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [currentTrack, isPlaying])

  useEffect(() => {
    if (playlist.length > 0 && !currentTrack) {
      setCurrentTrack(playlist[0])
      setCurrentTrackIndex(0)
    }
  }, [playlist, currentTrack])

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
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
          audioRef={audioRef}
        />
      </footer>
    </div>
  )
}

export default App

