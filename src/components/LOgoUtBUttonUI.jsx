
import { LogOut } from "lucide-react"
function LOgoUtBUttonUI() {
  return (
    <div>
    <button className="group relative mx-4 inline-flex items-center justify-center px-6 py-2 overflow-hidden font-bold text-white rounded-lg shadow-2xl transition-all duration-300 ease-out hover:scale-110 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-600 via-red-500 to-orange-400"></span>
      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-red-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
      <span className="relative flex items-center">
        <LogOut className="w-5 h-5 mr-2" aria-hidden="true" />
          Log out
      </span>
    </button>
    </div>
  )
}

export default LOgoUtBUttonUI
