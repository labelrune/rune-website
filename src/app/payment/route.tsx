import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const BASE =
  process.env.CASHFREE_ENV === "production"
    ? "https://api.cashfree.com"
    : "https://sandbox.cashfree.com";

const CF_API_VERSION = process.env.CASHFREE_API_VERSION || "2023-08-01";

export async function POST(req: NextRequest) {
  try {
    const { order_id, order_amount, customer_id, customer_phone } =
      await req.json();

    if (!order_id || !order_amount) {
      return NextResponse.json(
        { success: false, message: "order_id & order_amount required" },
        { status: 400 }
      );
    }

    const res = await fetch(`${BASE}/pg/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CASHFREE_APP_ID as string,
        "x-client-secret": process.env.CASHFREE_SECRET as string,
        "x-api-version": CF_API_VERSION,
        "x-idempotency-key": String(order_id),
      },
      body: JSON.stringify({
        order_id,
        order_amount: Number(order_amount),
        order_currency: "INR",
        customer_details: {
          customer_id: customer_id ?? "guest",
          customer_phone,
        },
        order_meta: {
          return_url: `${req.nextUrl.origin}/products?order_id=${order_id}`,
        },
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { success: false, message: `Cashfree error ${res.status}: ${text}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (e: any) {
    console.error("Cashfree order error:", e?.response?.data || e);
    return NextResponse.json(
      { success: false, message: "Error processing the request." },
      { status: 500 }
    );
  }
}