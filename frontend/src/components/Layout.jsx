import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">

        {/* Sidebar */}
        <div className="w-64 bg-black text-white p-5">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>

          <ul className="space-y-3">
            <li className="hover:text-gray-400 cursor-pointer">Leads</li>
            <li className="hover:text-gray-400 cursor-pointer">Settings</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;