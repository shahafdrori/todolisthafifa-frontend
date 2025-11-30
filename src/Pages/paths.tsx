import MainPage from "./MainPage";
import PageLayout from "./PageLayout";
import NotFoundPage from "./NotFound";
import AdminPage from "./AdminPage";
import MapPage from "./MapPage";

export const routesConfig = [
  {
    path: "/",
    element: <PageLayout/>,
    children: [
      {
        index: true,       
        element: <MainPage />,
      },
      {
        path: "/admin-page",
        element: <AdminPage />,
      },
      {
        path: "/tasks-map",
        element: <MapPage click={() => {}}/>,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];
