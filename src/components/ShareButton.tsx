import { Button } from "./Button";
import { BsUpload,BsCheck2 } from "react-icons/bs";
import { useState } from "react";

interface Props {
    meetCode: string;
}

export function ShareButton({ meetCode }: Props) {
    const [codeCopied, setCodeCopied] = useState(false)
    return (
        <Button icon={codeCopied?<BsCheck2 color="#26cc00"/>:<BsUpload />}
            text=""
            classNames={"share-button"}
            onClick={() => {
                navigator.clipboard.writeText(meetCode)
                setCodeCopied(true)
                setTimeout(()=>setCodeCopied(false), 1000)
            }}
        />
    )
}
