import { useNavigate } from "react-router-dom";
import "@lottiefiles/lottie-player";

export default function HomePage() {
  const navigate = useNavigate();
  const animationUrl = "/dotAnimation.json";

  return (
    <div className="w-full">
<section className="h-screen bg-gradient-to-br from-blue-50 to-green-100 flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-20">
        
        {/* Left: Text & Buttons */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Welcome to Teachz
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            A smarter way to manage student records and academic performance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-md transition duration-300"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow-md transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Right: Animation */}
        <div className="w-full md:w-1/2 flex justify-center">
          <lottie-player
            src={animationUrl}
            background="transparent"
            speed="1"
            style={{ width: "100%", maxWidth: "350px", height: "350px" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </section>
    </div>
  );
}
