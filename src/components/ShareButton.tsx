import { Button } from "./Button";
import shareLogo from "../assets/images/share-logo.jpg"

interface Props {
    meetCode: string;
    classNames: string;
}

export function ShareButton({ meetCode, classNames }: Props) {
    return (
        <Button icon={<img src={shareLogo} alt="Share Logo" />}
            text=""
            classNames={classNames}
            onClick={() => navigator.clipboard.writeText(meetCode)}
        />
    )
}
