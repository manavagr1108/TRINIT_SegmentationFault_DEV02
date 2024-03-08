import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { currState } from "../utils/helpers";

const RouteTypeContext = createContext<RouteTypeContextInterface>(
  {} as RouteTypeContextInterface
);

export const RouteTypeContextProvider = ({ children }: { children: any }) => {
  const location = useLocation();
  const [type, setType] = useState<number>(currState.UNKNOWN);
  useEffect(() => {
    if (
      location.pathname.includes("/tutor/") &&
      !location.pathname.includes("/auth")
    ) {
      setType(currState.TUTOR);
    } else if (
      location.pathname.includes("/student/") &&
      !location.pathname.includes("/auth/")
    ) {
      setType(currState.STUDENT);
    } else {
      setType(currState.UNPROTECTED);
    }
  }, [location]);
  const cachedValue = useMemo(
    () => ({
      type: type,
      setType: setType,
    }),
    [type]
  );
  return (
    <RouteTypeContext.Provider value={cachedValue}>
      {type != currState.UNKNOWN && children}
    </RouteTypeContext.Provider>
  );
};

export default function useRouteTypeContext() {
  return useContext(RouteTypeContext);
}
