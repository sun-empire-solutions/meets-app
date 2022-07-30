import { Participant, Track } from "twilio-video";

import { usePublications } from "@/hooks";
import { Publication } from "@/components";

const ParticipantTracks = ({
  participant,
  videoOnly,
  enableScreenShare,
  videoPriority,
  isLocalParticipant,
}: IProps) => {
  const { publications } = usePublications(participant);

  let filteredPublications;

  if (
    enableScreenShare &&
    publications.some((p) => p.trackName.includes("screen"))
  ) {
    // When displaying a screenshare track is allowed, and a screen share track exists,
    // remove all video tracks without the name 'screen'.
    filteredPublications = publications.filter(
      (p) => p.trackName.includes("screen") || p.kind !== "video"
    );
  } else {
    // Else, remove all screenshare tracks
    filteredPublications = publications.filter(
      (p) => !p.trackName.includes("screen")
    );
  }

  return (
    <>
      {filteredPublications.map((publication) => (
        <Publication
          key={publication.kind}
          publication={publication}
          participant={participant}
          isLocalParticipant={isLocalParticipant}
          videoOnly={videoOnly}
          videoPriority={videoPriority}
        />
      ))}
    </>
  );
};

type IProps = {
  participant: Participant;
  videoOnly?: boolean;
  enableScreenShare?: boolean;
  videoPriority?: Track.Priority | null;
  isLocalParticipant?: boolean;
};

export { ParticipantTracks };
