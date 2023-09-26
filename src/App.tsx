import './App.css';
import SortableTable from './components/SortableTable';
import data from './Pokemon.json';

function App() {
  return (
    <div className="App">
      <SortableTable data={data} />
    </div>
  );
}

export default App;
