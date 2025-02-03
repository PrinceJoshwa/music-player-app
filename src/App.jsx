
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
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [isDarkMode, setIsDarkMode] = useLocalStorage("darkMode", true)

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark")
//     } else {
//       document.documentElement.classList.remove("dark")
//     }
//   }, [isDarkMode])

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode)
//   }

//   const handleTrackSelect = (track) => {
//     if (currentTrack && currentTrack.id === track.id) {
//       setIsPlaying(!isPlaying)
//     } else {
//       setCurrentTrack(track)
//       const index = playlist.findIndex((t) => t.id === track.id)
//       setCurrentTrackIndex(index !== -1 ? index : 0)
//       setIsPlaying(true)
//     }
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
//     if (playlist.length > 0) {
//       const nextIndex = (currentTrackIndex + 1) % playlist.length
//       setCurrentTrackIndex(nextIndex)
//       setCurrentTrack(playlist[nextIndex])
//       setIsPlaying(true)
//     }
//   }

//   const handlePreviousTrack = () => {
//     if (playlist.length > 0) {
//       const previousIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length
//       setCurrentTrackIndex(previousIndex)
//       setCurrentTrack(playlist[previousIndex])
//       setIsPlaying(true)
//     }
//   }

//   useEffect(() => {
//     if (playlist.length > 0 && !currentTrack) {
//       setCurrentTrack(playlist[0])
//       setCurrentTrackIndex(0)
//     }
//   }, [playlist, currentTrack])

//   return (
//     <div
//       className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}
//     >
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//           isDarkMode={isDarkMode}
//           toggleTheme={toggleTheme}
//         />

//         <div className="flex-1 flex flex-col overflow-hidden">
//           <main className="flex-1 p-4 md:p-6 overflow-y-auto pt-16 md:pt-4">
//             {activeTab === "home" && (
//               <Home
//                 onTrackSelect={handleTrackSelect}
//                 onAddToPlaylist={handleAddToPlaylist}
//                 currentTrack={currentTrack}
//                 isPlaying={isPlaying}
//                 playlistTracks={playlist}
//               />
//             )}
//             {activeTab === "playlist" && (
//               <Playlist
//                 playlist={playlist}
//                 onTrackSelect={handleTrackSelect}
//                 onRemoveFromPlaylist={handleRemoveFromPlaylist}
//                 currentTrack={currentTrack}
//                 isPlaying={isPlaying}
//               />
//             )}
//             {activeTab === "library" && (
//               <Library
//                 onTrackSelect={handleTrackSelect}
//                 onAddToPlaylist={handleAddToPlaylist}
//                 currentTrack={currentTrack}
//                 isPlaying={isPlaying}
//                 playlistTracks={playlist}
//               />
//             )}
//           </main>
//         </div>
//       </div>

//       <footer className="bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
//         <MusicPlayer
//           currentTrack={currentTrack}
//           onNextTrack={handleNextTrack}
//           onPreviousTrack={handlePreviousTrack}
//           isPlaying={isPlaying}
//           setIsPlaying={setIsPlaying}
//         />
//       </footer>
//     </div>
//   )
// }

// export default App

// import { useState, useEffect } from "react"
// import { useLocalStorage } from "./hooks/useLocalStorage"
// import Library from "./components/Library"
// import Playlist from "./components/Playlist"
// import Sidebar from "./components/Sidebar"
// import MusicPlayer from "./components/MusicPlayer"
// import Home from "./components/Home"
// import { musicLibrary } from "./data/musicData"
// import "./index.css"

// function App() {
//   const [currentTrack, setCurrentTrack] = useState(null)
//   const [playlist, setPlaylist] = useLocalStorage("playlist", [])
//   const [activeTab, setActiveTab] = useState("home")
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [isDarkMode, setIsDarkMode] = useLocalStorage("darkMode", true)

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark")
//     } else {
//       document.documentElement.classList.remove("dark")
//     }
//   }, [isDarkMode])

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode)
//   }

//   const handleTrackSelect = (track) => {
//     if (currentTrack && currentTrack.id === track.id) {
//       setIsPlaying(!isPlaying)
//     } else {
//       setCurrentTrack(track)
//       setIsPlaying(true)
//     }
//   }

//   const handleAddToPlaylist = (track) => {
//     if (!playlist.find((t) => t.id === track.id)) {
//       setPlaylist([...playlist, track])
//     }
//   }

//   const handleRemoveFromPlaylist = (trackId) => {
//     setPlaylist(playlist.filter((track) => track.id !== trackId))
//   }

//   const getAllTracks = () => [
//     ...musicLibrary.yourSongs,
//     ...musicLibrary.recentlyPlayed,
//     ...musicLibrary.trending,
//     ...musicLibrary.forYou,
//   ]

