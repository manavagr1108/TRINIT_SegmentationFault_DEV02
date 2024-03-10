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

export const updateTutorProfile = async (body: {
  name: string;
  email: string;
  gender: string;
  age: string;
  languages: any[];
}) => {
  try {
    const response = await CustomAxios.post(`tutor/updateProfile`, body, {
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

export const prepareOrder = async (body: {
  tutorId: string,
  price: number,
  language: string,
}) => {
  try {
    const response = await CustomAxios.post(`payment/generateOrder`, body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
}

export const paymentCallback = async (body: any) => {
  try {
    const response = await CustomAxios.post(`payment/callback`, body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
}
export const getRegisteredStudents = async () => {
  try {
    const response = await CustomAxios.get(`tutor/registeredStudents`, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
}
export const getRegisteredTutors = async () => {
  try {
    const response = await CustomAxios.get(`student/fetchTutors`, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
}

export const fetchTutorSlots = async (body: any) => {
  try {
    const response = await CustomAxios.post(`student/fetchTutorSlots`, body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
}

export const bookSlotsApi = async (body: any) => {
  try {
    const response = await CustomAxios.post(`student/bookSlot`, body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
}

export const getUpcomingClassesTutor = async () => {
  try {
    const response = await CustomAxios.get(`tutor/getUpcomingClasses`, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
}

export const getUpcomingClassesStudent = async () => {
  try {
    const response = await CustomAxios.get(`student/getUpcomingClasses`, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
}

export const toggleAutoApproval = async () => {
  try {
    const response = await CustomAxios.get(`tutor/toggleAutoSubmit`, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
}

export const toggleApprovalOfMeet = async (slotId: string) => {
  try {
    const response = await CustomAxios.post(`tutor/changeStatusMeet`, { slotId: slotId }, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
}

export const getFlashCards = async (body: any) => {
  try {
    const response = await CustomAxios.post(`student/getFlashCards`, body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
}

export const tutorRecommendation = async (chat: string) => {
  try {
    const response = await CustomAxios.post(`student/tutorRecommendationAI`, { chat: chat }, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
}

export const fetchTutorDetails = async (chat: string) => {
  try {
    const response = await CustomAxios.post(`student/fetchTutorDetailsAI`, { chat: chat }, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
}

export const languageQuestionAnswer = async (chat: string) => {
  try {
    const response = await CustomAxios.post(`student/languageQuestionAnswerAI`, { chat: chat }, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
}