const Loading = () => {
  return (
    <div className="absolute grid place-items-center bg-zinc-800 w-screen text-white h-screen z-999999">
      <div className="grid place-items-center">
        <div className="loading"></div>
        <span className="mt-2 text-gray-400 text-sm">
          loading your workspace
        </span>
      </div>
    </div>
  );
};

export default Loading;
