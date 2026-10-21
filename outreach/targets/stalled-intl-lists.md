# Non-English lists checked and skipped

Research for the `stalled-intl-lists` row in `tracker.csv`. Lists that fit got their own rows; everything here was checked and skipped, so don't check these again unless the reason has changed.

## How the 2026-10-21 sweep worked

About 100 repos were checked. Candidates came from:

- **GitHub search** in 18 languages (Chinese simplified and traditional, Russian, Ukrainian, Japanese, Korean, Spanish, Portuguese, German, French, Vietnamese, Turkish, Indonesian, Persian, Arabic, Hindi, Italian, Polish, Thai): about 110 keyword queries, then 24 `awesome <topic> in:name pushed:>2026-08-15` queries with 100 results each, keeping only lists with non-English descriptions or language-coded names.
- **awesome.ecosyste.ms**: the whole index (10,643 lists) via `https://awesome.ecosyste.ms/api/v1/lists?per_page=100&page=N`, filtered for non-English descriptions plus relevant topics (372 matches).
- **Links inside the lists themselves**, which found mcpnavi.jp, mcpstore.co and the DeepSeek Harness directories.

Each candidate got the same check: stars, last push, open PRs, PRs from people other than the owner (bots excluded) merged or closed in the last 30 days, and owner commits. A list that closes outside PRs while the owner commits a lot may be adding entries by hand (laolaoshiren does this), so those got a manual look.

