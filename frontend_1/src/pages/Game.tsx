import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import GameCanvas from "../dashboard/canvas";

export default function Game() {
  const navigate = useNavigate();

  // Escape key handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate("/");
      }
    };

    // Add event listener
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Game Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Portfolio</span>
            </button>
            <div className="h-6 w-px bg-gray-600"></div>
          </div>
        </div>
      </div>

      {/* Game Controls Info */}
      <div className="fixed bottom-6 left-6 z-50 bg-black/70 backdrop-blur-md rounded-lg p-4 text-sm">
        <div className="text-white">
          <div className="font-semibold mb-2 text-red-400">🎮 Controls:</div>
          <div className="space-y-1 text-gray-300">
            <div>
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">WASD</kbd>{" "}
              /{" "}
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">
                Arrow Keys
              </kbd>{" "}
              - Move
            </div>
            <div>
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">Space</kbd>{" "}
              - Jump
            </div>
            <div>
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">Shift</kbd>{" "}
              - Sprint
            </div>
            <div>
              <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">Mouse</kbd>{" "}
              - Look around
            </div>
            <div className="border-t border-gray-600 pt-2 mt-2">
              <kbd className="bg-red-400 px-2 py-1 rounded text-xs">ESC</kbd> -
              Back to Portfolio
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Toggle */}
      <button
        onClick={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }}
        className="fixed bottom-6 right-6 z-50 bg-red-400 hover:bg-red-600 text-white p-3 rounded-lg transition-colors"
        title="Toggle Fullscreen"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </button>

      <GameCanvas />
    </div>
  );
}
