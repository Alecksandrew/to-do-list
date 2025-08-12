import useLoginForm from "../hooks/useLoginForm";
import Warning from "./Warning";

type LoginForm = {
  className?: string;
};

export default function LoginForm({ className }: LoginForm) {
  const {
    isLogin,
    isRegister,
    handleLogin,
    handleRegister,
    handleForm,
    updateUserData,
    setRegistrationSuccess,
    registrationSuccess
  } = useLoginForm();

  return (
    <>
      {registrationSuccess && <Warning setRegistrationSucess={setRegistrationSuccess}/>}
      <form
        action=""
        className={`${className} flex flex-col gap-2 p-3 outline-1 bg-white outline-gray-400 rounded shadow-lg`}
        onSubmit={(e) => handleForm(e)}
      >
        <div className="w-full flex justify-around input p-1">
          <button
            onClick={(e) => handleLogin(e)}
            className={`${
              isLogin ? "bg-gray-500 text-white" : undefined
            } p-1 rounded font-semibold w-1/2`}
          >
            Login
          </button>
          <button
            onClick={(e) => handleRegister(e)}
            className={`${
              isRegister ? "bg-gray-500 text-white" : undefined
            } p-1 rounded font-semibold w-1/2`}
          >
            Register
          </button>
        </div>
        <label className="flex flex-col text-left">
          Email
          <input
            type="email"
            name="email"
            id=""
            onChange={(e) => updateUserData(e, "email")}
            className="input"
          />
        </label>
        <label className="flex flex-col text-left">
          Password
          <input
            type="password"
            name="password"
            id=""
            onChange={(e) => updateUserData(e, "password")}
            className="input"
          />
        </label>
        {isRegister ? (
          <label className="flex flex-col text-left">
            Confirm Password
            <input
              type="password"
              name="password"
              id=""
              onChange={(e) => updateUserData(e, "confirmPassword")}
              className="input"
            />
          </label>
        ) : null}
        <button
          type="submit"
          className="bg-custom-green rounded p-0.5 text-white font-semibold"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
    </>
  );
}
