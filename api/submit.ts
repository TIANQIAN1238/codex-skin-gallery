type ApiRequest = {
  method?: string
  body?: unknown
}

type ApiResponse = {
  setHeader(name: string, value: string): void
  status(code: number): ApiResponse
  json(value: unknown): void
}

const requiredFields = ['name', 'author', 'contact', 'previewUrl', 'installUrl', 'platform', 'description'] as const

const clean = (value: unknown, maxLength = 2000) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const body: Record<string, unknown> = typeof request.body === 'object' && request.body
    ? request.body as Record<string, unknown>
    : {}
  if (clean(body.website)) return response.status(200).json({ ok: true })

  const values = Object.fromEntries(requiredFields.map((field) => [field, clean(body[field])]))
  const missing = requiredFields.find((field) => !values[field])
  if (missing || clean(body.rightsConfirmed) !== 'yes') {
    return response.status(400).json({ error: 'Missing required fields' })
  }

  const runtime = globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }
  const token = runtime.process?.env?.GITHUB_SUBMISSION_TOKEN
  const repository = runtime.process?.env?.SUBMISSION_REPOSITORY
  if (!token || !repository || !repository.includes('/')) {
    return response.status(503).json({ error: 'Submission service is not configured' })
  }

  const issueBody = [
    '## 皮肤信息',
    `- 名称：${values.name}`,
    `- 作者：${values.author}`,
    `- 联系方式：${values.contact}`,
    `- 支持平台：${values.platform}`,
    `- 预览图：${values.previewUrl}`,
    `- 安装包或发布地址：${values.installUrl}`,
    '',
    '## 简介',
    values.description,
    '',
    '## 投稿确认',
    '- [x] 可以免费分享',
    '- [x] 投稿者确认有权提交相关图片和素材',
    '',
    `提交时间：${new Date().toISOString()}`,
  ].join('\n')

  const githubResponse = await fetch(`https://api.github.com/repos/${repository}/issues`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'skindex-submission-api',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      title: `[皮肤投稿] ${values.name}`,
      body: issueBody,
      labels: ['skin-submission'],
    }),
  })

  if (!githubResponse.ok) {
    return response.status(502).json({ error: 'Unable to create submission' })
  }

  return response.status(201).json({ ok: true })
}
