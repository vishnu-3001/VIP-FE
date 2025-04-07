import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Intro from './Components/Intro';
import Login from './Components/Login';
import DocumentViewer from './Components/DocumentViewer';
const router=createBrowserRouter(
  [
    {path:'/',element:<Intro></Intro>,
      children:[
        {path:'/Login',element:<Login></Login>},
        {path:'/DocumentFetch',element:
          <DocumentViewer></DocumentViewer>
        }
      ]
    }
  ]
)
function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
