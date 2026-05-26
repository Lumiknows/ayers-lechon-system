import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { requireSession } from "@/lib/auth";
import { BRAND_COLORS } from "@/lib/colors";

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

    const png = await QRCode.toBuffer(url, {
      width: 512,
      margin: 2,
      color: { dark: BRAND_COLORS.primary, light: BRAND_COLORS.background },
    });

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

    const dataUrl = await QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: { dark: BRAND_COLORS.primary, light: BRAND_COLORS.background },
    });

    return NextResponse.json({ url, dataUrl });
  } catch (error) {
    const message = error instanceof Error && error.message === "Unauthorized"
      ? "Unauthorized"
      : "Failed to generate QR code";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
