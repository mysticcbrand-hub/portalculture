import { NextResponse } from 'next/server'

// Store used tokens in memory (in production, use Redis or database)
const usedTokens = new Set<string>()
const tokenExpiry = new Map<string, number>()

export async function GET() {
  // Generate a secure random token
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
  
  // Token valid for 5 minutes
  const expiryTime = Date.now() + 5 * 60 * 1000
  tokenExpiry.set(token, expiryTime)
  
  // Clean up expired tokens
  for (const [t, expiry] of tokenExpiry.entries()) {
    if (Date.now() > expiry) {
      tokenExpiry.delete(t)
      usedTokens.delete(t)
    }
  }
  
  // Redirect to pago-exitoso with token
  return NextResponse.redirect(new URL(`/pago-exitoso?token=${token}`, process.env.NEXT_PUBLIC_SITE_URL || 'https://portalculture.vercel.app'))
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json()
    
    if (!token) {
      return NextResponse.json({ valid: false, error: 'No token provided' }, { status: 400 })
    }
    
    // Check if token exists and hasn't expired
    const expiry = tokenExpiry.get(token)
    if (!expiry || Date.now() > expiry) {
      return NextResponse.json({ valid: false, error: 'Token expired or invalid' }, { status: 401 })
    }
    
    // Check if token was already used
    if (usedTokens.has(token)) {
      return NextResponse.json({ valid: false, error: 'Token already used' }, { status: 401 })
    }
    
    // Mark token as used
    usedTokens.add(token)
    
    return NextResponse.json({ valid: true })
  } catch (error) {
    return NextResponse.json({ valid: false, error: 'Server error' }, { status: 500 })
  }
}
