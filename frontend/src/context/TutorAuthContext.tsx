import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BACKEND_URL } from "../../config";
import { useLocation } from "react-router-dom";

const AuthContextTutor = createContext<AuthContextTypeStudent>(
  {} as AuthContextTypeStudent
);

export const AuthContextProviderTutor = ({ children }: { children: any }) => {
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);
  const getLoggedIn = async () => {
    try {
      setLoading(true);
      const loggedInResponse = await axios.get(
        `${BACKEND_URL}/tutor/getDetails`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setError(false);
      if (loggedInResponse.status === 200) {
        setLoggedIn(true);
        setStudent(loggedInResponse.data.data);
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
    if (location.pathname.includes("/tutor/")) {
      if (error) setError(false);
      setFetched(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.includes("/tutor/")) {
      getLoggedIn();
    }
  }, []);

  const cachedValue = useMemo(
    () => ({
      student: student,
      isLoggedIn: loggedIn,
      isLoading: loading,
      error: error,
      isFetched: fetched,
    }),
    [student, loggedIn, loading, error]
  );
  return (
    <AuthContextTutor.Provider value={cachedValue}>
      {!loading && children}
    </AuthContextTutor.Provider>
  );
};

export default function useAuthTutor() {
  return useContext(AuthContextTutor);
}
