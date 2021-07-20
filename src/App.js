import "./App.css";
import Table from "./Table.js";

function App() {
  return (
    <div className="App">
      <div className="App-header"></div>
      <div className="App-main">
        <div className="App-intro">
          <div className="title">Coinomo Yield Products</div>
          <div className="summary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
        <Table></Table>
      </div>
    </div>
  );
}

export default App;
