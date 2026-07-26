// Strips EXIF/IPTC/XMP metadata (GPS, camera make/model, software, dates,
// etc.) from every image in public/images/, in place. Keeps the ICC color
// profile so colors don't shift. Skips files that are already clean, so
// it's safe to run on every `npm run dev` / `npm run build`.
//
// Requires `exiftool` and (only for images that need rotation baked in)
// ImageMagick's `magick` CLI. If either is missing, this step is skipped
// with a warning rather than failing the build.
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, "..", "public", "images");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

function commandExists(cmd, versionFlag) {
  try {
    execFileSync(cmd, [versionFlag], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function run(cmd, args) {
  return execFileSync(cmd, args, { encoding: "utf8" });
}

if (!commandExists("exiftool", "-ver")) {
  console.warn("exiftool not found — skipping image metadata stripping (install with `brew install exiftool`).");
  process.exit(0);
}
const hasMagick = commandExists("magick", "-version");

const filenames = readdirSync(IMAGES_DIR).filter((name) =>
  IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()),
);

let strippedCount = 0;
let skippedCount = 0;

for (const filename of filenames) {
  const filePath = path.join(IMAGES_DIR, filename);

  // Already clean? Check for any EXIF/IPTC/XMP tags left (GPS, camera info,
  // dates, etc.) — the ICC profile and intrinsic file/format fields don't
  // count, those are expected to remain.
  const remaining = run("exiftool", ["-EXIF:all", "-IPTC:all", "-XMP:all", "-s", filePath]).trim();
  if (remaining === "") {
    skippedCount++;
    continue;
  }

  const orientation = run("exiftool", ["-Orientation#", "-s3", filePath]).trim();
  const needsRotationBake = hasMagick && orientation !== "" && orientation !== "1";

  if (needsRotationBake) {
    const tmpDir = mkdtempSync(path.join(tmpdir(), "strip-image-metadata-"));
    const tmpFile = path.join(tmpDir, filename);
    try {
      run("magick", [filePath, "-auto-orient", tmpFile]);
      run("exiftool", ["-overwrite_original", "-all=", "-tagsFromFile", "@", "-icc_profile", tmpFile]);
      copyFileSync(tmpFile, filePath);
    } finally {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  } else {
    if (orientation !== "" && orientation !== "1") {
      console.warn(`${filename}: has non-default orientation but ImageMagick isn't installed — skipping rotation bake-in, metadata left untouched to avoid a sideways image.`);
      skippedCount++;
      continue;
    }
    run("exiftool", ["-overwrite_original", "-all=", "-tagsFromFile", "@", "-icc_profile", filePath]);
  }

  strippedCount++;
}

console.log(`Stripped metadata from ${strippedCount} image(s), ${skippedCount} already clean.`);
