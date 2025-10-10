import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    children?: ReactNode
    variant?: 'primary' | 'secondary' | 'agendar'
} 

const styles: Record<'primary' | 'secondary' | 'agendar', string> = {

    'primary' : 'text-white bg-[var(--color-brown-90)] hover:bg-[var(--color-brown-110)]',
    'secondary' : 'text-[var(--color-gray-50)] border border-[var(--color-gray-20)]',
    "agendar": "bg-[var(--color-brown-60)] text-white px-16 py-4 rounded-sm hover:bg-[var(--color-brown-90)]"
}


export default function Button({variant='primary', ...props}: ButtonProps){
    return(
        <button {...props} className={`rounded px-10 py-3 text-lg duration-300 flex gap-4 ${styles[variant]}`}>
            {props.children}
            <span>{props.label}</span>
        </button>
    )
}