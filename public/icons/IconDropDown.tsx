

import { SVGProps } from "react";

export default function IconDropDown({...props}: SVGProps<SVGSVGElement>){
    return(
        <svg 
        width={props.width??"22"} 
        height={props.height??"11"} 
        viewBox="0 0 22 11" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5817 11L11.2479 10.4035L21.1634 1.47956L19.831 0L10.5817 8.32745L1.33239 0L0 1.47956L9.91549 10.4035L10.5817 11Z" fill={props.fill??'#867663'}/>
        </svg>

    )
} 



