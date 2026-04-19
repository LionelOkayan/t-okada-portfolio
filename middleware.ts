import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_EMAILS = ["okayan0128@hotmail.com"];

export async function middleware(req: NextRequest): Promise<NextResponse> {
  let res = NextResponse.next({
    request: { headers: req.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            req.cookies.set(name, value),
          );
          res = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const isLoginPage = req.nextUrl.pathname.startsWith("/login");
  const isCallbackPage = req.nextUrl.pathname.startsWith("/auth/callback");

  if (isCallbackPage) return res;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (user && !ALLOWED_EMAILS.includes(user.email ?? "")) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (user && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|_next/|/auth/callback).*)"],
};
