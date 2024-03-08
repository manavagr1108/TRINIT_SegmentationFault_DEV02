import {
  GOOGLE_CLIENT_ID,
  GOOGLE_TUTOR_REDIRECT_URI,
  GOOGLE_STUDENT_REDIRECT_URI,
} from "../../config";
export const getGoogleUrl = (isTutor: boolean) => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: isTutor
      ? GOOGLE_TUTOR_REDIRECT_URI
      : GOOGLE_STUDENT_REDIRECT_URI,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};
