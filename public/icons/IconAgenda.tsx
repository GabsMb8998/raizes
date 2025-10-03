import { SVGProps } from "react";


export default function IconAgenda({...props}: SVGProps<SVGSVGElement>){

    return (
        <svg 
        width={props.width ?? '24'} 
        height={props.width ??'24'} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 9.32934C23.9747 9.332 23.948 9.33333 23.9213 9.33333H0.0786641C0.0519975 9.33333 0.0253333 9.332 0 9.32934V24H24V9.32934ZM17.3333 3.33333H6.66667V0.666667C6.66667 0.298667 6.368 0 6 0C5.632 0 5.33333 0.298667 5.33333 0.666667V3.33333H0V8.004C0.0253333 8.00133 0.0519975 8 0.0786641 8H23.9213C23.948 8 23.9747 8.00133 24 8.004V3.33333H18.6667V0.666667C18.6667 0.298667 18.368 0 18 0C17.632 0 17.3333 0.298667 17.3333 0.666667V3.33333Z" fill={props.fill??'#D5BAA8'}/>
        </svg>
    )
}