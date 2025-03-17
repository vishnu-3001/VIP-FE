import './App.css';
import DocumentFetch from './Components/DocumentFetch';
import { DocumentProvider } from './Store/DocumentContext';
import Health from './Components/Health';


function App() {
  return (
    <div>
      <DocumentProvider>
        {/* <DocumentFetch></DocumentFetch> */}
        <Health></Health>
      </DocumentProvider>
    </div>
  );
}

export default App;
