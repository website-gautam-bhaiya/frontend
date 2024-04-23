 
import { RouterProvider, createBrowserRouter } from "react-router-dom" 
import HomePage from "./pages/HomePage/HomePage"
import ArticlePage from "./pages/ArticlePage/ArticlePage"
import TopArticlePage from "./pages/TopArticlePage/TopArticlePage"
import CategoryPage from "./pages/CategoryPage/CategoryPage" 
import LoginPage from "./pages/LoginPage/LoginPage"
import ResetPage from "./pages/ResetPage/ResetPage"
import AccountPage from "./pages/AccountPage/AccountPage"
import PublishPage from "./pages/PublishPage/PublishPage"
import EditArticlePage from "./pages/EditArticle/EditArticlePage"
import Protected from "./components/Protected/Protected"
import AddAuthor from "./pages/AddAuthorPage/AddAuthor" 
import ErrorPage from "./pages/ErrorPage/ErrorPage"
import UsersPage from "./pages/UsersPage/UsersPage"
import BooksPage from "./pages/BooksPage/BooksPage"
import AddBookPage from "./pages/AddBookPage/AddBookPage" 
import PrivacyTermsPage from "./pages/PrivacyTerrmsPage/PrivacyTermsPage"
import AboutUs from "./pages/AboutPage/AboutUs"

function App() { 
    

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage /> 
      
    },
    {
      path: '/article/:id',
      element: <ArticlePage />
    },
    {
      path: '/vista-top',
      element: <TopArticlePage />
    },
    {
      path:'/category/:name',
      element: <CategoryPage />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/resetPassword/:token',
      element: <ResetPage />
    },
    {
      path: '/myAccount',
      element:  <Protected><AccountPage /> </Protected>
    },
    {
      path: '/publishPage',
      element: <Protected> <PublishPage /></Protected>
    },
    {
      path: '/editArticle/:id',
      element: <Protected> <EditArticlePage /></Protected>
    },
    {
      path: '/addNewAuthor',
      element: <Protected authorized="admin"> <AddAuthor /></Protected>
    },
    {
      path: '/allUsers',
      element: <Protected authorized="admin"> <UsersPage /> </Protected>
    },
    {
      path: '/books',
      element: <BooksPage/> 
    },
    {
      path: '/addBooks',
      element: <Protected authorized="admin"> <AddBookPage/> </Protected> 
    },
    {
      path: '/privacyStatement',
      element: <PrivacyTermsPage/> 
    },
    {
      path: '/aboutUs',
      element: <AboutUs/> 
    },
    {
      path: '/restricted',
      element: <ErrorPage type="Unauthorized" />
    },
    {
      path: '*',
      element: <ErrorPage type="NotFound" />
    }
  ])

  return (
    <div>  
        <RouterProvider router={router} /> 
    </div>
  )
}

export default App
