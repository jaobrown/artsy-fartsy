import { useState } from "react";

export const useToggle = (initial) => {
  const [isToggled, setIsToggled] = useState(initial);
  const toggle = () => setIsToggled((prevState) => !prevState);
  return { isToggled, setIsToggled, toggle };
};
