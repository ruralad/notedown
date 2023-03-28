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
        className="absolute h-8 w-full z-20 text-gray-400"
      >
        <TitleBar />
      </div>
      <div className="relative w-full h-full flex pt-8">
        {!!showDirectory && <DirectorySection />}
        <ContentSection />
      </div>
    </main>
  );
};

export default App;
