import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BACKEND_URL } from "../../config";
import { useLocation } from "react-router-dom";

const AuthContextStudent = createContext<AuthContextTypeStudent>(
  {} as AuthContextTypeStudent
);

export const AuthContextProviderStudent = ({ children }: { children: any }) => {
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);
  const [isProfileUpdated, setIsProfileUpdated] = useState<boolean>(false);
  const getLoggedIn = async () => {
    try {
      setLoading(true);
      const loggedInResponse = await axios.get(
        `${BACKEND_URL}/student/getDetails`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setError(false);
      if (loggedInResponse.status === 200) {
        setLoggedIn(true);
        setStudent(loggedInResponse.data.data);
        setIsProfileUpdated(loggedInResponse.data.data.isProfileUpdated);
      } else {
        setLoggedIn(false);
        setStudent(undefined);
      }
      setFetched(true);
    } catch (e) {
      setLoggedIn(false);
      setLoading(false);
      setStudent(undefined);
      setError(true);
      setFetched(true);
    }
  };

  const location = useLocation();

  // If we change page, reset the error state.
  useEffect(() => {
    if (location.pathname.includes("/student/")) {
      if (error) setError(false);
      setFetched(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (
      location.pathname.includes("/student/") &&
      !location.pathname.includes("/tutor/")
    ) {
      getLoggedIn();
    }
  }, [isProfileUpdated]);

  const cachedValue = useMemo(
    () => ({
      student: student,
      isLoggedIn: loggedIn,
      isLoading: loading,
      error: error,
      isFetched: fetched,
      isProfileUpdated: isProfileUpdated,
      setIsProfileUpdated: setIsProfileUpdated,
    }),
    [student, loggedIn, loading, error, isProfileUpdated, setIsProfileUpdated]
  );
  return (
    <AuthContextStudent.Provider value={cachedValue}>
      {!loading && children}
    </AuthContextStudent.Provider>
  );
};

export default function useAuthStudent() {
  return useContext(AuthContextStudent);
}
