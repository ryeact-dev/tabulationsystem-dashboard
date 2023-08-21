import { useEffect } from "react";
import FaceFrownIcon from "@heroicons/react/24/solid/FaceFrownIcon";
import { headerStore } from "../../app/store";

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ title: "Not Authorize" });
  }, [setPageTitle]);

  return (
    <div className='hero h-4/5 bg-base-200'>
      <div className='hero-content text-center text-accent'>
        <div className='max-w-md'>
          <FaceFrownIcon className='inline-block h-48 w-48' />
          <h1 className='text-5xl  font-bold'>404 - Not Found</h1>
        </div>
      </div>
    </div>
  );
}

export default InternalPage;
