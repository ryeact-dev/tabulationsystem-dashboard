import { useState } from "react";

function InputText({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
  disabled,
  index,
  isScoresheet,
}) {
  const [value, setValue] = useState(defaultValue);

  const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    // Refocus immediately, on the next tick (after the current function is done)
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val, index, isScoresheet });
  };

  return (
    <div className={`form-control mx-auto w-full ${containerStyle}`}>
      <label className='label'>
        <span className={"-my-2 text-lg " + labelStyle}>{labelTitle}</span>
      </label>
      <input
        min={type === "number" ? 0 : undefined}
        disabled={disabled}
        onWheel={numberInputOnWheelPreventChange}
        type={type || "text"}
        autoComplete='password'
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
        className='input-bordered input w-full border-gray-700 text-lg '
      />
    </div>
  );
}

export default InputText;
