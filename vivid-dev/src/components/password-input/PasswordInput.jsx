import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const PasswordInput = ({
  name,
  inputValue,
  handleInputChange,
  placeHolder,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <input
        className="block border border-grey-light w-full p-3 rounded"
        name={name}
        type={showPassword ? "text" : "password"}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeHolder}
      />
      <button
        className="absolute right-2 top-[8px] text-3xl m-auto"
        onClick={() => setShowPassword((prevState) => !prevState)}
      >
        {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
      </button>
    </div>
  );
};

export { PasswordInput };
