import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Simple signup schema validation
const SignUpSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email(),
  password: z.string().min(6),
});

// Dummy in-memory user store (replace with database)
const users: { email: string; password: string }[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = SignUpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: result.error.format() },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Check if user already exists
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // In real app: Hash password before saving
    users.push({ email, password });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
