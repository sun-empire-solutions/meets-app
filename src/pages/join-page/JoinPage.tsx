import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { LoadingIndicator } from "@/components";
import { useMeetingCode, useFirebaseAuth } from "@/hooks";

const JoinPage = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const { saveMeetingCode } = useMeetingCode();
  const { user, isAuthReady } = useFirebaseAuth();

  useEffect(() => {
    saveMeetingCode(code);
  }, [code]);

  useEffect(() => {
    if (isAuthReady) {
      setTimeout(() => {
        if (!user) {
          navigate("/");
          return;
        }
        navigate("/lobby");
      }, 2000);
    }
  }, [user, isAuthReady]);

  return <LoadingIndicator />;
};

export { JoinPage };
