import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, phoneNumber, amount, currency = "ETB" } = body;

    if (
      !process.env.CHAPA_SECRET_KEY ||
      process.env.CHAPA_SECRET_KEY.includes("xxxx") ||
      process.env.CHAPA_SECRET_KEY.includes("•")
    ) {
      return NextResponse.json(
        {
          error:
            "CHAPA_SECRET_KEY in .env.local contains masked dots (••••••••). On the Chapa dashboard, click the 'Eye' icon or 'Copy' button to copy the unmasked secret key (starts with CHASECK_TEST-).",
        },
        { status: 400 }
      );
    }

    if (!email || !firstName || !lastName || !amount || Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Missing or invalid required fields (email, firstName, lastName, amount > 0)" },
        { status: 400 }
      );
    }

    const tx_ref = `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const chapaPayload = {
      amount: String(amount),
      currency,
      email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber || "",
      tx_ref,
      callback_url: `${baseUrl}/api/chapa/verify`,
      return_url: `${baseUrl}/checkout/success?tx_ref=${tx_ref}`,
      customization: {
        title: "Arada Store",
        description: "Cart payment",
      },
    };

    const response = await fetch("https://api.chapa.co/v1/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chapaPayload),
    });

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      return NextResponse.json(
        { error: data.message || JSON.stringify(data) || "Failed to initialize payment with Chapa" },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json({
      status: "success",
      checkout_url: data.data.checkout_url,
      tx_ref,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

