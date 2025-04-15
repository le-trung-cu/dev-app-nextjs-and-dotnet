import { useEffect, useRef, useState } from "react";
import { useToolbarContext } from "./toolbar-context";

export const useWatch = (name: string) => {
  const { values, registerWatcher } = useToolbarContext();
  const [value, setValue] = useState(values[name]);

  const valuesRef = useRef(values);
  valuesRef.current = values;

  useEffect(() => {
    const unsubscribe = registerWatcher(name, () => {
      const newVal = valuesRef.current[name];
      setValue((prev) => (prev !== newVal ? newVal : prev));
    });

    return unsubscribe;
  }, [name, registerWatcher]);

  return value;
};
