// import { useState, useRef, useEffect } from "react"
// import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from "@heroicons/react/24/solid"

// export default function MusicPlayer({ currentTrack, onNextTrack, onPreviousTrack }) {
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [currentTime, setCurrentTime] = useState(0)
//   const [duration, setDuration] = useState(0)
//   const audioRef = useRef(null)

//   useEffect(() => {
//     if (currentTrack) {
//       setIsPlaying(false)
//       setCurrentTime(0)
//       if (audioRef.current) {
//         audioRef.current.src = currentTrack.audioUrl
//         audioRef.current.load()
//       }
//     }
//   }, [currentTrack])

//   useEffect(() => {
//     if (!audioRef.current) return

//     if (isPlaying) {
//       audioRef.current.play().catch((error) => {
//         console.error("Error playing audio:", error)
//         setIsPlaying(false)
//       })
//     } else {
//       audioRef.current.pause()
//     }
//   }, [isPlaying])

//   const handlePlayPause = () => {
//     if (!audioRef.current) return
//     setIsPlaying(!isPlaying)
//   }

//   const handleTimeUpdate = () => {
//     if (audioRef.current) {
//       setCurrentTime(audioRef.current.currentTime)
//     }
//   }

//   const handleLoadedMetadata = () => {
//     if (audioRef.current) {
//       setDuration(audioRef.current.duration)
//     }
//   }

//   const handleSeek = (e) => {
//     if (!audioRef.current) return
//     const seekTime = (e.target.value / 100) * duration
//     audioRef.current.currentTime = seekTime
//     setCurrentTime(seekTime)
//   }

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60)
//     const seconds = Math.floor(time % 60)
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
//   }

//   if (!currentTrack) return null

//   return (
//     <div className="bg-gray-900 text-white p-4">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
//         <div className="flex items-center space-x-4">
//           <img
//             src={currentTrack.cover || "/placeholder.svg"}
//             alt={currentTrack.title}
//             className="w-12 h-12 rounded-lg"
//           />
//           <div>
//             <h3 className="font-semibold">{currentTrack.title}</h3>
//             <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
//           </div>
//         </div>

//         <div className="flex items-center space-x-6">
//           <button className="p-2 hover:text-blue-500" onClick={onPreviousTrack}>
//             <BackwardIcon className="h-6 w-6" />
//           </button>
//           <button className="p-3 bg-blue-500 rounded-full hover:bg-blue-600" onClick={handlePlayPause}>
//             {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
//           </button>
//           <button className="p-2 hover:text-blue-500" onClick={onNextTrack}>
//             <ForwardIcon className="h-6 w-6" />
//           </button>
//         </div>

//         <div className="w-full md:w-1/3">
//           <input
//             type="range"
//             min="0"
//             max="100"
//             value={(currentTime / duration) * 100 || 0}
//             onChange={handleSeek}
//             className="w-full"
//           />
//           <div className="flex justify-between text-sm text-gray-400">
//             <span>{formatTime(currentTime)}</span>
//             <span>{formatTime(duration)}</span>
//           </div>
//         </div>
//       </div>
//       <audio
//         ref={audioRef}
//         onTimeUpdate={handleTimeUpdate}
//         onLoadedMetadata={handleLoadedMetadata}
//         onEnded={onNextTrack}
//       />
//     </div>
//   )
// }

//31-01-2025
// import { useState, useEffect } from "react"
// import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from "@heroicons/react/24/solid"

// export default function MusicPlayer({ currentTrack, onNextTrack, onPreviousTrack, isPlaying, setIsPlaying, audioRef }) {
//   const [currentTime, setCurrentTime] = useState(0)
//   const [duration, setDuration] = useState(0)

//   useEffect(() => {
//     const audio = audioRef.current
//     const updateTime = () => setCurrentTime(audio.currentTime)
//     const updateDuration = () => setDuration(audio.duration)

//     audio.addEventListener("timeupdate", updateTime)
//     audio.addEventListener("loadedmetadata", updateDuration)
//     audio.addEventListener("ended", onNextTrack)

//     return () => {
//       audio.removeEventListener("timeupdate", updateTime)
//       audio.removeEventListener("loadedmetadata", updateDuration)
//       audio.removeEventListener("ended", onNextTrack)
//     }
//   }, [audioRef, onNextTrack])

//   const handlePlayPause = () => {
//     if (isPlaying) {
//       audioRef.current.pause()
//     } else {
//       audioRef.current.play()
//     }
//     setIsPlaying(!isPlaying)
//   }

//   const handleSeek = (e) => {
//     const seekTime = (e.target.value / 100) * duration
//     audioRef.current.currentTime = seekTime
//     setCurrentTime(seekTime)
//   }

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60)
//     const seconds = Math.floor(time % 60)
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
//   }

//   if (!currentTrack) return null

//   return (
//     <div className="bg-gray-900 text-white p-4">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
//         <div className="flex items-center space-x-4">
//           <img
//             src={currentTrack.cover || "/placeholder.svg"}
//             alt={currentTrack.title}
//             className="w-12 h-12 rounded-lg"
//           />
//           <div>
//             <h3 className="font-semibold">{currentTrack.title}</h3>
//             <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
//           </div>
//         </div>

//         <div className="flex items-center space-x-6">
//           <button className="p-2 hover:text-blue-500" onClick={onPreviousTrack}>
//             <BackwardIcon className="h-6 w-6" />
//           </button>
//           <button className="p-3 bg-blue-500 rounded-full hover:bg-blue-600" onClick={handlePlayPause}>
//             {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
//           </button>
//           <button className="p-2 hover:text-blue-500" onClick={onNextTrack}>
//             <ForwardIcon className="h-6 w-6" />
//           </button>
//         </div>

//         <div className="w-full md:w-1/3">
//           <input
//             type="range"
//             min="0"
//             max="100"
//             value={(currentTime / duration) * 100 || 0}
//             onChange={handleSeek}
//             className="w-full"
//           />
//           <div className="flex justify-between text-sm text-gray-400">
//             <span>{formatTime(currentTime)}</span>
//             <span>{formatTime(duration)}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useRef, useEffect } from "react"
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from "@heroicons/react/24/solid"

export default function MusicPlayer({ currentTrack, onNextTrack, onPreviousTrack }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    if (currentTrack) {
      setIsPlaying(false)
      setCurrentTime(0)
      if (audioRef.current) {
        audioRef.current.src = currentTrack.audioUrl
        audioRef.current.load()
      }
    }
  }, [currentTrack])

  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error)
        setIsPlaying(false)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const handlePlayPause = () => {
    if (!audioRef.current) return
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    if (!audioRef.current) return
    const seekTime = (e.target.value / 100) * duration
    audioRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  if (!currentTrack) return null

  return (
    <div className="bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <img
            src={currentTrack.cover || "/placeholder.svg"}
            alt={currentTrack.title}
            className="w-12 h-12 rounded-lg"
          />
          <div>
            <h3 className="font-semibold">{currentTrack.title}</h3>
            <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button className="p-2 hover:text-blue-500" onClick={onPreviousTrack}>
            <BackwardIcon className="h-6 w-6" />
          </button>
          <button className="p-3 bg-blue-500 rounded-full hover:bg-blue-600" onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
          </button>
          <button className="p-2 hover:text-blue-500" onClick={onNextTrack}>
            <ForwardIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="w-full md:w-1/3">
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onNextTrack}
      />
    </div>
  )
}