import { HTMLAttributes } from "react"


const styles = {

    'subtext' : 'text-[var(--color-gray-60)]',
    'text' : 'text-[var(--color-gray-90)] font-medium'
}

type VariantType = keyof typeof styles


interface TextDefaultProps extends HTMLAttributes<HTMLParagraphElement>{
    variant?: VariantType
    content: string
}  

export default function TextDefault({variant, content,className ,...props}: TextDefaultProps){
    return(
        <p className={`${variant && styles[variant]} ${className}`} {...props}>{content}</p>
    )
}