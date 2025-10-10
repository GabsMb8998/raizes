


import { SVGProps } from "react";

export default function IconEdit({...props}: SVGProps<SVGSVGElement>){
    return(
        <svg width={props.width ?? "17"} height={props.height ?? "16"} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6979 0.134035L10.3994 2.30542L13.8098 5.52718L16.1082 3.35579L12.6979 0.134035Z"  fill={props.fill??'#A27B5C'}/>
            <path d="M0.544999 11.7248L0 15.5284L3.97869 15.0074L13.4194 5.98214L9.98578 2.69971L0.544999 11.7248Z" fill={props.fill??'#A27B5C'}/>
        </svg>

    )
} 


