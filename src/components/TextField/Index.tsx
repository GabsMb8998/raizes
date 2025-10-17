import { spawn } from "child_process"
import { InputHTMLAttributes } from "react"

interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    error?: string
}

export default function Textfield({label,error, ...props}: TextfieldProps){
    return(
        <div className="w-full">
            <label className="font-medium text-[var(--color-gray-80)] mb-2">{label}</label>
            <input {...props} className="w-full py-2 px-4 rounded border-[#e6e6e6] border-1 placeholder:text-[#ABABAB] text-[var(--color-gray-70)] focus:outline-none" />
        
        {error && (
            <span className="text-red-400">{error}</span>
        )}
        </div>


    )
}