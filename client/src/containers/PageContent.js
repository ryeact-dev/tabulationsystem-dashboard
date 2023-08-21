import { Suspense, lazy, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import routes from "../routes";
import SuspenseContent from "./SuspenseContent";
import { headerStore } from "../app/store";

const Page404 = lazy(() => import("../pages/protected/404"));

function PageContent() {
  const mainContentRef = useRef(null);
  const pageTitle = headerStore((state) => state.pageTitle);

  // Scroll back to top on new page load
  useEffect(() => {
    mainContentRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [pageTitle]);

  return (
    <div className='drawer-content flex flex-col '>
      <Header />
      <main
        className='flex-1 overflow-y-auto pt-8 px-6  bg-base-200'
        ref={mainContentRef}
      >
        <Suspense fallback={<SuspenseContent />}>
          <Routes>
            {routes.map((route, key) => {
              return (
                <Route
                  key={key}
                  exact={true}
                  path={`${route.path}`}
                  element={<route.component />}
                />
              );
            })}

            {/* Redirecting unknown url to 404 page */}
            <Route path='*' element={<Page404 />} />
          </Routes>
        </Suspense>
        <div className='h-16'></div>
      </main>
    </div>
  );
}

export default PageContent;
