import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrent } from './app-features/auth/actions'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if(request.nextUrl.pathname.includes('/admin')) {
    const current = await getCurrent();
    if(!current) {
      return NextResponse.redirect(new URL('/login', request.url))
    } 

  }
}
 
// See "Matching Paths" below to learn more
export const config = {
   matcher: [ '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}