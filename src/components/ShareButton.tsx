import { Button } from "./Button";
import shareLogo from "../assets/images/share-logo.jpg"

interface Props {
    meetCode: string;
}

export function ShareButton({ meetCode }: Props) {
    return (
        <Button icon={<img src={shareLogo} alt="Share Logo" />}
            text=""
            classNames={"share-button"}
            onClick={() => navigator.clipboard.writeText(meetCode)}
        />
    )
}
