# Perplexity

**Status: ⏳ email sent, waiting for a reply.** Sent 2026-10-17 19:37 UTC from shyngys@blockhacks.io to `connectors@perplexity.ai`, subject "Connector proposal: NPMScan (npm supply-chain security, remote MCP)". Gmail thread `1a14b5d8f0686d9d`. Next: fill in the proposal form with the answers below.

**Proposal form answers:**

| Field | Answer |
|---|---|
| Company name and website | BlockHacks.io / NPMScan, https://npmscan.com |
| Product to connect | NPMScan MCP server, `https://npmscan.com/api/mcp` (streamable HTTP) |
| Connector description | Checks npm packages for malware, known vulnerabilities, typosquats, maintainer takeovers and risky install scripts; audits package.json, lockfiles, SBOMs and GitHub repos. 23 read-only tools, no OAuth or API key. |
| Customer problem | Users ask Perplexity whether a package is compromised, but web search lags behind fresh supply-chain incidents. NPMScan gives a live answer before anything is recommended or installed. |
| Docs links | https://npmscan.com/docs/mcp, https://npmscan.com/privacy, https://github.com/salemalem/npmscan-mcp-plugin |
| Contact | Shyngys Shynbolatov, shyngys@blockhacks.io |

**The official route** is the help article [Submit a Connector Proposal](https://www.perplexity.ai/help-center/en/articles/2026092501-submit-a-connector-proposal), published around 2026-09-25:
- **Proposal form:** [pplx.ai/connector-form-submission](https://pplx.ai/connector-form-submission), a Google Form that needs a Google sign-in. It's for "representatives of a company that would like to explore building a connector", one connector per proposal. It asks for:
  - company name and website
  - the product to connect
  - a short connector description
  - the customer problem or use case
  - links to API, developer or security docs
  - a partnership and technical contact
- **Email:** `connectors@perplexity.ai` (the "Plugins marketplace team"). They suggest emailing first with the company name, a short description and technical doc links.
- **After submitting:** the team contacts you only if it's a potential fit, and there's no guarantee. They judge customer value, technical feasibility, security requirements and product priorities. No timeline is published.
- `api@perplexity.ai` is a different channel: requests for the developer Agent API's small catalog (GitHub, Slack, Drive, Datadog, Linear, Notion). It's not the consumer connector directory.

**What others have experienced:**
- No firsthand reports of the proposal process were found.
- A [forum question](https://community.perplexity.ai/t/how-do-we-submit-our-mcp-server-so-it-shows-up-in-the-connectors-database-officially-not-as-a-custom-connector/6043) from 2026-09-08 asking how to get listed got no answer. The help article appeared about two weeks later.
- 2026 partner launches are established companies with announced partnerships, mostly finance, data and sales tools that Perplexity Computer users would use: [Quartr](https://quartr.com/newsroom/press-release/quartr-is-now-available-in-perplexity-via-mcp), [MT Newswires](https://www.mtnewswires.com/news/mt-newswires-mcp-server-now-available-in-perplexity-computer-bringing-real-time-global-market-news-to-ai-driven-workflows), [Octus](https://octus.com/company/news/octus-credit-intelligence-now-inside-perplexity/), [Apollo.io](https://www.prnewswire.com/news-releases/apolloio-brings-ai-powered-gtm-workflows-to-perplexity-computer-for-growing-businesses-302790469.html), [Similarweb](https://www.similarweb.com/blog/updates/announcements/similarweb-perplexity/) and Rings AI. There's no developer-security connector yet, which is both an opening and a risk: it may not be a product priority.

**Our pitch angle:**
- Perplexity users already ask "is this package compromised?", and web search lags behind fresh incidents.
- No OAuth and nothing to store, so the security review should be easy.
- Already in the Claude, ChatGPT and MCP Registry directories.

**Meanwhile:** users can already add npmscan as a [custom remote connector](https://www.perplexity.ai/help-center/en/articles/13915507-adding-custom-remote-connectors) with the URL `https://npmscan.com/api/mcp`.
