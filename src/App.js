import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Intro from './Components/Intro';
import Login from './Components/Login';
import DocumentFetch from './Components/DocumentFetch'
const router=createBrowserRouter(
  [
    {path:'/',element:<Intro></Intro>,
      children:[
        {path:'/Login',element:<Login></Login>},
        {path:'/DocumentFetch',element:<DocumentFetch></DocumentFetch>}
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
