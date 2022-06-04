import "./App.css";
import { Navbar } from "./components/Navbar";
import { ProjectList } from "./components/ProjectList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ProjectList />
    </div>
  );
}

export default App;
