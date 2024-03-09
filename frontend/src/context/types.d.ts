interface Student {
  _id: string;
  name: string;
  gender: string;
}


interface LanguagePriceList {
  price: number
  language: string;
  experience: number;
}
interface Tutor {
  _id: string;
  email: string;
  name: string;
  id: string;
  phoneNo: string;
  age: number;
  gender: string;
  classesTaken: [ObjectId];
  isProfileUpdated: boolean;
  languages: [LanguagePriceList],
  availableTimeZone: [string],
  isAutoApprovalOn: boolean;
}

interface AuthContextTypeStudent {
  student?: Student;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: boolean;
  isFetched: boolean;
  isProfileUpdated: boolean;
  setIsProfileUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}
interface AuthContextTypeTutor {
  tutor?: Tutor;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: boolean;
  isFetched: boolean;
  isProfileUpdated: boolean;
  setIsProfileUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RouteTypeContextInterface {
  type: number;
  setType: React.Dispatch<React.SetStateAction<number>>;
}
