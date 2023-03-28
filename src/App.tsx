import ContentSection from "./components/ContentSection";
import DirectorySection from "./components/DirectorySection";
import { useUiStore } from "./store/UiStore";

const App: React.FC = () => {
  const showDirectory = useUiStore((state) => state.showDirectory);

  return (
    <main className="w-full grid place-items-center">
      <div className="relative w-full flex">
        {!!showDirectory && <DirectorySection />}
        <ContentSection />
      </div>
    </main>
  );
};

export default App;
