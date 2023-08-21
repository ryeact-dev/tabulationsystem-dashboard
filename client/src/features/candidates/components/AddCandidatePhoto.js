import { useEffect, useState } from "react";
import CloudArrowUpIcon from "@heroicons/react/24/outline/CloudArrowUpIcon";
import CameraIcon from "@heroicons/react/24/outline/CameraIcon";

export default function AddCandidatePhoto({
  candidate,
  updateFormValue,
  updateType,
}) {
  // Convert image to base64 string
  function uploadPhoto(evt) {
    const file = evt.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      updateFormValue({ updateType, value: reader.result });
    };
  }

  return (
    <div className='bg-pureWhite mb-4 flex items-center justify-center rounded-xl text-black'>
      <div className='relative flex h-80 w-80'>
        {candidate.photo ? (
          <img
            className='rounded-2xl object-cover'
            src={candidate.photo}
            alt=''
          />
        ) : (
          <CameraIcon className='m-auto h-36 w-36' strokeWidth={1} />
        )}
        <label className='hover:bg-primaryDark absolute bottom-2 right-2 cursor-pointer rounded-2xl bg-primary bg-opacity-70 p-2 text-white hover:bg-opacity-80'>
          <input
            type='file'
            accept='image/jpeg, image/jpg, image/webp, image/png'
            multiple
            className='hidden'
            onChange={uploadPhoto}
          />
          <CloudArrowUpIcon className='h-12 w-12 md:h-14 md:w-14' />
        </label>
      </div>
    </div>
  );
}
