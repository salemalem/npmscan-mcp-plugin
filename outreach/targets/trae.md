# TRAE marketplace (international and China)

Two rows in the tracker: `trae-intl` ([work.trae.ai/marketplace](https://work.trae.ai/marketplace)) and `trae-cn` ([solo.trae.cn/marketplace](https://solo.trae.cn/marketplace)).

## Research (2026-10-26)

- **What it is:** TraeCode added a Marketplace with three tabs (Plugins, Skills, MCP) in September 2026: v3.5.97–3.5.104 on 2026-09-20 (international); the Chinese launch post on forum.trae.cn is dated 2026-09-08. Docs: [Plugin marketplace](https://docs.trae.ai/ide/marketplace), [Skills](https://docs.trae.ai/ide/skills), [Add MCP servers](https://docs.trae.ai/ide/add-mcp-servers).
- **No submission route.** The docs only cover installing. "Upload Skill" in the Skills tab installs a skill for yourself; it doesn't publish one. No listing requests in [Trae-AI/TRAE](https://github.com/Trae-AI/TRAE) issues yet.
- **Where listings come from (inferred, not confirmed by TRAE):**
  - Big-name plugins (CodeRabbit, Cloudflare, Expo, CircleCI, NVIDIA, Build iOS/Web/macOS Apps) are OpenAI's curated Codex plugins in [openai/plugins](https://github.com/openai/plugins).
  - 17 of 18 small community plugins checked (Brooks Lint, HOTL, Velith, VidSeeds, Archcore, Agent Message Queue, ...) are in [awesome-codex-plugins](https://github.com/hashgraph-online/awesome-codex-plugins), and every one ships `.codex-plugin/plugin.json`. So the awesome-codex-plugins listing (see [codex.md](codex.md)) is the likeliest way in.
  - China adds partner plugins (Feishu, DingTalk, WeCom, Tencent Docs, Alipay, Douyin), which look like business deals.
- **Contacts** (from TRAE's own web app config): `feedback@mail.trae.ai` (international), `feedback@mail.trae.cn` (China). Also the [TRAE Discord](https://discord.com/servers/trae-1320998163615846420), GitHub Discussions on Trae-AI/TRAE, and forum.trae.cn (互动交流). In-app: avatar > Report Issue.
- **.cn sites resolve to 127.0.0.1 from the agent's machine**, so the China marketplace and forum have to be checked from the user's browser.
- **One-click MCP install link** ([docs](https://docs.trae.ai/ide/mcp-server-install-links)):
  `trae://trae.ai-ide/mcp-import?type=http&name=npmscan&config=eyJ1cmwiOiJodHRwczovL25wbXNjYW4uY29tL2FwaS9tY3AifQ%3D%3D`
- The shyngys.shynbolatov@gmail.com account has been a TRAE Pro member since 2025.

## What we send

Emails: Gmail drafts "Marketplace listing request: NPMScan (npm supply-chain security)" to `feedback@mail.trae.ai`, and "插件市场上架申请：NPMScan — npm 供应链安全扫描插件" to `feedback@mail.trae.cn`.

### GitHub Discussion (Trae-AI/TRAE, Ideas or General)

Title: `Marketplace listing request: NPMScan (npm supply-chain security plugin)`

```
Hi TRAE team,

I maintain NPMScan, a free, read-only npm supply-chain security plugin. I'd like to get it listed in the TRAE Marketplace (Plugins and MCP tabs), and I couldn't find a submission process in the docs.

What it does: before you install or upgrade an npm package, it checks for malware, known vulnerabilities (OSV.dev, GitHub Advisories, NIST NVD with CISA KEV and EPSS), typosquats, maintainer takeovers and risky install scripts. It can also audit a package.json, lockfile or GitHub repo. It's five skills plus a hosted MCP server (23 tools, no API key or account).

- Plugin repo: https://github.com/salemalem/npmscan-mcp-plugin (Codex manifest at .codex-plugin/plugin.json, same layout as the plugins already in the Marketplace)
- Listed in Anthropic's Claude directory and as a ChatGPT app
- Works in TRAE today via Settings > MCP, or this install link: trae://trae.ai-ide/mcp-import?type=http&name=npmscan&config=eyJ1cmwiOiJodHRwczovL25wbXNjYW4uY29tL2FwaS9tY3AifQ%3D%3D

How do third-party plugins and MCP servers get into the Marketplace? Happy to adjust the manifest or provide anything you need.
```

### Discord (feedback or suggestions channel)

```
Hi! I maintain NPMScan, a free npm supply-chain security plugin (malware, CVEs, typosquats and maintainer takeovers, checked before you install). It's a Codex-format plugin with five skills and a hosted MCP server, no API key. Is there a way to submit it to the TRAE Marketplace? Repo: https://github.com/salemalem/npmscan-mcp-plugin
```

### forum.trae.cn (互动交流; or reply to the launch post https://forum.trae.cn/t/topic/180367)

Title: `插件市场上架申请：NPMScan — npm 供应链安全扫描插件`

```
TRAE 团队你好，

我是 NPMScan 的维护者。NPMScan 是一个免费、只读的 npm 供应链安全插件，想申请上架 TRAE 插件市场（插件和 MCP 两个分区），但在文档里没有找到提交方式。

功能：在安装或升级 npm 包之前，检查恶意代码、已知漏洞（OSV.dev、GitHub Advisories、NIST NVD，并结合 CISA KEV 和 EPSS）、仿冒包名（typosquatting）、维护者账号被接管和高风险安装脚本；也可以审计 package.json、lockfile 或 GitHub 仓库。插件包含 5 个技能（Skill）和一个托管的 MCP Server（23 个工具，无需 API Key 或账号）。

- 插件仓库：https://github.com/salemalem/npmscan-mcp-plugin（包含 .codex-plugin/plugin.json，与市场中现有插件的格式相同）
- 已上架 Anthropic 的 Claude 插件目录和 ChatGPT 应用
- 现在就可以在 TRAE 中使用：设置 > MCP > 添加 > 手动配置，地址 https://npmscan.com/api/mcp

请问第三方插件和 MCP Server 如何申请上架？如需调整清单文件或补充材料，我随时配合。
```
