import { Button } from "./components/ui/button";
import trumpetLogo from "/trumpet.svg";

function App() {
  return (
    <div className="flex flex-col h-screen w-screen container mx-auto">
      <img
        src={trumpetLogo}
        className="mx-auto py-4"
        alt="Trumpet logo"
        width={200}
        height={200}
      />
      <div className="flex items-center justify-around w-md mx-auto">
        <h1 className="text-2xl font-bold">Widgets</h1>
        <Button>Add Widget</Button>
      </div>
    </div>
  );
}

export default App;
