import { NextResponse } from 'next/server'
import crypto from 'crypto'

const TOKEN_TTL_MS = 5 * 60 * 1000
const TOKEN_SECRET = process.env.PAYMENT_TOKEN_SECRET || 'fallback-secret-change-me'

const toBase64Url = (input: Buffer) =>
  input
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

const fromBase64Url = (input: string) => {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/')
  const padLength = 4 - (padded.length % 4 || 4)
  const base64 = padded + '='.repeat(padLength === 4 ? 0 : padLength)
  return Buffer.from(base64, 'base64')
}

const signToken = (payload: string) =>
  crypto.createHmac('sha256', TOKEN_SECRET).update(payload).digest()

const buildToken = () => {
  const issuedAt = Date.now()
  const payload = JSON.stringify({ iat: issuedAt, exp: issuedAt + TOKEN_TTL_MS })
  const encodedPayload = toBase64Url(Buffer.from(payload))
  const signature = toBase64Url(signToken(encodedPayload))
  return `${encodedPayload}.${signature}`
}

const verifyToken = (token: string) => {
  const [payloadPart, signaturePart] = token.split('.')
  if (!payloadPart || !signaturePart) return { valid: false, reason: 'invalid-format' }

  const expectedSignature = toBase64Url(signToken(payloadPart))
  if (expectedSignature !== signaturePart) return { valid: false, reason: 'invalid-signature' }

  try {
    const payloadRaw = fromBase64Url(payloadPart).toString('utf-8')
    const payload = JSON.parse(payloadRaw)
    if (typeof payload.exp !== 'number') return { valid: false, reason: 'invalid-payload' }
    if (Date.now() > payload.exp) return { valid: false, reason: 'expired' }
    return { valid: true }
  } catch {
    return { valid: false, reason: 'invalid-payload' }
  }
}

export async function GET() {
  const token = buildToken()
  return NextResponse.redirect(
    new URL(`/pago-exitoso?token=${token}`, process.env.NEXT_PUBLIC_SITE_URL || 'https://portalculture.vercel.app')
  )
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ valid: false, error: 'No token provided' }, { status: 400 })
    }

    const validation = verifyToken(token)
    if (!validation.valid) {
      return NextResponse.json({ valid: false, error: validation.reason }, { status: 401 })
    }

    return NextResponse.json({ valid: true })
  } catch {
    return NextResponse.json({ valid: false, error: 'Server error' }, { status: 500 })
  }
}
