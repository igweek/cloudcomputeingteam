# 云计算专业官网

Vite + React + Vercel Serverless Functions。前端表单提交到 `/api/contact`，后端将留言写入 Notion 数据库。

## 本地运行

```bash
npm install
npm run dev
```

本地预览：

```bash
npm run preview:local
```

## Notion 留言数据库

在 Notion 中创建一个数据库，并至少包含以下属性：

| 属性名 | 类型 |
| --- | --- |
| 姓名 | Title |
| 邮箱 | Email |
| 电话 | Phone |
| 咨询内容 | Text |

可选属性：

| 属性名 | 类型 |
| --- | --- |
| 提交时间 | Date |

创建 Notion Integration 后，把数据库分享给这个 Integration。然后在 Vercel 环境变量中配置：

```bash
NOTION_TOKEN=你的 Notion Internal Integration Secret
NOTION_DATABASE_ID=你的 Notion Database ID
```

如果你的 Notion 属性名不同，可以额外配置：

```bash
NOTION_NAME_PROPERTY=姓名
NOTION_EMAIL_PROPERTY=邮箱
NOTION_PHONE_PROPERTY=电话
NOTION_MESSAGE_PROPERTY=咨询内容
NOTION_SUBMITTED_AT_PROPERTY=提交时间
```

## 部署到 Vercel

1. 将项目推送到 GitHub。
2. 在 Vercel 新建项目，选择该 GitHub 仓库。
3. Framework 选择 `Vite`。
4. Build Command 使用 `npm run build`。
5. Output Directory 使用 `dist`。
6. 在 Vercel 的 Project Settings -> Environment Variables 添加 Notion 环境变量。
7. 点击 Deploy。

部署后，网站表单会调用同域名下的 `/api/contact`，留言会写入 Notion 数据库。
