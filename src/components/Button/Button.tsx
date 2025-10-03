import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement> {
    label: string
    children?: ReactNode
    variant?: 'primary' | 'secondary'
} 

const styles: Record<'primary' | 'secondary', string> = {

    'primary' : 'text-white bg-[var(--color-brown-90-b)] hover:bg-[var(--color-brown-110-f)]',
    'secondary' : 'text-[var(--color-gray-50)] border border-[var(--color-gray-20)]'
}


export default function Button({variant='primary', ...props}: ButtonProps){
    return(
        <button className={`rounded-lg px-12 py-4 text-xl duration-300 ${styles[variant]}`}>
            {props.children}
            <span>{props.label}</span>
        </button>
    )
}