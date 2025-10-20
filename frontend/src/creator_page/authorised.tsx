// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// type Blog = { id: string; title: string; slug: string; published?: boolean };

export default function Authorised_Creator() {
  const navigate = useNavigate();

  // const getAdminPassword = () => sessionStorage.getItem("admin_password") || "";

  //   async function checkAuthAndLoad() {
  //     const pw = getAdminPassword();
  //     if (!pw) return navigate("/admin");

  //     try {
  //       const resp = await fetch("/api/v1/blog/auth", {
  //         headers: { "x-admin-password": pw },
  //       });
  //       const data = await resp.json();
  //       if (!data?.ok) return navigate("/admin");
  //       await loadBlogs();
  //     } catch (err) {
  //       console.error(err);
  //       navigate("/admin");
  //     }
  //   }

  //

  // useEffect(() => {
  //   // checkAuthAndLoad();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="flex justify-center items-center h-screen p-8 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, Mrityunjay</h1>
          <p className="text-gray-300 mt-2">
            Choose an action to manage your blogs. The server will require the
            admin password when performing Create, Update or Delete operations.
          </p>
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
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_password");
              navigate("/admin");
            }}
            className="px-4 py-2 bg-gray-700 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
