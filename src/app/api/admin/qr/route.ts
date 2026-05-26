import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import { requireSession } from "@/lib/auth";
import { BRAND_COLORS } from "@/lib/colors";

const QR_SIZE = 512;
const LOGO_RATIO = 0.22;
const CORNER_RADIUS = 32;

async function getLogoBuffer(): Promise<Buffer> {
  const logoPath = path.join(process.cwd(), "public", "logo.png");
  const logoFile = await fs.readFile(logoPath);
  return Buffer.from(logoFile);
}

async function generateStyledQR(url: string): Promise<Buffer> {
  const qrBuffer = await QRCode.toBuffer(url, {
    width: QR_SIZE,
    margin: 2,
    errorCorrectionLevel: "H",
    color: { dark: BRAND_COLORS.primary, light: BRAND_COLORS.background },
  });

  const logoSize = Math.round(QR_SIZE * LOGO_RATIO);
  const logoOffset = Math.round((QR_SIZE - logoSize) / 2);

  let logo: Buffer;
  try {
    const rawLogo = await getLogoBuffer();
    logo = await sharp(rawLogo)
      .resize(logoSize, logoSize, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
  } catch {
    return applyRoundedCorners(qrBuffer);
  }

  const logoBgSize = logoSize + 16;
  const logoBgOffset = Math.round((QR_SIZE - logoBgSize) / 2);
  const logoBg = await sharp({
    create: {
      width: logoBgSize,
      height: logoBgSize,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 255 },
    },
  })
    .png()
    .toBuffer();

  const composited = await sharp(qrBuffer)
    .composite([
      { input: logoBg, left: logoBgOffset, top: logoBgOffset },
      { input: logo, left: logoOffset, top: logoOffset },
    ])
    .png()
    .toBuffer();

  return applyRoundedCorners(composited);
}

async function applyRoundedCorners(imageBuffer: Buffer): Promise<Buffer> {
  const mask = Buffer.from(
    `<svg width="${QR_SIZE}" height="${QR_SIZE}">
      <rect x="0" y="0" width="${QR_SIZE}" height="${QR_SIZE}" rx="${CORNER_RADIUS}" ry="${CORNER_RADIUS}" fill="white"/>
    </svg>`
  );

  return sharp(imageBuffer)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

export async function GET(request: NextRequest) {
  try {
    await requireSession();

    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get("branchId");
    const host = request.headers.get("host") ?? "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";

    let url = `${protocol}://${host}/feedback`;
    if (branchId) {
      url += `?branch=${branchId}`;
    }

    const png = await generateStyledQR(url);

    return new NextResponse(new Uint8Array(png), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="feedback-qr${branchId ? `-${branchId}` : ""}.png"`,
      },
    });
  } catch (error) {
    const message = error instanceof Error && error.message === "Unauthorized"
      ? "Unauthorized"
      : "Failed to generate QR code";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireSession();

    const { branchId } = await request.json();
    const host = request.headers.get("host") ?? "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";

    let url = `${protocol}://${host}/feedback`;
    if (branchId) {
      url += `?branch=${branchId}`;
    }

    const png = await generateStyledQR(url);
    const dataUrl = `data:image/png;base64,${png.toString("base64")}`;

    return NextResponse.json({ url, dataUrl });
  } catch (error) {
    const message = error instanceof Error && error.message === "Unauthorized"
      ? "Unauthorized"
      : "Failed to generate QR code";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
