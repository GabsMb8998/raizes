import Button, { ButtonProps } from "../Button/Button";
import HeaderTitle from "../HeaderTitle/Index";

interface HeaderWithButtonProps {
    title: string,
    button: ButtonProps
}

export default function HeaderWithButton({title, button}: HeaderWithButtonProps){
    return(
        <HeaderTitle title={title}>
            <Button {...button}/>
        </HeaderTitle>
    )
}