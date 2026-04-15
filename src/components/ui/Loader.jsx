const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 bg-opacity-30 backdrop-blur-sm">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50 animate-pulse opacity-50"></div>

      <div className="relative z-10 text-center">
        {/* Multiple spinning rings */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-rose-200 rounded-full"></div>
          {/* Middle spinning ring */}
          <div className="absolute inset-1 border-4 border-transparent border-t-rose-500 border-r-rose-400 rounded-full animate-spin"></div>
          {/* Inner spinning ring (reverse) */}
          <div
            className="absolute inset-3 border-3 border-transparent border-b-pink-500 border-l-pink-400 rounded-full animate-spin"
            style={{
              animationDirection: "reverse",
              animationDuration: "0.8s",
            }}
          ></div>
          {/* Center dot with pulse */}
          <div className="absolute inset-1/2 w-2 h-2 -ml-1 -mt-1 bg-rose-500 rounded-full animate-pulse"></div>
        </div>

        {/* Animated text */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2 animate-pulse">
          Loading
          <span
            className="inline-block animate-bounce"
            style={{ animationDelay: "0s" }}
          >
            .
          </span>
          <span
            className="inline-block animate-bounce"
            style={{ animationDelay: "0.2s" }}
          >
            .
          </span>
          <span
            className="inline-block animate-bounce"
            style={{ animationDelay: "0.4s" }}
          >
            .
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 animate-fade-in">
          Please wait while we load data
        </p>
      </div>
    </div>
  );
};

export default Loader;
