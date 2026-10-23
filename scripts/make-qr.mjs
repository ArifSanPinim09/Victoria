#!/usr/bin/env node
/**
 * Generate a QR code pointing at the Find a Club page.
 *
 * The client wants to scan from a phone during the presentation, so the QR
 * must resolve to a URL a phone can actually reach (not localhost).
 *
 * Usage:
 *   node scripts/make-qr.mjs                              # auto-detect ngrok URL
 *   node scripts/make-qr.mjs https://example.com/participate/find-a-club
 *   node scripts/make-qr.mjs https://... --out public/qr-presentation.png
 */

import QRCode from "qrcode";
import { mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);

const outIdx = args.indexOf("--out");
const outArg = outIdx !== -1 ? args[outIdx + 1] : null;
const urlArg = args.find((a, i) => !a.startsWith("--") && i !== outIdx + 1);

async function detectNgrok() {
  try {
    const res = await fetch("http://127.0.0.1:4040/api/tunnels");
    if (!res.ok) return null;
    const json = await res.json();
    const https = json.tunnels?.find((t) => t.public_url?.startsWith("https://"));
    return https?.public_url ?? json.tunnels?.[0]?.public_url ?? null;
  } catch {
    return null;
  }
}

let base = urlArg;
let source = "argument";

if (!base) {
  base = await detectNgrok();
  source = base ? "ngrok (127.0.0.1:4040)" : null;
}

if (!base) {
  console.error("No URL given and no running ngrok tunnel found.");
  console.error("Start a tunnel first:  ngrok http 3000");
  console.error("Or pass a URL:         node scripts/make-qr.mjs https://your-url/participate/find-a-club");
  process.exit(1);
}

// Normalise: the client wants to land on the Find a Club page directly.
let target = base.replace(/\/+$/, "");
if (!/\/participate\/find-a-club/.test(target)) {
  target = `${target}/participate/find-a-club`;
}

const out = outArg
  ? resolve(ROOT, outArg)
  : resolve(ROOT, "public/qr-presentation.png");

mkdirSync(dirname(out), { recursive: true });

await QRCode.toFile(out, target, {
  errorCorrectionLevel: "M",
  margin: 2,
  width: 1024,
  color: { dark: "#002854", light: "#FFFFFF" },
});

// A label card makes the QR easier to read on a projector.
const label = resolve(dirname(out), "qr-presentation-label.txt");
const { writeFileSync } = await import("node:fs");
writeFileSync(
  label,
  [
    "Lacrosse Victoria — Find a Club (prototype)",
    "",
    `URL:    ${target}`,
    `Source: ${source}`,
    `Image:  ${out}`,
    "",
    "Cara pakai saat presentasi:",
    "1. Pastikan tunnel ngrok masih berjalan (kalau tunnel mati, URL mati).",
    "2. Tampilkan gambar QR ini di slide.",
    "3. Peserta scan pakai kamera HP -> langsung masuk ke halaman Find a Club.",
    "4. Kalau halaman menampilkan peringatan ngrok, ketuk \"Visit Site\".",
    "",
    "Catatan: QR ini hanya valid selama URL di atas aktif.",
  ].join("\n"),
  "utf8",
);

console.log("QR code dibuat.");
console.log(`  URL    : ${target}`);
console.log(`  Sumber : ${source}`);
console.log(`  Gambar : ${out}`);
console.log(`  Label  : ${label}`);
console.log("");
console.log("Ingat: URL ini mati kalau proses ngrok dihentikan.");
