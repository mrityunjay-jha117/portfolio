import { useNavigate } from "react-router-dom";
export default function Authorised_Creator() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen p-8 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="w-3/5 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, Mrityunjay</h1>
        </div>
        <div className="flex flex-col h-50 text-4xl font-extrabold sm:flex-row gap-4 mb-8">
          <button
            onClick={() => navigate("/real_admin/create")}
            className="flex-1 cursor-pointer px-4 py-6 bg-blue-400 rounded-lg text-center"
          >
            Create
          </button>

          <button
            onClick={() => navigate("/real_admin/delete")}
            className="flex-1 cursor-pointer px-4 py-6 bg-red-400 rounded-lg text-center"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
