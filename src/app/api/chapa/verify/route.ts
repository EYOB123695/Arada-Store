import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tx_ref = searchParams.get("tx_ref");

  if (!tx_ref) {
    return NextResponse.json({ error: "tx_ref is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      return NextResponse.json(
        { status: "failed", message: data.message || "Transaction verification failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: "success",
      data: data.data,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
