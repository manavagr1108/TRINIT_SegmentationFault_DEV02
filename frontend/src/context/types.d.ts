interface Student {
  _id: string;
  name: string;
}

interface AuthContextTypeStudent {
  student?: Student;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: boolean;
  isFetched: boolean;
}

interface RouteTypeContextInterface {
  type: number;
  setType: React.Dispatch<React.SetStateAction<number>>;
}
