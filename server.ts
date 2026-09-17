import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json());

  // SEO & Verification routes
  app.get("/baidu_verify_codeva-UiFh5eDDO6.html", (_req, res) => {
    res.type("text/plain; charset=utf-8").send("codeva-UiFh5eDDO6");
  });

  app.get("/robots.txt", (_req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "robots.txt"));
  });

  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml").sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
  });

  app.get("/llms.txt", (_req, res) => {
    res.type("text/plain; charset=utf-8").sendFile(path.join(process.cwd(), "public", "llms.txt"));
  });

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      company: "北京隆昌行商贸有限公司",
      timestamp: new Date().toISOString()
    });
  });

  // AI Inventory Batch Parser & Expert Assessor
  app.post("/api/ai-assessment", async (req, res) => {
    try {
      const { textPrompt } = req.body;
      if (!textPrompt || typeof textPrompt !== "string" || textPrompt.trim().length === 0) {
        return res.status(400).json({ error: "请提供库存清单文本或描述" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: "GEMINI_API_KEY 未配置，请使用本地规则评估模式",
          fallback: true
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `你是一名深耕中国大宗食品供应链与临期库存处置领域的资深核算评估专家（来自北京隆昌行，企业主体代码 91110105MA01H1TY42）。
请仔细分析货主提交的食品库存描述或Excel复制文本，提取出结构化批次要素，并依据《食品安全法》和供应链闭环防窜货原则进行专业评估。

货主提供的原始库存资料：
"""
${textPrompt.slice(0, 2000)}
"""

请直接输出合法的纯 JSON 对象（不要使用任何 Markdown 代码块，不要包含 \`\`\`json 或任何前导文本）：
{
  "productName": "识别出的产品名称与规格",
  "category": "临期食品 / 冷冻食品与海鲜 / 饮料与乳品 / 零食糖果 / 酒水 / 粮油调味品 / 综合食品",
  "quantity": "预估批次数量与包装单位",
  "productionDate": "识别的生产日期或批号（若未提及请填写'未提供，需核验'）",
  "expiryDate": "识别的到期日或保质期（若未提及请填写'未提供，需核验'）",
  "shelfLifeAnalysis": "效期剩余情况与流转紧迫度评估",
  "storageCondition": "建议温区（常温 / 0~4℃冷藏 / -18℃冷冻）",
  "location": "存放城市或仓库位置（若未提及填写'待确认'）",
  "completenessScore": 85,
  "riskPoints": [
    "风险点或待补资料1",
    "风险点或待补资料2"
  ],
  "channelAdvice": "价格保护与防窜货流向建议（例如严禁公域电商、限定特定封闭特通或下沉商超）",
  "longchangxingAdvice": "隆昌行专业对接处置建议与资料补充清单"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const raw = response.text || "{}";
      const clean = raw.replace(/```json/gi, "").replace(/```/gi, "").trim();
      try {
        const parsed = JSON.parse(clean);
        return res.json({ success: true, data: parsed });
      } catch {
        return res.json({ success: true, rawText: raw });
      }
    } catch (err: any) {
      console.error("AI assessment error:", err);
      return res.status(500).json({ error: err.message || "智能评估处理异常" });
    }
  });

  // Vite middleware for dev or static serving for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
