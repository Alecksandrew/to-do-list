import type { Dispatch, SetStateAction } from "react"

export type TaskData = {
    id:number,
    title: string,
    description: string | null,
    deadline:string | null
}