import {Config} from '@remotion/cli/config';

// The sandbox ships a Playwright headless shell; point Remotion at it so no browser download is needed.
// Remove this line on a normal workstation and Remotion will fetch its own.
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
}
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setCodec('h264');
Config.setCrf(14);
Config.setPixelFormat('yuv420p');
Config.setConcurrency(4);
