import { useState } from "react";

// ----------------------------------------
// CHILD COMPONENT
// ----------------------------------------
const ColorInput = ({ onColorChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const newColor = e.target.value;
    setInputValue(newColor);

    onColorChange(newColor);
  };

  return (
    <div style={
      {
        padding: "20px",
        background: "rgba(255, 255, 255, 0.9)",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }
    }>
      <label style={
        {
          marginRight: "10px",
          fontWeight: "bold",
          fontFamily: "sans-serif"
        }
      }>
        Type a color name or hex code:
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="e.g., blue, #ff5733"
        style={
          {
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px"
          }
        }
      />
    </div>
  );
};

// ----------------------------------------
// PARENT COMPONENT
// ----------------------------------------
const App = () => {
  // State is managed in the parent component
  const [UIColor, setUIColor] = useState("#282c34"); // Default dark background

  // The callback function that we will pass to the child
  const handleColorChange = (color) => {
    setUIColor(color);
  };

  return (
    <div
      style={
        {
          backgroundColor: UIColor,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "background-color 0.4s ease", // Added a smooth transition for a modern feel
        }
      }
    >
      {/* Passing the callback function to the child as a prop */}
      <ColorInput onColorChange={handleColorChange} />
    </div>
  );
};

export default App;