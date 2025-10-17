// app/api/protegido/route.ts
import { NextRequest } from "next/server"
import { adminAuth } from "@/lib/firebaseAdmin"

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  const token = authHeader?.split(" ")[1]

  if (!token) {
    return new Response("Token ausente", { status: 401 })
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token)
    // Token válido! Você pode acessar info do usuário:
    // decoded.uid, decoded.email, etc.
    return Response.json({ mensagem: "Autenticado!", usuario: decoded })
  } catch (err) {
    return new Response("Token inválido", { status: 403 })
  }
}
