import type { Dispatch, SetStateAction } from "react"

type WarningProps = {
    setRegistrationSucess: Dispatch<SetStateAction<boolean>>
}

export default function Warning({setRegistrationSucess}:WarningProps){

    return(
        <div className="fixed w-screen h-screen flex justify-center items-center">
            <div className="relative z-2 input w-1/2 h-1/5 flex flex-col justify-center items-center text-xl">
                <h2>Your account has been created sucessfully</h2>
                <button  onClick={() => setRegistrationSucess(false)} className="rounded bg-custom-green p-1 mt-4">Close</button>
            </div>
            <div className="bg-black opacity-70 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-screen h-screen"></div>
        </div>
    )
}