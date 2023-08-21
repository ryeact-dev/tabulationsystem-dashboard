import InputText from "../../../../components/Input/InputText";

export default function InputSection({ userObj, updateFormValue }) {
  const disabled = userObj.userRole === "judge";

  return (
    <>
      <InputText
        type='text'
        defaultValue={userObj.username}
        updateType='username'
        containerStyle='mt-4'
        labelTitle='Username'
        updateFormValue={updateFormValue}
      />

      <InputText
        type='password'
        defaultValue={userObj.password}
        updateType='password'
        containerStyle='mt-4'
        labelTitle='Password'
        updateFormValue={updateFormValue}
      />

      <InputText
        type='text'
        defaultValue={userObj.fullName}
        updateType='fullName'
        containerStyle='mt-4'
        labelTitle='Full Name'
        updateFormValue={updateFormValue}
      />

      <section className='flex items-center justify-center'>
        <InputText
          type='number'
          defaultValue={userObj.judgeNumber}
          updateType='judgeNumber'
          containerStyle='mt-4'
          labelTitle='Judge Number'
          updateFormValue={updateFormValue}
          disabled={!disabled}
        />

        <div className='form-control mt-10 w-[65rem]'>
          <label className='label px-4'>
            <input
              type='radio'
              name='radio-10'
              className='radio checked:bg-red-500'
              onChange={() =>
                updateFormValue({ updateType: "userRole", value: "admin" })
              }
            />
            <span className='text-lg'>Admin</span>

            <input
              type='radio'
              name='radio-10'
              className='radio checked:bg-blue-500'
              onChange={() =>
                updateFormValue({ updateType: "userRole", value: "user" })
              }
            />
            <span className='text-lg'>User</span>

            <input
              type='radio'
              name='radio-10'
              className='radio checked:bg-gray-500'
              onChange={() =>
                updateFormValue({ updateType: "userRole", value: "judge" })
              }
              defaultChecked
            />
            <span className='text-lg'>Judge</span>
          </label>
        </div>
      </section>
    </>
  );
}
