import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";

const ENGETHERMO_SERVICES_CONTEXT = `
You are an AI assistant for ENGETHERMO Engenharia, a professional engineering company based in Londrina - PR, Brazil.

COMPANY INFORMATION:
- Name: ENGETHERMO Engenharia
- Location: Londrina - PR
- Website: https://www.engethermo.com.br

SERVICES & AREAS:
1. Electrical Installations: Structured cabling, voice, data, electrical power
2. Electrical Panels & Boards: Substation panels, substation assembly, general projects
3. Equipment Installation: Air conditioning, generators, pumps, electrical panels, capacitor banks, ventilation
4. Hydraulic Installations: Civil works, reforms
5. Maintenance: Preventive and corrective maintenance for electrical and hydraulic installations (residential, commercial, industrial)
6. Preventive and Corrective Maintenance of Generator Groups
7. Thermography: Thermal imaging diagnostics

MAIN SERVICES:
- Execution of Civil, Mechanical and Electrical Engineering projects and works
- Preventive and corrective maintenance of electrical, hydrosanitary, air conditioning, refrigeration and ventilation installations
- Building, commercial, industrial and bank agency renovation works
- Preventive and corrective building, commercial, hospital and industrial maintenance
- Logical network installation (structured cabling) and electrical installation
- Fire prevention and combat system installation
- Electrical projects and structured cabling for data and voice networks
- Installation of electrical distribution panels
- Infrastructure for logical installations, telephony and CCTV
- Metallic and optical structured cabling network installation
- Commercial and industrial electrical installations
- Lighting design and installation
- Substation maintenance

COMPANY VALUES: Respect, Capacity, Agility, Quality, Commitment, Honesty

MISSION: Offer quality services and act with ethics, seeking to satisfy the needs and well-being of our clients, partners and collaborators.

VISION: Be recognized as a company of unparalleled quality in the execution, maintenance and projects in the engineering field.

INSTRUCTIONS:
- Always respond in Portuguese (Brazilian Portuguese)
- Be professional, friendly, and helpful, with elegant and concise language
- If asked about services, provide detailed information
- If you cannot answer a question about the company, politely suggest the user contact via WhatsApp using the "Solicitar Orçamento" button
- Always maintain a professional tone appropriate for a B2B engineering company
- If the user asks for a budget or wants to hire services, direct them to click on "Solicitar Orçamento" button at the top of the page (DO NOT mention phone numbers)
- NEVER include phone numbers in your responses.
- When referring to contact, use phrases like "clique no botão Solicitar Orçamento" or "entre em contato pelo botão no topo da página"
- Keep responses concise, clear, and elegant - maximum 3-4 sentences when possible
- Use markdown sparingly - avoid heavy formatting
`;

const requestSchema = z.object({
  message: z.string().min(1),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ reply: "Method not allowed", success: false });
    return;
  }

  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ reply: "Requisição inválida", success: false });
    return;
  }

  const { message, conversationHistory } = parsed.data;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    res.status(500).json({
      reply:
        "Desculpe, o assistente não está configurado no momento. Por favor, clique no botão Solicitar Orçamento para falar diretamente conosco.",
      success: false,
    });
    return;
  }

  try {
    const contents = [
      ...(conversationHistory ?? []).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: ENGETHERMO_SERVICES_CONTEXT }] },
          contents,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Gemini] request failed:", response.status, errorText);
      throw new Error(`Gemini request failed: ${response.status}`);
    }

    const data = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Desculpe, não consegui processar sua mensagem. Por favor, tente novamente ou entre em contato conosco via WhatsApp.";

    res.status(200).json({ reply, success: true });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(200).json({
      reply:
        "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, clique no botão Solicitar Orçamento para falar diretamente conosco.",
      success: false,
    });
  }
}
