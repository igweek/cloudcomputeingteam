import type { VercelRequest, VercelResponse } from "@vercel/node";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const notionVersion = "2022-06-28";

function readBody(req: VercelRequest): ContactPayload {
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body) as ContactPayload;
    } catch {
      return {};
    }
  }

  return (req.body ?? {}) as ContactPayload;
}

function clean(value: unknown, maxLength: number) {
  return String(value ?? "")
    .trim()
    .slice(0, maxLength);
}

function textProperty(content: string) {
  return {
    rich_text: [
      {
        text: { content },
      },
    ],
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = readBody(req);
  const name = clean(body.name, 80);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const message = clean(body.message, 1800);

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "请填写所有必填字段" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "请填写有效的邮箱地址" });
  }

  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!token || !databaseId) {
    console.error("Missing NOTION_TOKEN or NOTION_DATABASE_ID environment variables");
    return res.status(500).json({ error: "服务器暂未配置留言接收，请联系管理员" });
  }

  const nameProperty = process.env.NOTION_NAME_PROPERTY || "姓名";
  const emailProperty = process.env.NOTION_EMAIL_PROPERTY || "邮箱";
  const phoneProperty = process.env.NOTION_PHONE_PROPERTY || "电话";
  const messageProperty = process.env.NOTION_MESSAGE_PROPERTY || "咨询内容";
  const submittedAtProperty = process.env.NOTION_SUBMITTED_AT_PROPERTY;

  const properties: Record<string, unknown> = {
    [nameProperty]: {
      title: [
        {
          text: { content: name },
        },
      ],
    },
    [emailProperty]: {
      email,
    },
    [phoneProperty]: {
      phone_number: phone,
    },
    [messageProperty]: textProperty(message),
  };

  if (submittedAtProperty) {
    properties[submittedAtProperty] = {
      date: {
        start: new Date().toISOString(),
      },
    };
  }

  const notionRes = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": notionVersion,
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties,
    }),
  });

  if (!notionRes.ok) {
    const errorText = await notionRes.text();
    console.error("Notion API error:", notionRes.status, errorText);
    return res.status(502).json({ error: "留言提交失败，请稍后重试" });
  }

  return res.status(200).json({ success: true });
}
