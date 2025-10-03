import { SVGProps } from "react";

export default function IconModelo({...props}: SVGProps<SVGSVGElement>){
    return(
        <svg         
        width={props.width ?? '25'} 
        height={props.width ??'30'}  
        viewBox="0 0 25 30" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
            <path d="M11.0539 17.7691C11.085 17.7921 11.1189 17.8111 11.1541 17.8246V30L0 22.7636V10.5896L11.0539 17.7691ZM13.4733 17.7691C13.4421 17.7921 13.4082 17.8111 13.373 17.8246V30L24.5271 22.7636V10.5896L13.4733 17.7691ZM0.00538913 7.95463L12.2637 15.9103L24.5219 7.95463L12.2637 0L0.00538913 7.95463Z" fill={props.fill??'#D5BAA8'}/>
        </svg>

    )
} 



