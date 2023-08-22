export default function SkeletonLandingPage() {
  const MENU = [
    { menu: 1 },
    {
      menu: 2,
      submenu: [
        { submenu: 1 },
        { submenu: 2 },
        { submenu: 3 },
        { submenu: 4 },
        { submenu: 5 },
        { submenu: 6 },
      ],
    },
    {
      menu: 3,
      submenu: [
        { submenu: 1 },
        { submenu: 2 },
        { submenu: 3 },
        { submenu: 4 },
        { submenu: 5 },
      ],
    },
    {
      menu: 4,
      submenu: [{ submenu: 1 }, { submenu: 2 }, { submenu: 3 }, { submenu: 4 }],
    },
  ];

  const header = (
    <article className="navbar flex justify-between bg-base-100 z-10 shadow-md ">
      {/* Page title */}
      <div className="w-36 h-8 rounded-lg bg-base-200"></div>
      {/* 'Welcome' and Name */}
      <div className="w-80 h-8 rounded-lg bg-base-200"></div>
      {/* theme toogle **/}
      <div className="order-last mr-4">
        <div className="h-8 w-8 rounded-lg bg-base-200"></div>
      </div>
    </article>
  );

  const pageContent = (
    <article className="flex-1 overflow-y-auto pt-8 px-6 bg-base-200">
      <div className="card justify-center items-center w-full bg-base-100 pt-12 pb-12 shadow-xl mt-6 gap-4">
        {/* Content */}
        <div className="w-80 h-12 rounded-lg bg-base-200"></div>
        <div className="w-60 h-8 rounded-lg bg-base-200"></div>
      </div>
    </article>
  );

  const leftSidebar = (
    <section className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-[14rem] bg-base-100 text-base-content">
        {/* <!-- Sidebar content here --> */}
        <li className="mb-1 text-xl text-primary font-semibold">
          <div className="mb-2 w-48 h-8 rounded-lg bg-base-200"></div>
        </li>
        {MENU.map((menu, i) => {
          return (
            <li className="" key={i}>
              {menu.submenu ? (
                <>
                  <div className="my-3 w-48 h-8 rounded-lg bg-base-200"></div>
                  {menu.submenu.map((_, k) => (
                    <div
                      key={k}
                      className="my-1.5 ml-2 w-42 h-4 rounded-lg bg-base-200"
                    ></div>
                  ))}
                </>
              ) : (
                <div className="my-3 w-48 h-8 rounded-lg bg-base-200"></div>
              )}
            </li>
          );
        })}
      </ul>

      <footer className="w-full flex justify-center items-end pb-5">
        <div className="w-10/12 h-8 rounded-lg bg-base-200"></div>
      </footer>
    </section>
  );

  return (
    <main className="animate-pulse drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <section className="drawer-content flex flex-col ">
        {/* Header */}
        {header}
        {/* Page Content */}
        {pageContent}
      </section>
      {/* Left Sidebar */}
      {leftSidebar}
    </main>
  );
}
