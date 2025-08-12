import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../backendURL";

type UserData = {
  email: string;
  password: string;
  confirmPassword?: string;
};

const emptyUserData = {
  email: "",
  password: "",
};

export default function useLoginForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>(emptyUserData);
   const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleLogin(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    setIsLogin(true);
    setIsRegister(false);
  }

  function handleRegister(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    setIsLogin(false);
    setIsRegister(true);
  }

  function arePasswordsTheSame(obj:UserData) {
    return obj.password === obj.confirmPassword;
  }

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();


    try {
      if (isRegister && !arePasswordsTheSame(userData)) throw new Error("Passwords must be the same!");

      const endpoint = isLogin ? "/api/login" : "/api/users";
      const payload = isLogin
        ? { email: userData.email, password: userData.password }
        : userData;
      const url = `${BACKEND_URL}${endpoint}`;
      const aditionalInfos = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      const response = await fetch(url, aditionalInfos);

      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();

      if (isLogin) {
        localStorage.setItem("authToken", data.token);
        navigate('/tasks')
      } else {
        setRegistrationSuccess(true);
        setIsLogin(true);
        setIsRegister(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function updateUserData(
    e: React.ChangeEvent<HTMLInputElement>,
    propertyName: string
  ): void {
    setUserData({ ...userData, [propertyName]: e.target.value });
  }

  return {
    isLogin,
    isRegister,
    handleLogin,
    handleRegister,
    handleForm,
    updateUserData,
    setRegistrationSuccess,
    registrationSuccess
  };
}
