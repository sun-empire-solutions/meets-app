import { Button } from "./Button";
import { BsCheck2 } from "react-icons/bs";
import { MdOutlineIosShare } from "react-icons/md";
import { useState } from "react";

interface Props {
  meetCode: string;
}

export function ShareButton({ meetCode }: Props) {
  const [codeCopied, setCodeCopied] = useState(false);
  return (
    <Button
      icon={
        codeCopied ? (
          <BsCheck2 color="#fff" size={24} />
        ) : (
          <MdOutlineIosShare size={24} />
        )
      }
      text=""
      classNames={"share-button"}
      onClick={() => {
        navigator.clipboard.writeText(meetCode);
        setCodeCopied(true);
        setTimeout(() => setCodeCopied(false), 1000);
      }}
    />
  );
}
