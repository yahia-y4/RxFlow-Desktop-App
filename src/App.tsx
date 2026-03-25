import "./App.css";
import NavBar from "./components/NavBar/Navbar";
import StoragePage from "./modules/storage/StoragePage/StoragePage";
function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="pages-space">
       <StoragePage/>
      </div>
     

    </div>
  );
}

export default App;