//   const handleNextTrack = () => {
//     const allTracks = getAllTracks()
//     const currentIndex = allTracks.findIndex((track) => track.id === currentTrack.id)
//     const nextIndex = (currentIndex + 1) % allTracks.length
//     setCurrentTrack(allTracks[nextIndex])
//     setIsPlaying(true)
//   }

//   const handlePreviousTrack = () => {
//     const allTracks = getAllTracks()
//     const currentIndex = allTracks.findIndex((track) => track.id === currentTrack.id)
//     const previousIndex = (currentIndex - 1 + allTracks.length) % allTracks.length
//     setCurrentTrack(allTracks[previousIndex])
//     setIsPlaying(true)
//   }

//   useEffect(() => {
//     if (!currentTrack) {
//       const allTracks = getAllTracks()
//       setCurrentTrack(allTracks[0])
//     }
//   }, [currentTrack, getAllTracks]) // Added getAllTracks to dependencies

//   return (
//     <div
//       className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}
//     >
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//           isDarkMode={isDarkMode}
//           toggleTheme={toggleTheme}
//         />

//         <div className="flex-1 flex flex-col overflow-hidden">
//           <main className="flex-1 p-4 md:p-6 overflow-y-auto pt-16 md:pt-4">
//             {activeTab === "home" && (
//               <Home
//                 onTrackSelect={handleTrackSelect}
//                 onAddToPlaylist={handleAddToPlaylist}
//                 currentTrack={currentTrack}
//                 isPlaying={isPlaying}
//                 playlistTracks={playlist}
//               />
//             )}
//             {activeTab === "playlist" && (
//               <Playlist
//                 playlist={playlist}
//                 onTrackSelect={handleTrackSelect}
//                 onRemoveFromPlaylist={handleRemoveFromPlaylist}
//                 currentTrack={currentTrack}
//                 isPlaying={isPlaying}
//               />
//             )}
//             {activeTab === "library" && (
//               <Library
//                 onTrackSelect={handleTrackSelect}
//                 onAddToPlaylist={handleAddToPlaylist}
//                 currentTrack={currentTrack}
//                 isPlaying={isPlaying}
//                 playlistTracks={playlist}
//               />
//             )}
//           </main>
//         </div>
//       </div>

//       <footer className="bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
//         <MusicPlayer
//           currentTrack={currentTrack}
//           onNextTrack={handleNextTrack}
//           onPreviousTrack={handlePreviousTrack}
//           isPlaying={isPlaying}
//           setIsPlaying={setIsPlaying}
//         />
//       </footer>
//     </div>
//   )
// }

// export default App

import { useState, useEffect } from "react"
import { useLocalStorage } from "./hooks/useLocalStorage"
import Library from "./components/Library"
import Playlist from "./components/Playlist"
import Sidebar from "./components/Sidebar"
import MusicPlayer from "./components/MusicPlayer"
import Home from "./components/Home"
import { musicLibrary } from "./data/musicData"
import "./index.css"

function App() {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [playlist, setPlaylist] = useLocalStorage("playlist", [])
  const [activeTab, setActiveTab] = useState("home")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDarkMode, setIsDarkMode] = useLocalStorage("darkMode", true)
  const [hasPlayedTrack, setHasPlayedTrack] = useState(false) // New state

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleTrackSelect = (track) => {
    if (currentTrack && currentTrack.id === track.id) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTrack(track)
      setIsPlaying(true)
      setHasPlayedTrack(true) // Set to true when a track is played
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

  const getAllTracks = () => [
    ...musicLibrary.yourSongs,
    ...musicLibrary.recentlyPlayed,
    ...musicLibrary.trending,
    ...musicLibrary.forYou,
  ]

  const handleNextTrack = () => {
    const allTracks = getAllTracks()
    const currentIndex = allTracks.findIndex((track) => track.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % allTracks.length
    setCurrentTrack(allTracks[nextIndex])
    setIsPlaying(true)
  }

  const handlePreviousTrack = () => {
    const allTracks = getAllTracks()
    const currentIndex = allTracks.findIndex((track) => track.id === currentTrack.id)
    const previousIndex = (currentIndex - 1 + allTracks.length) % allTracks.length
    setCurrentTrack(allTracks[previousIndex])
    setIsPlaying(true)
  }

  useEffect(() => {
    if (!currentTrack && hasPlayedTrack) {
      const allTracks = getAllTracks()
      setCurrentTrack(allTracks[0])
    }
  }, [currentTrack, hasPlayedTrack, getAllTracks]) // Added getAllTracks to dependencies

  return (
    <div
      className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}
    >
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
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

      {hasPlayedTrack && (
        <footer className="bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
          <MusicPlayer
            currentTrack={currentTrack}
            onNextTrack={handleNextTrack}
            onPreviousTrack={handlePreviousTrack}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </footer>
      )}
    </div>
  )
}

export default App



