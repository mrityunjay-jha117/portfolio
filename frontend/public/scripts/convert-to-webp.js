import fs from "fs";
import path from "path";
import sharp from "sharp";

const sourceDir = "";
const targetDir = "";

async function processDirectory(currentDir) {
  const files = fs.readdirSync(currentDir);

  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      const imageExtensions = [
        ".png",
        ".jpg",
        ".jpeg",
        ".svg",
        ".gif",
        ".bmp",
        ".tiff",
        ".webp",
      ];

      // Calculate relative path to maintain folder structure
      const relativePath = path.relative(sourceDir, fullPath);
      const targetFullPath = path.join(targetDir, relativePath);
      const targetFileDir = path.dirname(targetFullPath);

      // Ensure the sub-folder structure exists in the target directory
      if (!fs.existsSync(targetFileDir)) {
        fs.mkdirSync(targetFileDir, { recursive: true });
      }

      if (imageExtensions.includes(ext)) {
        const webpPath = targetFullPath.replace(new RegExp(`${ext}$`), ".webp");

        try {
          if (ext === ".svg") {
            // SVGs look much better when converted with a high density
            await sharp(fullPath, { density: 300 })
              .webp({ quality: 90 })
              .toFile(webpPath);
          } else if (ext === ".webp") {
            // Already webp, just copy it
            fs.copyFileSync(fullPath, webpPath);
          } else {
            // Normal image conversion
            await sharp(fullPath).webp({ quality: 80 }).toFile(webpPath);
          }
          console.log(
            `✅ Converted: ${relativePath}  ->  ${path.relative(targetDir, webpPath)}`,
          );
        } catch (err) {
          console.error(`❌ Failed to convert ${relativePath}:`, err.message);
        }
      } else {
        // If it's some other file (like a .txt or .md), just copy it directly to maintain the folder completely
        fs.copyFileSync(fullPath, targetFullPath);
        console.log(`⏩ Copied (non-image): ${relativePath}`);
      }
    }
  }
}

console.log("Starting conversion...");
console.log(`Source: ${sourceDir}`);
console.log(`Target: ${targetDir}`);
console.log("----------------------------------------------------");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

processDirectory(sourceDir).then(() => {
  console.log("----------------------------------------------------");
  console.log(
    '🎉 All conversions finished! Check the "public/icons_webp" folder.',
  );
});
