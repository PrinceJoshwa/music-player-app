import { useRef, useEffect, useState } from "react"
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from "@heroicons/react/24/solid"

export default function MusicPlayer({ currentTrack, onNextTrack, onPreviousTrack, isPlaying, setIsPlaying }) {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (currentTrack) {
      setIsReady(false)
      audioRef.current.src = currentTrack.audioUrl
      audioRef.current.load()
      audioRef.current.addEventListener("canplaythrough", handleCanPlayThrough)
      return () => {
        audioRef.current.removeEventListener("canplaythrough", handleCanPlayThrough)
      }
    }
  }, [currentTrack])

  useEffect(() => {
    if (isReady) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, isReady, setIsPlaying])

  const handleCanPlayThrough = () => {
    setIsReady(true)
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error)
        setIsPlaying(false)
      })
    }
  }

  const handlePlayPause = () => {
    if (isReady) {
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration)
  }

  const handleSeek = (e) => {
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
    <div className="bg-gray-900 text-white p-2 md:p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
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

