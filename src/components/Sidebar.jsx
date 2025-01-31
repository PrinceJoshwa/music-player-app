
// import { Music, Library, Home, Menu, X } from "lucide-react"

// export default function Sidebar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) {
//   const tabs = [
//     { id: "home", label: "Home", icon: Home },
//     { id: "library", label: "Library", icon: Library },
//     { id: "playlist", label: "Playlist", icon: Music },
//   ]

//   const closeSidebar = () => setIsSidebarOpen(false)

//   return (
//     <>
//       <button
//         className="md:hidden fixed top-4 left-4 z-20 p-2 bg-gray-800 rounded-md"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         <Menu className="w-6 h-6" />
//       </button>
//       {isSidebarOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={closeSidebar}></div>
//       )}
//       <div
//         className={`fixed inset-y-0 left-0 transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:relative md:translate-x-0 transition duration-200 ease-in-out md:flex md:flex-col md:justify-between z-40 w-64 bg-gray-800 text-white`}
//       >
//         <div>
//           <header className="bg-gray-800 p-6 shadow-md flex justify-between items-center">
//             <h1 className="text-xl font-bold">Music Player</h1>
//             <button className="md:hidden" onClick={closeSidebar}>
//               <X className="w-6 h-6" />
//             </button>
//           </header>
//           <nav className="flex-1 mt-6">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => {
//                   setActiveTab(tab.id)
//                   setIsSidebarOpen(false)
//                 }}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-colors duration-200 ${
//                   activeTab === tab.id ? "bg-blue-500 text-white" : "hover:bg-white/10 text-gray-400"
//                 }`}
//               >
//                 <tab.icon className="w-5 h-5" />
//                 {tab.label}
//               </button>
//             ))}
//           </nav>
//         </div>
//         <div className="p-4 border-t border-gray-700 text-sm text-gray-500">
//           <p>&copy; 2025 Music App</p>
//         </div>
//       </div>
//     </>
//   )
// }

import { Music, Library, Home, Menu, X, Sun, Moon } from "lucide-react"

export default function Sidebar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, isDarkMode, toggleTheme }) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "library", label: "Library", icon: Library },
    { id: "playlist", label: "Playlist", icon: Music },
  ]

  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={closeSidebar}></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out md:flex md:flex-col md:justify-between z-40 w-64 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white`}
      >
        <div>
          <header className="bg-gray-200 dark:bg-gray-700 p-4 shadow-md flex justify-between items-center">
            <h1 className="text-xl font-bold">Music Player</h1>
            <button
              onClick={toggleTheme}
              className="p-1 rounded-md border border-gray-400 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="md:hidden" onClick={closeSidebar}>
              <X className="w-6 h-6" />
            </button>
          </header>
          <nav className="flex-1 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setIsSidebarOpen(false)
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-300 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; 2025 Music App</p>
        </div>
      </div>
    </>
  )
}

