import CustomAxios from "./customAxios";

export const getGoogleStudentLogin = async (code: string) => {
  try {
    const response = await CustomAxios.get("/auth/student/google", {
      params: { code: code },
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const getGoogleTutorLogin = async (code: string) => {
  try {
    const response = await CustomAxios.get("/auth/tutor/google", {
      params: { code: code },
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const studentLogout = async () => {
  try {
    const response = await CustomAxios.get("/auth/student/logout", {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const tutorLogout = async () => {
  try {
    const response = await CustomAxios.get("/auth/tutor/logout", {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};
