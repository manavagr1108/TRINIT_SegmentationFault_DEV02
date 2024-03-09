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

export const getUserDetailsProfile = async () => {
  try {
    const response = await CustomAxios.get("/user/getUserProfile", {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await CustomAxios.get(`user/getDetails`, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const getCurrentAdmin = async () => {
  try {
    const response = await CustomAxios.get(`admin/getDetails`, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const updateUserProfile = async (body: {
  name: string;
  email: string;
  gender: string;
  age: string;
  languages: string;
}) => {
  try {
    const response = await CustomAxios.post(`student/updateProfile`, body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const searchTutor = async (body: {
  languages: string[];
  experience: number;
  lowerPrice: number;
  upperPrice: number
}) => {
  try {
    const response = await CustomAxios.post(`student/searchTutor`, body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};