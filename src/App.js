import { useState } from "react";
import "./styles.css";

import PasswordCheckIndicator from "./components/StrengthChecker";
import { usePasswordGenerator } from "./hooks/use-password-generator";

const CHECKBOX_SET_DEFAULT = [
  { title: "Include Uppercase Letters", state: false },
  { title: "Include Lowercase Letters", state: false },
  { title: "Include Numbers", state: false },
  { title: "Include Symbols", state: false },
];

export default function App({ min = 4, max = 20 }) {
  const [characterLength, setCharacterLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState(CHECKBOX_SET_DEFAULT);
  const [copied, setCopied] = useState(false);

  const handleChangePasswordType = (index) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
    setCheckboxData(updatedCheckboxData);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="App">
      {/* Password generated and copy */}
      {password && (
        <div className="password-generated">
          {password}
          <button onClick={handleCopyPassword} className="password-copy">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      {/* Character Length label */}
      <div className="character-length">
        <lable>Character Length</lable>
        <lable>{characterLength}</lable>
      </div>
      {/* Character Change Range */}
      <input
        max={max}
        min={min}
        value={characterLength}
        className="range-input"
        type="range"
        onChange={(e) => setCharacterLength(e.target.value)}
      />
      {/* buttons for password set*/}
      <div className="password-types">
        {checkboxData.map((data, index) => {
          return (
            <div key={index} className="password-type-input">
              <input
                onChange={() => handleChangePasswordType(index)}
                type="checkbox"
                checked={data.state}
              />
              <lable className="password-type-input-label">{data.title}</lable>
            </div>
          );
        })}
      </div>
      {/* suggestion*/}
      <PasswordCheckIndicator password={password} />
      {/* error handling */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {/* Generate Password Button */}
      <button
        onClick={() => generatePassword(checkboxData, characterLength)}
        className="password-generate-btn"
      >
        Generate Password
      </button>
    </div>
  );
}
