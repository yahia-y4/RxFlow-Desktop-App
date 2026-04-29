import "./App.css";
import NavBar from "./components/NavBar/Navbar";
import ErrorWin from "./components/ErrorWin/ErrorWin";
import { RouteDefine } from "./routes/RouteDefinitions";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <ErrorWin/>
      <NavBar />
      <div className="pages-space">
        <Routes>
          {RouteDefine.map((onRoute, i) => (
            <Route key={i} path={onRoute.path} element={onRoute.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
