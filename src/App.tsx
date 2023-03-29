import ContentSection from "./components/ContentSection";
import DirectorySection from "./components/DirectorySection";
import TitleBar from "./components/TitleBar";
import { useUiStore } from "./store/UiStore";

const App: React.FC = () => {
  const showDirectory = useUiStore((state) => state.showDirectory);

  return (
    <main className="relative w-full h-screen flex flex-col">
      <div
        data-tauri-drag-region
        className="h-10 w-full text-gray-400 bg-zinc-700"
      >
        <TitleBar />
      </div>
      <div className="relative w-full h-full flex">
        {!!showDirectory && <DirectorySection />}
        <ContentSection />
      </div>
    </main>
  );
};

export default App;
