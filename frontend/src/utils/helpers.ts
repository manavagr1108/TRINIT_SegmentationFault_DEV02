import { showNotification as mantineShowNotification } from "@mantine/notifications";

export const showNotification = (
  title: string,
  message: string,
  type: "success" | "error" | "warning" | "info"
) => {
  const color =
    type === "success"
      ? "#529E66"
      : type === "error"
        ? "#D0454C"
        : type === "warning"
          ? "#E1C542"
          : "#2D9CDB";
  mantineShowNotification({
    title: title,
    message: message,
    color: color,
  });
};

export const currState = {
  UNKNOWN: 0,
  TUTOR: 1,
  STUDENT: 2,
  UNPROTECTED: 3,
};

export const genders = ["Male", "Female"];
export const languages = [
  "Spanish",
  "German",
  "Arabic",
  "Chinese",
  "Japanese",
  "Russian",
  "French",
  "English",
  "Hindi",
  "Korean",
];
export const expArray = ["Low", "Medium", "High"];

export const timeZoneMap: any = {
  Morning: 540,
  Afternoon: 900,
  Evening: 1140,
  Night: 1320,
};
