const Loading = () => {
  return (
    <div className="absolute grid place-items-center bg-zinc-800 w-screen text-white h-screen z-999999">
      <dotlottie-player
        src="./src/assets/book.lottie"
        autoplay
        loop
        style={{ height: "50%", width: "50%" }}
      />
    </div>
  );
};

export default Loading;
