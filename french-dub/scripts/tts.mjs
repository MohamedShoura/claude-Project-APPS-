// Generate the French voice-over with ElevenLabs.
// Usage: ELEVENLABS_API_KEY=... node scripts/tts.mjs "Texte en français" [voiceId]
import { writeFile } from "node:fs/promises";

const text = process.argv[2];
// Default: "Charlotte", a multilingual female voice. Override with a voice ID from your account.
const voiceId = process.argv[3] ?? "XB0fDUnXU5powFXDhCwa";
const apiKey = process.env.ELEVENLABS_API_KEY;

if (!text || !apiKey) {
  console.error('Usage: ELEVENLABS_API_KEY=... node scripts/tts.mjs "Texte" [voiceId]');
  process.exit(1);
}

const res = await fetch(
  `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
  {
    method: "POST",
    headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      language_code: "fr",
    }),
  },
);

if (!res.ok) {
  console.error(`ElevenLabs error ${res.status}: ${await res.text()}`);
  process.exit(1);
}

await writeFile("public/french.mp3", Buffer.from(await res.arrayBuffer()));
console.log("Wrote public/french.mp3");
