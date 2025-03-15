import './App.css';
import DocumentFetch from './Components/DocumentFetch';
import { DocumentProvider } from './Store/DocumentContext';


function App() {
  return (
    <div>
      <DocumentProvider>
        <DocumentFetch></DocumentFetch>
      </DocumentProvider>
    </div>
  );
}

export default App;
