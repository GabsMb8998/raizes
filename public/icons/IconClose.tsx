
import { SVGProps } from "react";


export default function IconClose({...props}: SVGProps<SVGSVGElement>){

    return (
        <svg 
            width={props.width??"14"}
            height={props.height?? "14"} 
            viewBox="0 0 14 14"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path d="M1.55541 0L0 1.55541L5.44437 7.00023L0 12.4446L1.55541 14L6.99978 8.55564L12.4446 14L14 12.4446L8.5552 7.00023L14 1.55541L12.4446 0L6.99978 5.4448L1.55541 0Z" fill={props.fill??'#757575'}/>
        </svg>
    )
}