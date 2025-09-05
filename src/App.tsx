import "./App.css";
import { Navbar } from "./components/ui/Navbar";

function App() {
  return (
    <>
      {/* example with active page #1 */}
      <Navbar activePage={1}></Navbar>
    </>
  );
}

export default App;
