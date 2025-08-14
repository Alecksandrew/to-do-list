import LoginForm from "../components/LoginForm"


export default function LoginPage(){

    return (
        <div className="min-h-screen min-w-screen flex flex-col justify-center items-center p-6">
            <h1 className="mb-10 text-center">Login and access your to do list!</h1>
            <LoginForm className="min-w-2xs w-9/10 max-w-xl"/>
        </div>

    )
}