Gitee (China's main code host) wasn't searched: its API needs a login token and its web search blocks scripts (HTTP 405).

## Earlier sweep (2026-10-21, first pass)

No outside merges, dead, or local-services-only: LeslieLeung/awesome-mcp-server-cn, Vincent-crypto-coder and Bierxiensi awesome-mcp-servers-cn, xu-xiang/everything-claude-code-zh, lhfer/claude-howto-zh-cn, xianyu110/awesome-claudcode-tutorial, cfrs2005/claude-init, DennisLiuCk/claude-plugin-marketplace, Xueheng-Li/sysu-awesome-cc, Raymondhou0917/claude-code-resources, Shown06/awesome-japanese-mcp, daniel-filius/awesome-mcp-brasil, DeusData/awesome-claude-code-2, awesome-mcp-ru/awesome-mcp-ru, mcp-archive.com.

## Second sweep (2026-10-21)

| Repo | Stars | Last push | Outside merges (30d) | Why skipped |
|---|---:|---|---:|---|
| [1234yyyyyy/ai-tools](https://github.com/1234yyyyyy/ai-tools) | 0 | 2026-10-18 | 0 | new (0 stars), owner-only |
| [51fxdaohang/awesome-ai-coding-cn](https://github.com/51fxdaohang/awesome-ai-coding-cn) | 0 | 2026-10-13 | 0 | Chinese AI-tool navigation list; owner-only, 0-1 stars |
| [51fxdaohang/awesome-ai-tools-cn](https://github.com/51fxdaohang/awesome-ai-tools-cn) | 1 | 2026-10-21 | 0 | Chinese AI-tool navigation list; owner-only, 0-1 stars |
| [AdamPlatin123/dsh-plugin-radar](https://github.com/AdamPlatin123/dsh-plugin-radar) | 1481 | 2026-10-21 | 0 | DSH plugin crawler (dsh-plugin row) |
| [AICL-Lab/awesome-claude-skills-zh](https://github.com/AICL-Lab/awesome-claude-skills-zh) | - | - | - | repo gone (404) |
| [AIPMAndy/awesome-openclaw-skills-CN](https://github.com/AIPMAndy/awesome-openclaw-skills-CN) | 126 | 2026-06-17 | 0 | OpenClaw skills only; quiet since 2026-06 |
| [alecm20/awesome-ai-tools](https://github.com/alecm20/awesome-ai-tools) | 5 | 2025-12-16 | 0 | 5 stars, no outside merges |
| [awesome-deepseekharness/awesome-deepseek-harness](https://github.com/awesome-deepseekharness/awesome-deepseek-harness) | 23 | 2026-10-21 | 13 | DSH only; active (dsh-plugin row) |
| [awesome-dsh-plugin/awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) | 19776 | 2026-10-20 | 26 | DSH plugins only; very active, the main target once a DSH plugin exists (dsh-plugin row) |
| [bbylw/awesome-claude-code-cn](https://github.com/bbylw/awesome-claude-code-cn) | 0 | 2026-04-16 | 0 | translation; 0 stars |
| [billLiao/awesome-dsh-plugin](https://github.com/billLiao/awesome-dsh-plugin) | 15 | 2026-10-21 | 0 | DSH; outside PRs closed unmerged |
| [BraveCat79/awesome-devtools-ko](https://github.com/BraveCat79/awesome-devtools-ko) | 1 | 2026-10-19 | 0 | tools the author installed personally; 1 star |
| [bruc3van/awesome-dsh-plugin](https://github.com/bruc3van/awesome-dsh-plugin) | 439 | 2026-10-20 | 8 | DSH plugins only; crawls the dsh-plugin topic daily (dsh-plugin row) |
| [byodian/awesometools](https://github.com/byodian/awesometools) | 128 | 2026-09-08 | 0 | no outside merge since 2022 |
| [clawhome/awesome-dsh-resources](https://github.com/clawhome/awesome-dsh-resources) | 1 | 2026-08-21 | 0 | DSH; 1 star, quiet since 2026-08 |
| [cogine-ai/awesome-openclaw-zh](https://github.com/cogine-ai/awesome-openclaw-zh) | 240 | 2026-10-11 | 1 | OpenClaw use cases, not a tool directory |
| [DHO212/awesome-indonesian-cybersecurity](https://github.com/DHO212/awesome-indonesian-cybersecurity) | 0 | 2026-10-19 | 0 | Indonesian resources only |
| [Digidai/awesome-AI](https://github.com/Digidai/awesome-AI) | 3 | 2026-02-07 | 0 | 3 stars, no outside merges |
| [dshoneys/awesome-dshoneys](https://github.com/dshoneys/awesome-dshoneys) | 3 | 2026-09-17 | 0 | DSH 'certified plugins' with security reports; quiet since 2026-09 |
| [eruo005-dev/awesome-turkish-mcp](https://github.com/eruo005-dev/awesome-turkish-mcp) | 2 | 2026-06-19 | 0 | Turkish services only |
| [findradish-maker/awesome-ai-tools-navtool](https://github.com/findradish-maker/awesome-ai-tools-navtool) | 1 | 2026-10-19 | 0 | Chinese AI-tool navigation list; owner-only, 0-1 stars |
| [FTShare-Lab/ftai-desktop-plugins-official](https://github.com/FTShare-Lab/ftai-desktop-plugins-official) | 0 | 2026-08-25 | 0 | FtAi Desktop's own registry; 0 stars, no outside PRs |
| [geekeryy/awesome](https://github.com/geekeryy/awesome) | 4 | 2025-11-14 | 0 | quiet since 2025-11 |
| [gizipp/awesome-indonesian-dev-tools](https://github.com/gizipp/awesome-indonesian-dev-tools) | 0 | 2026-06-28 | 0 | 0 stars, no PRs |
| [gongshuai521-stack/awesome-ai-tools-cn](https://github.com/gongshuai521-stack/awesome-ai-tools-cn) | 0 | 2026-10-06 | 0 | Chinese AI-tool navigation list; owner-only, 0-1 stars |
| [GulajavaMinistudio/awesome-copilot-id](https://github.com/GulajavaMinistudio/awesome-copilot-id) | 84 | 2026-10-20 | 0 | Indonesian copy of awesome-copilot; owner-only |
| [gulmezeren2-byte/awesome-turkish-mcp](https://github.com/gulmezeren2-byte/awesome-turkish-mcp) | 0 | 2026-07-18 | 0 | Turkish services only |
| [hanzhichao/awesome-testing](https://github.com/hanzhichao/awesome-testing) | 12 | 2025-09-12 | 0 | quiet since 2025-09 |
| [Hexlet/ru-awesome-opensource](https://github.com/Hexlet/ru-awesome-opensource) | 88 | 2026-08-21 | 0 | Russian list of projects that want contributors; not a tool directory |
| [hgko1207/awesome-ai-coding-kr](https://github.com/hgko1207/awesome-ai-coding-kr) | 0 | 2026-10-21 | 0 | Korean AI coding tools the author tried personally; no outside PRs |
| [HK-hub/AgentSkills](https://github.com/HK-hub/AgentSkills) | 6 | 2026-08-18 | 0 | personal collection |
| [holtwood/awesome-cursorrules-zh](https://github.com/holtwood/awesome-cursorrules-zh) | 239 | 2026-10-19 | 0 | Cursor rules only |
| [hotpot-labs/awesome-dsh-industry-plugins](https://github.com/hotpot-labs/awesome-dsh-industry-plugins) | 1 | 2026-10-21 | 0 | DSH industry plugins; owner-only so far |
| [huaize2020/awesome-nodejs](https://github.com/huaize2020/awesome-nodejs) | 1299 | 2024-06-16 | 0 | Chinese Node.js list; no activity since 2024-06 |
| [HubWu42/hubwu-skills](https://github.com/HubWu42/hubwu-skills) | 4 | 2026-06-17 | 0 | personal collection |
| [iAmCorey/awesome-ai-directory](https://github.com/iAmCorey/awesome-ai-directory) | 250 | 2026-02-27 | 0 | lists AI directories, not tools; 27 open PRs, last outside merge 2026-02 |
| [iAmCorey/awesome-indie-hacker-tools](https://github.com/iAmCorey/awesome-indie-hacker-tools) | 1430 | 2026-05-16 | 0 | 86 open PRs, no outside PR ever merged |
| [imsai-sh/awesome-deepseek-harness-plugins](https://github.com/imsai-sh/awesome-deepseek-harness-plugins) | 306 | 2026-10-21 | 89 | DSH plugins only; auto-collects the dsh-plugin topic (dsh-plugin row) |
| [inmve/awesome-ai-coding-techniques](https://github.com/inmve/awesome-ai-coding-techniques) | 349 | 2025-11-26 | 0 | techniques, not tools; quiet since 2025-11 |
| [itgoyo/Awesome-VibeCoding](https://github.com/itgoyo/Awesome-VibeCoding) | 3 | 2026-09-10 | 0 | requires 100+ stars; quiet since 2026-09 |
| [J-nowcow/awesome-korean-agent-skills](https://github.com/J-nowcow/awesome-korean-agent-skills) | 50 | 2026-10-20 | 0 | Korean-language skills; owner-only so far (3 open PRs) |
| [JeeFH/awesome-dsh-zh](https://github.com/JeeFH/awesome-dsh-zh) | 1 | 2026-08-16 | 0 | DSH; 1 star, quiet since 2026-08 |
| [jiji262/awesome-deepseek-harness](https://github.com/jiji262/awesome-deepseek-harness) | 16 | 2026-08-19 | 0 | DSH; 32 open PRs, no outside merge since 2026-08 |
| [jochne/linuxdo-awesome-skills](https://github.com/jochne/linuxdo-awesome-skills) | 90 | 2026-08-19 | 0 | only skills posted on the Linux.do forum |
| [justxor/awesome-ai-devtools-ru](https://github.com/justxor/awesome-ai-devtools-ru) | 12 | 2026-10-19 | 0 | Russian AI devtools catalog: right topic, but new (12 stars) with no outside merges yet; recheck later |
| [kejixiaoliang/awesome-dsh-plugins](https://github.com/kejixiaoliang/awesome-dsh-plugins) | 63 | 2026-10-21 | 0 | DSH plugins only; needs a DSH bundle first (dsh-plugin row) |
| [KerberosClaw/kc_ai_skills](https://github.com/KerberosClaw/kc_ai_skills) | 79 | 2026-10-16 | 0 | personal skill collection |
| [LangGPT/awesome-claude-code](https://github.com/LangGPT/awesome-claude-code) | 270 | 2026-05-24 | 0 | 80 open PRs, no outside PR ever merged, no commits since 2026-05 |
| [laosj16/awesome-claude-skills-ZH_CN](https://github.com/laosj16/awesome-claude-skills-ZH_CN) | 0 | 2026-06-18 | 0 | translation of an English list |
| [launotice-lang/awesome-chinese-going-global](https://github.com/launotice-lang/awesome-chinese-going-global) | 2 | 2026-05-03 | 0 | 2 stars, no PRs |
| [Levy-Y/awesome-IT-finds](https://github.com/Levy-Y/awesome-IT-finds) | 2 | 2026-01-24 | 0 | 2 stars, no outside merges |
| [libukai/awesome-agent-skills](https://github.com/libukai/awesome-agent-skills) | 5190 | 2026-09-04 | 0 | 84 open PRs, no outside PR ever merged |
| [libukai/awesome-deepseek-harness](https://github.com/libukai/awesome-deepseek-harness) | 312 | 2026-09-12 | 0 | DSH guide; 65 open PRs, no outside merge ever (dsh-plugin row) |
| [lingxling/awesome-skills-cn](https://github.com/lingxling/awesome-skills-cn) | 317 | 2026-10-07 | 0 | Chinese study copies of popular skills; no outside merges |
| [LM20230311/awesome-dsh-plugin-cn](https://github.com/LM20230311/awesome-dsh-plugin-cn) | 1 | 2026-08-19 | 0 | DSH; 1 star, quiet since 2026-08 |
| [meskeIA/awesome-spanish-toolkit](https://github.com/meskeIA/awesome-spanish-toolkit) | - | - | - | repo gone (404) |
| [roboco-io/plugins](https://github.com/roboco-io/plugins) | 21 | 2026-10-10 | 0 | a Korean team's own plugin marketplace |
| [sangnigege/Awesome_Pentest_Tools](https://github.com/sangnigege/Awesome_Pentest_Tools) | 65 | 2026-09-09 | 0 | pentest tools; owner-only, quiet since 2026-09 |
| [sanhuang520-ship-it/awesome-chinese-ai-tools](https://github.com/sanhuang520-ship-it/awesome-chinese-ai-tools) | 11 | 2026-10-19 | 0 | 11 stars; owner-only commits |
| [shishirui/awesome-claude-skills-zh](https://github.com/shishirui/awesome-claude-skills-zh) | 23 | 2026-05-20 | 0 | quiet since 2026-05, no outside merges |
| [Shyboy0499/awesome-deepseek-mcp](https://github.com/Shyboy0499/awesome-deepseek-mcp) | 0 | 2026-09-04 | 0 | MCP servers for DeepSeek (bilingual); 0 stars, no PRs, quiet since 2026-09 |
| [shyshyshyyyy/awesome-mcp-zh](https://github.com/shyshyshyyyy/awesome-mcp-zh) | 0 | 2026-06-20 | 0 | 0 stars, untouched since 2026-06 |
| [sissc0731/indie-hacking-tools](https://github.com/sissc0731/indie-hacking-tools) | 1 | 2026-06-14 | 0 | 1 star, quiet since 2026-06 |
| [smvlx/awesome-ru-ai-skills](https://github.com/smvlx/awesome-ru-ai-skills) | 79 | 2026-09-10 | 0 | Russian-service integrations only |
| [superiorlu/AITreasureBox](https://github.com/superiorlu/AITreasureBox) | 874 | 2026-10-21 | 0 | filled automatically by a crawler; no submissions |
| [teamssix/awesome-cloud-security](https://github.com/teamssix/awesome-cloud-security) | 2117 | 2024-10-28 | 0 | no activity since 2024-10 |
| [tomcatmew/awesome-Claude-code](https://github.com/tomcatmew/awesome-Claude-code) | 1 | 2026-10-19 | 0 | 1 star, owner-only |
| [ugliai/awesome-ai-tools](https://github.com/ugliai/awesome-ai-tools) | 1 | 2026-08-27 | 0 | Chinese AI-tool navigation list; owner-only, 0-1 stars |
| [ununununium/awesome-claude-skills-cn](https://github.com/ununununium/awesome-claude-skills-cn) | 0 | 2026-06-19 | 0 | translation of an English list |
| [WangRongsheng/awesome-LLM-resources](https://github.com/WangRongsheng/awesome-LLM-resources) | 9030 | 2026-10-20 | 0 | MCP section lists only directories and frameworks, not single servers; 38 open PRs, last outside merge 2026-09-02 |
| [web-casa/Awesome-DeepSeek-Harness-Plugins](https://github.com/web-casa/Awesome-DeepSeek-Harness-Plugins) | 117 | 2026-08-31 | 0 | DSH; auto-generated, quiet since 2026-08 |
| [WenyuChiou/awesome-agentic-ai-zh](https://github.com/WenyuChiou/awesome-agentic-ai-zh) | 7810 | 2026-10-17 | 1 | 7.8k-star learning roadmap, not a tool directory; 1 outside merge in 30d |
| [whyihaveyou/dsh-suite](https://github.com/whyihaveyou/dsh-suite) | 63 | 2026-10-21 | 0 | DSH plugin crawler (dsh-plugin row) |
| [xianyu110/awesome-deepseek-harness](https://github.com/xianyu110/awesome-deepseek-harness) | 11 | 2026-08-23 | 0 | DSH; 29 open PRs, no outside merge since 2026-08 |
| [xianyu110/awesome-openclaw-tutorial](https://github.com/xianyu110/awesome-openclaw-tutorial) | 4570 | 2026-10-04 | 0 | OpenClaw tutorial, not a directory; last outside merge 2026-04 |
| [xiaohei16k/awesome-claude-commands-zh](https://github.com/xiaohei16k/awesome-claude-commands-zh) | 1 | 2026-10-19 | 0 | Claude Code command reference, not a directory |
| [XiaomingX/awesome-ai-tool](https://github.com/XiaomingX/awesome-ai-tool) | - | - | - | repo gone (404) |
| [XiaomingX/indie-hacker-tools-plus](https://github.com/XiaomingX/indie-hacker-tools-plus) | 1900 | 2026-10-21 | 1 | submissions go through issues; 30 open PRs; its MCP section is a short 'high-impact servers' pick |
| [xlabs-club/awesome-x-ops](https://github.com/xlabs-club/awesome-x-ops) | 19 | 2026-10-08 | 0 | DevSecOps map; no outside merge since 2026-06 |
| [yaolifeng0629/Awesome-independent-tools](https://github.com/yaolifeng0629/Awesome-independent-tools) | 2471 | 2026-10-16 | 0 | 76 open PRs, last outside merge 2026-05-11 |
| [yiancode/AwesomeClaudeCode](https://github.com/yiancode/AwesomeClaudeCode) | 7 | 2026-10-20 | 0 | 14 open PRs, no outside merge ever |
| [YouTuAI/awesome-ai-tools](https://github.com/YouTuAI/awesome-ai-tools) | 0 | 2026-09-11 | 0 | Chinese AI-tool navigation list; owner-only, 0-1 stars |
| [YSGStudyHards/Awesome-AI](https://github.com/YSGStudyHards/Awesome-AI) | 22 | 2026-09-28 | 3 | learning resources (math, algorithms), not tools |
| [yzfly/Awesome-AGI-Agents](https://github.com/yzfly/Awesome-AGI-Agents) | 566 | 2026-10-15 | 5 | active (5 merges/30d) but lists agent projects only; npmscan isn't an agent |
| [yzfly/awesome-dsh-skills](https://github.com/yzfly/awesome-dsh-skills) | 20 | 2026-10-21 | 0 | DSH skills; owner-only. Covered by the dsh-plugin row |
| [zcweah1981/awesome-hermes-agent-zh](https://github.com/zcweah1981/awesome-hermes-agent-zh) | 55 | 2026-10-19 | 0 | Hermes Agent guide; owner-only |
| [zhashkevych/awesome-backend](https://github.com/zhashkevych/awesome-backend) | 3491 | 2026-04-17 | 0 | RU/EN backend list; no outside merge since 2026-02 |
| [zhuyansen/awesome-codex-skills](https://github.com/zhuyansen/awesome-codex-skills) | 0 | 2026-10-20 | 0 | Codex skills; owner-only, 0 stars |
| [zieang88888/awesome-ai-tools-zh](https://github.com/zieang88888/awesome-ai-tools-zh) | 1 | 2026-10-05 | 0 | Chinese AI-tool navigation list; owner-only, 0-1 stars |

## Third sweep: less common languages (2026-10-21)

60 more repos (50 planned, plus 10 from a final README-text pass). Queries were written per language: native-script words for list / tools / resources / AI / programming / security, romanized `awesome <country>`, `topic:awesome-list <country>`, `topic:awesome <native language name>`, and `topic:awesome-list "<local phrase for AI>" in:readme`. Languages: Hindi, Bengali, Tamil, Telugu, Marathi, Urdu, Nepali, Sinhala, Polish, Czech, Slovak, Hungarian, Romanian, Bulgarian, Serbian, Croatian, Slovenian, Greek, Hebrew, Dutch, Swedish, Norwegian, Danish, Finnish, Ukrainian, Belarusian, Lithuanian, Latvian, Estonian, Georgian, Armenian, Azerbaijani, Kazakh, Uzbek, Kyrgyz, Tajik, Mongolian, Swahili, Amharic, Arabic, Persian, Kurdish, Turkish, Vietnamese, Indonesian, Malay, Filipino, Thai, Khmer, Burmese, Catalan, plus Latin American and other regional queries. Codeberg was searched too (English privacy/FOSS lists only); Gitee blocks scripts.

Three got rows: `student-gpt-tools` (English/Chinese/Hindi AI tools for students), `awesome-ia-portugues` (Portuguese AI tools) and `made-in-kz` (only if npmscan's maintainer is from Kazakhstan). The rest:

| Repo | Stars | Last push | Outside merges (30d) | Why skipped |
|---|---:|---|---:|---|
| [abdessamadbettal/awesome-arabic-tools](https://github.com/abdessamadbettal/awesome-arabic-tools) | 9 | 2026-07-28 | 0 | tools built for Arabic speakers only |
| [abdessamadbettal/awesome-design-productivity](https://github.com/abdessamadbettal/awesome-design-productivity) | 11 | 2026-07-28 | 0 | free dev/design/AI tools (Morocco); 15 PRs waiting, last outside merge 2026-07-23 |
| [acekyd/made-in-nigeria](https://github.com/acekyd/made-in-nigeria) | 1155 | 2026-10-19 | 2 | active (1.2k stars) but tools made by Nigerians only |
| [AlirezaBelal/persian-programming-resources](https://github.com/AlirezaBelal/persian-programming-resources) | 5 | 2026-10-12 | 0 | Persian learning resources; owner-only |
| [AnkTechsol/Useful-repo-by-anktechsol](https://github.com/AnkTechsol/Useful-repo-by-anktechsol) | 0 | 2026-10-21 | 0 | auto-updating trending list; no submissions |
| [azamatnarzuloyev/uzbekistan-web-developer-resources](https://github.com/azamatnarzuloyev/uzbekistan-web-developer-resources) | 0 | 2026-03-18 | 0 | web-dev resources for Uzbekistan (local payment APIs, hosting); 0 stars |
| [banglakit/awesome-bangla](https://github.com/banglakit/awesome-bangla) | 580 | 2026-05-16 | 0 | Bangla language-computing tools and datasets only |
| [barnamenevisi/free-resources](https://github.com/barnamenevisi/free-resources) | 1292 | 2026-10-11 | 1 | Persian free learning resources (1.3k stars); courses and books, not tools |
| [bdnhost/claude-skills](https://github.com/bdnhost/claude-skills) | 1 | 2026-04-25 | 0 | auto-discovered Claude skills registry; quiet since 2026-04 |
| [bsab/italia-mcp-servers](https://github.com/bsab/italia-mcp-servers) | 92 | 2026-09-11 | 0 | MCP servers for Italian services only |
| [bsab/sweden-mcp-servers](https://github.com/bsab/sweden-mcp-servers) | 55 | 2026-09-23 | 0 | MCP servers for Swedish data and services only |
| [buren/awesome-sweden](https://github.com/buren/awesome-sweden) | 210 | 2026-04-21 | 0 | tools for coding for the Swedish market (BankID, personnummer); local |
| [CansinM/teknoradar](https://github.com/CansinM/teknoradar) | 1 | 2026-07-13 | 0 | Turkish tech-news radar; 1 star, quiet since 2026-07 |
| [csiber/awesome-magyar-saas](https://github.com/csiber/awesome-magyar-saas) | 0 | 2026-05-06 | 0 | Hungarian-market open-source tools; 0 stars |
| [cyberlytics/awesome-basics](https://github.com/cyberlytics/awesome-basics) | 14 | 2026-10-19 | 0 | German CS/AI learning resources; owner-only |
| [cyberlytics/awesome-software-engineering-tools](https://github.com/cyberlytics/awesome-software-engineering-tools) | 9 | 2026-10-08 | 0 | German software-engineering tools; outside PRs closed unmerged, 9 stars |
| [deathlegionteamlk/awesome-srilankan-devs](https://github.com/deathlegionteamlk/awesome-srilankan-devs) | 1 | 2026-07-14 | 0 | projects by Sri Lankan developers only |
| [fevziegeyurtsevenler/awesome-agent-supply-chain-security](https://github.com/fevziegeyurtsevenler/awesome-agent-supply-chain-security) | 1 | 2026-08-08 | 0 | exact topic (security of agent skills/MCP) but quiet since 2026-08-08, 3 PRs waiting, none merged; noted on the awesome-ai-security-tr row |
| [fevziegeyurtsevenler/turkce-siber-guvenlik-kaynaklari](https://github.com/fevziegeyurtsevenler/turkce-siber-guvenlik-kaynaklari) | 14 | 2026-10-06 | 1 | Turkish-language cybersecurity learning resources only |
| [filipecalegario/awesome-generative-ai](https://github.com/filipecalegario/awesome-generative-ai) | 3559 | 2025-12-18 | 0 | English, 3.6k stars, but 93 PRs waiting, no outside merge ever, quiet since 2025-12 |
| [godz1llla/awesome-kazakhstan-dev](https://github.com/godz1llla/awesome-kazakhstan-dev) | 39 | 2026-09-06 | 0 | Kazakhstan IT resources (companies, grants, communities); 3 PRs waiting, none merged |
| [gucomp/awesome-cs-ce](https://github.com/gucomp/awesome-cs-ce) | 1 | 2026-05-28 | 0 | Persian CS learning resources; 1 star |
| [h-abar/scholar-dev-hub](https://github.com/h-abar/scholar-dev-hub) | 1 | 2026-07-18 | 0 | free resources for students and developers; 1 star, no merges |
| [h9-tec/arabic-ai-atlas](https://github.com/h9-tec/arabic-ai-atlas) | 38 | 2026-10-21 | 0 | Arabic AI ecosystem map; owner-only |
| [iaunn/awesome-thai-ai-projects](https://github.com/iaunn/awesome-thai-ai-projects) | 12 | 2026-08-23 | 0 | AI products by Thai developers only |
| [italia-opensource/awesome-italia-opensource](https://github.com/italia-opensource/awesome-italia-opensource) | 336 | 2026-10-15 | 7 | active (7 merges/30d) but Italian open-source projects only |
| [jeswinsimon/awesome-made-by-indians](https://github.com/jeswinsimon/awesome-made-by-indians) | 135 | 2026-03-16 | 0 | projects by Indian developers only; quiet since 2026-03 |
| [jim-schwoebel/awesome_ai_agents](https://github.com/jim-schwoebel/awesome_ai_agents) | 2010 | 2026-03-28 | 0 | English, 2k stars, but 77 PRs waiting and no outside PR ever merged |
| [lirantal/awesome-opensource-israel](https://github.com/lirantal/awesome-opensource-israel) | 442 | 2026-10-18 | 4 | active (442 stars) but Israeli-made projects only |
| [manduks/awesome-ai-mexico](https://github.com/manduks/awesome-ai-mexico) | 0 | 2026-03-20 | 0 | AI tools for businesses in Mexico/LatAm; 0 stars, untouched since 2026-03 |
| [me-shaon/bangla-programming-resources](https://github.com/me-shaon/bangla-programming-resources) | 2022 | 2026-08-20 | 0 | Bangla tutorials and references (2k stars); learning material, not tools |
| [mrzroot/awesome-persian-developer-resources](https://github.com/mrzroot/awesome-persian-developer-resources) | 2 | 2026-10-16 | 0 | Persian developer resources; 2 stars, owner-only |
| [N0vachr0n0/Infinity-Stack](https://github.com/N0vachr0n0/Infinity-Stack) | 13 | 2026-01-27 | 0 | personal dev/devops/security bookmarks; quiet since 2026-01 |
| [ofershap/awesome-hebrew-dev](https://github.com/ofershap/awesome-hebrew-dev) | 1 | 2026-03-07 | 0 | Hebrew developer resources; 1 star, untouched since 2026-03 |
| [onnetvikash/best-ai-tools-for-productivity](https://github.com/onnetvikash/best-ai-tools-for-productivity) | 0 | 2026-09-28 | 0 | 0 stars, owner-only |
| [OsamaALHajj/awesome-arabic-ai](https://github.com/OsamaALHajj/awesome-arabic-ai) | 5 | 2026-09-12 | 0 | Arabic-language AI resources; 5 stars |
| [OSSPhilippines/awesome-pinoy-made](https://github.com/OSSPhilippines/awesome-pinoy-made) | 130 | 2026-06-07 | 0 | projects by Filipino maintainers only |
| [P3M-ACTF/Awesome-ASIR](https://github.com/P3M-ACTF/Awesome-ASIR) | 0 | 2026-10-19 | 0 | Spanish vocational IT course library; 0 stars, owner-only |
| [raazkhnl/awesome-digital-nepal](https://github.com/raazkhnl/awesome-digital-nepal) | 0 | 2026-04-27 | 0 | Nepal's digital ecosystem (local APIs and datasets); 0 stars |
| [rahulcommercial/awesome-claude-skills-india](https://github.com/rahulcommercial/awesome-claude-skills-india) | 0 | 2026-06-07 | 0 | skills by/for Indian developers; 0 stars |
| [rdmgator12/awesome-chatgpt-apps](https://github.com/rdmgator12/awesome-chatgpt-apps) | 16 | 2026-07-02 | 0 | mirror of OpenAI's ChatGPT Apps directory (npmscan not in it); 11 PRs waiting, none ever merged, quiet since 2026-07 |
| [Rohianon/awesome-african-tech](https://github.com/Rohianon/awesome-african-tech) | 1 | 2026-02-22 | 0 | African tech ecosystems; 1 star, untouched since 2026-02 |
| [rosepac/biblioteca-espanol-gratis](https://github.com/rosepac/biblioteca-espanol-gratis) | 513 | 2026-03-16 | 0 | Spanish free courses and books; no outside merge since 2021 |
| [ruvasqm/awesome-vzla](https://github.com/ruvasqm/awesome-vzla) | 8 | 2026-10-21 | 0 | resources for Venezuelan developers; owner-only, 8 stars |
| [sahaba-ai/awesome-arabic-speakers](https://github.com/sahaba-ai/awesome-arabic-speakers) | 117 | 2026-09-25 | 0 | contributions by Arabic speakers only; last outside merge 2025-10 |
| [saubakirov/KZ-IT-telegram-list](https://github.com/saubakirov/KZ-IT-telegram-list) | 146 | 2026-08-29 | 0 | Kazakhstan IT Telegram groups and channels, not tools |
| [sepehr071/awesome-iran-mcp](https://github.com/sepehr071/awesome-iran-mcp) | 138 | 2026-10-21 | 1 | MCP servers for the Iranian web only |
| [skillim-hub/awesome-israel-ai-skills](https://github.com/skillim-hub/awesome-israel-ai-skills) | 0 | 2026-06-14 | 0 | skills and MCP servers for life in Israel; 0 stars |
| [TakoTechie1/georgian-tech-resources](https://github.com/TakoTechie1/georgian-tech-resources) | 7 | 2026-06-22 | 0 | Georgian-language AI/tech guide; 7 stars, owner-only |
| [tardigradsoftware-design/yzdatabase](https://github.com/tardigradsoftware-design/yzdatabase) | 1 | 2026-10-20 | 0 | database of open-source agent tools; 1 star, owner-only |
| [tauseeffayyaz/sefism-library](https://github.com/tauseeffayyaz/sefism-library) | 26 | 2026-10-13 | 0 | Pakistani dev career and learning resources; owner-only |
| [the-penguins-club/Awesome-Cybersecurity-Bangladesh](https://github.com/the-penguins-club/Awesome-Cybersecurity-Bangladesh) | 6 | 2026-08-30 | 0 | cybersecurity in Bangladesh (local); 6 stars |
| [tornikebolokadze1-cyber/awesome-ai-pulse-georgia](https://github.com/tornikebolokadze1-cyber/awesome-ai-pulse-georgia) | 152 | 2026-10-21 | 0 | Georgian-language list of global AI dev tools (152 stars) with an MCP section, but outside PRs sit open for months (18 waiting); owner curates alone |
| [usman2x/awesome-pakistani](https://github.com/usman2x/awesome-pakistani) | 84 | 2026-10-12 | 0 | Pakistani developers and orgs only; no outside merge since 2022 |
| [vladimir-uhrin/vibecoding-sk](https://github.com/vladimir-uhrin/vibecoding-sk) | 0 | 2026-09-06 | 0 | Slovak list of AI coding tools: right topic, but 0 stars and no PRs yet |
| [webstyle/made-in-uzbekistan](https://github.com/webstyle/made-in-uzbekistan) | 25 | 2026-09-17 | 0 | projects made in Uzbekistan only |
| [wysocki-lu/awesome-ai-marketing-pl](https://github.com/wysocki-lu/awesome-ai-marketing-pl) | 0 | 2026-07-03 | 0 | Polish AI tools for marketers; 0 stars, no PRs |
