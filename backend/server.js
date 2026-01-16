const express = require("express");
// Use global fetch (Node 18+) or fallback to node-fetch
const fetch = global.fetch || require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("➡️ Prompt received:", prompt);

    // Using Pollinations AI (No API Key required, faster)
    // Added 'seed' to force new image every time
    // Added 'nologo=true' to remove watermark
    const seed = Math.floor(Math.random() * 100000);
const finalPrompt = `
ultra-realistic professional cake photography,
luxury bakery display,
award-winning food photography,
8k resolution,
perfect exposure,
soft diffused studio lighting,
natural shadows,
shallow depth of field,
sharp focus on cake details,
moist sponge texture,
smooth creamy frosting,
glossy chocolate ganache,
fresh fruits and edible flowers,
clean elegant decoration,
realistic colors,
no blur,
no distortion,
no cartoon style,
${prompt}
`;


    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=512&height=512&seed=${seed}&nologo=true`;

    console.log("Fetching URL:", imageUrl);

    // Added User-Agent header to mimic a real browser (prevents blocking)
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Pollinations API Error: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    res.json({
      image: `data:image/jpeg;base64,${base64}`,
    });
  } catch (err) {
    console.error("❌ Server crash:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// AI Chat Endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message, userName } = req.body;
    
    // 🔑 PASTE YOUR GROQ API KEY HERE
    const GROQ_API_KEY =  process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY.startsWith("gsk_")) {
       console.error("❌ Error: Groq API Key is missing in server.js");
       return res.status(500).json({ error: "API Key missing" });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { 
            role: "system", 
            content: `You are the friendly AI assistant for 'CakeOry', a cake shop in Kovvada, Vishnupur.
Current User Name: ${userName}

====================
🎂 ABOUT CAKEORY
====================
CakeOry specializes in fresh, hygienic, and beautifully designed cakes for all occasions:
Birthdays, Weddings, Anniversaries, Baby Showers, and Custom Events.

**Menu & Pricing:**
- Basic Cakes (Vanilla, Strawberry): ₹500/kg
- Premium Cakes (Chocolate Truffle, Red Velvet): ₹850/kg
- Custom/Designer Cakes: Starts at ₹1200/kg
- Cupcakes: ₹60/piece (Min order 6)

**Store Info:**
- Location: Kovvada, Vishnupur
- Phone: +91 8142296719
- Email: CakeOry@gmail.com
- Working Hours:
  • Mon–Sat: 9 AM – 10 PM
  • Sun: 10 AM – 9 PM
  • Holidays: Closed
If any complaint contact +91 8142296719
**Rules for you:**
mostly use bullet points for clarity .
====================
**INSTRUCTIONS FOR YOU:**
1️⃣ Answer ONLY questions related to:
   - CakeOry products
   - Cake prices
   - Cake types & flavors
   - Custom cake orders
   - Store timings
   - Contact details
   - Ordering guidance

2️⃣ DO NOT answer:
   - Programming, coding, or technical questions
   - General knowledge or unrelated topics
   - Questions about other cake shops or competitors
   - Personal, political, or medical questions

3️⃣ If a question is unrelated, politely respond with:
   "I can help you only with CakeOry cakes and orders 🍰"

4️⃣ Always promote CakeOry positively and professionally.

5️⃣ Never mention you are an AI model or powered by any company.
   You are simply **CakeOry’s virtual assistant**.
mostly use bullet points for clarity where possible.


====================
🎉 RESPONSE STYLE
====================
- Be friendly, cheerful, and welcoming
- Use emojis like 🎂 🍰 🎉
- Keep responses short, clear, and customer-friendly
- Encourage ordering and customization politely
- give concise answers
- dont provide lengthy explanations
- Give in bullet points linned format 
====================
🛒 ORDER GUIDANCE
====================
- Suggest suitable cakes based on occasion
- Ask for:
  • Occasion
  • Weight (kg)
  • Flavor
  • Date of delivery
- Mention that custom cakes require advance notice` 
          },
          { role: "user", content: message }
        ],
        model: "llama-3.1-8b-instant", // Fast and smart model
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Oops! I couldn't think of a reply.";
    
    res.json({ reply });
  } catch (err) {
    console.error("❌ Chat error:", err.message);
    res.status(500).json({ error: "Failed to get response" });
  }
});
app.listen(5000, () =>
  console.log("✅ Backend running http://localhost:5000")
);
