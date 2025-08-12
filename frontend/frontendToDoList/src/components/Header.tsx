import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    function logout():void{
        localStorage.removeItem("authToken");
        navigate("/");
    }


    return (
    <div className="w-screen flex justify-between p-4 border-1 border-gray-400 rounded bg-gray-200 mb-10">
      <h1 className="ml-8">Simple to do</h1>

      <button onClick={logout} className="flex items-center gap-1 rounded border-1 border-red-500 p-1.5 bg-red-50 mr-8">
        <IoMdExit />
        Logout
      </button>
    </div>
  );
}
