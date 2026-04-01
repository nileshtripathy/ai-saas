import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">LeadFlow 🚀</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.email || "User"}
        </span>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;