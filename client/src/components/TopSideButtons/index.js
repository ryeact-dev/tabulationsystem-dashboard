import { modalStore } from "../../app/store";

export default function TopSideButtons({
  title,
  bodyType,
  btnName,
  extraObject,
}) {
  const openModal = modalStore((state) => state.openModal);

  const openAddNewModal = () => {
    openModal({
      title,
      bodyType,
      extraObject,
    });
  };

  return (
    <div className='float-right inline-block'>
      <button
        className='btn-primary btn-sm btn px-6 normal-case text-white'
        onClick={() => openAddNewModal()}
      >
        {btnName ? btnName : "Add New"}
      </button>
    </div>
  );
}
