import { mkdir, readFile, writeFile } from 'node:fs/promises'

const queries = [
  'codex skin in:name,description',
  'codex theme in:name,description',
  'codex desktop skin in:name,description',
  'codex dream skin in:name,description',
  'codedrobe theme in:name,description',
  'codex appearance theme in:name,description',
]

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'skindex-discovery-bot',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
}

const results = await Promise.all(queries.map(async (query) => {
  const url = new URL('https://api.github.com/search/repositories')
  url.searchParams.set('q', query)
  url.searchParams.set('sort', 'updated')
  url.searchParams.set('order', 'desc')
  url.searchParams.set('per_page', '100')
  const response = await fetch(url, { headers })
  if (!response.ok) throw new Error(`GitHub search failed: ${response.status}`)
  return (await response.json()).items
}))

const repositories = new Map()
for (const item of results.flat()) {
  if (item.fork || item.archived || item.full_name === 'TIANQIAN1238/codex-skin-gallery') continue
  const searchable = `${item.name} ${item.description ?? ''}`
  if (!/(codex.*(?:skin|theme)|(?:skin|theme).*codex)/i.test(searchable)) continue
  repositories.set(item.full_name, {
    name: item.full_name,
    url: item.html_url,
    description: item.description ?? '',
    stars: item.stargazers_count,
    language: item.language,
    license: item.license?.spdx_id ?? null,
    updatedAt: item.updated_at,
    defaultBranch: item.default_branch,
  })
}

const items = [...repositories.values()]
  .sort((a, b) => b.stars - a.stars || b.updatedAt.localeCompare(a.updatedAt))
  .slice(0, 300)

const outputUrl = new URL('../data/discovered-projects.json', import.meta.url)
let previousItems = []
try {
  previousItems = JSON.parse(await readFile(outputUrl, 'utf8')).items ?? []
} catch {
  previousItems = []
}

if (JSON.stringify(previousItems) === JSON.stringify(items)) {
  console.log(`Discovery queue is already current with ${items.length} repositories.`)
  process.exit(0)
}

await mkdir(new URL('../data/', import.meta.url), { recursive: true })
await writeFile(
  outputUrl,
  `${JSON.stringify({ generatedAt: new Date().toISOString(), count: items.length, items }, null, 2)}\n`,
)

console.log(`Discovered ${items.length} candidate repositories.`)
