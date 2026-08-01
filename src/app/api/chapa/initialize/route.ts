import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, phoneNumber, amount, currency = "ETB" } = body;

    if (!email || !firstName || !lastName || !amount) {
      return NextResponse.json(
        { error: "Missing required fields (email, firstName, lastName, amount)" },
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
        title: "Arada Store Purchase",
        description: "Payment for items in your Arada Store cart",
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
        { error: data.message || "Failed to initialize payment with Chapa" },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json({
      status: "success",
      checkout_url: data.data.checkout_url,
      tx_ref,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

