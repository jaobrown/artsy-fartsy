import { useState } from "react";

export const useIncrement = ({
  maxValue = 100000,
  minValue = -100000,
  initial = 0,
  step = 1,
}) => {
  const [value, setValue] = useState(initial);

  const inc = () => {
    setValue((prevState) =>
      prevState + step >= maxValue ? maxValue : prevState + step
    );
  };

  const incLoop = () => {
    setValue((prevState) =>
      prevState + step >= maxValue ? initial : prevState + step
    );
  };

  const dec = () => {
    setValue((prevState) =>
      prevState - step <= minValue ? minValue : prevState - step
    );
  };

  const decLoop = () => {
    setValue((prevState) =>
      prevState - step <= minValue ? maxValue - 1 : prevState - step
    );
  };

  const reset = () => setValue(initial);

  return [value, { inc, incLoop, dec, decLoop, reset }];
};
