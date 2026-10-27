import { getAudioDurationInSeconds } from "@remotion/media-utils";
import {
  AbsoluteFill,
  Audio,
  CalculateMetadataFunction,
  Composition,
  Freeze,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const FPS = 30;
// Source clip (IMG_0043.mov) is 2.965 s, transcoded to public/lady.mp4 without its audio.
const VIDEO_FRAMES = Math.floor(2.965 * FPS);

type Props = {
  audioFile: string;
  caption: string;
};

const calculateMetadata: CalculateMetadataFunction<Props> = async ({
  props,
}) => {
  const seconds = await getAudioDurationInSeconds(staticFile(props.audioFile));
  return {
    durationInFrames: Math.max(VIDEO_FRAMES, Math.ceil(seconds * FPS) + 6),
  };
};

export const MyComposition = () => {
  return (
    <Composition
      id="FrenchDub"
      component={MyComponent}
      durationInFrames={VIDEO_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={{
        audioFile: "french.mp3",
        caption: "",
      }}
      calculateMetadata={calculateMetadata}
    />
  );
};

export const MyComponent: React.FC<Props> = ({ audioFile, caption }) => {
  const frame = useCurrentFrame();
  const captionOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* If the French line runs longer than the clip, hold the last frame. */}
      <Freeze frame={VIDEO_FRAMES - 1} active={(f) => f >= VIDEO_FRAMES}>
        <OffthreadVideo src={staticFile("lady.mp4")} muted />
      </Freeze>
      <Sequence>
        <Audio src={staticFile(audioFile)} />
      </Sequence>
      {caption ? (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 220,
            paddingLeft: 80,
            paddingRight: 80,
          }}
        >
          <div
            style={{
              opacity: captionOpacity,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 56,
              fontWeight: 600,
              lineHeight: 1.25,
              textAlign: "center",
              padding: "20px 36px",
              borderRadius: 24,
            }}
          >
            {caption}
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
