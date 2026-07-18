import { skins, type Skin, type SkinCategory } from '../data'

export type CatalogFilters = {
  query?: string
  category?: SkinCategory | '全部'
  platform?: '全部平台' | 'macOS' | 'Windows'
  sort?: '推荐' | '最新' | '名称'
}

export const sourceCount = new Set(skins.map((skin) => skin.repository)).size

export const getSkin = (id: string | undefined) => skins.find((skin) => skin.id === id)

export const getFeaturedSkins = (limit = 8) => {
  const featured = skins.filter((skin) => skin.featured)
  return [...featured, ...skins.filter((skin) => !skin.featured)].slice(0, limit)
}

export const getRelatedSkins = (skin: Skin, limit = 4) => skins
  .filter((candidate) => candidate.id !== skin.id)
  .sort((a, b) => {
    const aScore = Number(a.category === skin.category) + Number(a.engine === skin.engine)
    const bScore = Number(b.category === skin.category) + Number(b.engine === skin.engine)
    return bScore - aScore
  })
  .slice(0, limit)

export const filterSkins = ({
  query = '',
  category = '全部',
  platform = '全部平台',
  sort = '推荐',
}: CatalogFilters) => {
  const normalizedQuery = query.trim().toLocaleLowerCase('zh-CN')
  const result = skins.filter((skin) => {
    const searchable = [skin.name, skin.englishName, skin.author, skin.engine, skin.category]
      .join(' ')
      .toLocaleLowerCase('zh-CN')
    return (!normalizedQuery || searchable.includes(normalizedQuery))
      && (category === '全部' || skin.category === category)
      && (platform === '全部平台' || skin.platforms.includes(platform))
  })

  if (sort === '名称') return result.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
  if (sort === '最新') return result.reverse()
  return result.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
}

export const collectionSummaries = ([
  ['动漫', '角色与次元世界', '#f0c9dd'],
  ['国风', '东方审美与传统想象', '#efc16f'],
  ['游戏', '熟悉的冒险与世界观', '#9dc7c2'],
  ['治愈', '安静、柔和、适合久看', '#c9d8a7'],
  ['科幻', '霓虹、宇宙与未来终端', '#a9a6d9'],
  ['极简', '少一点装饰，多一点专注', '#d6d3cc'],
] as Array<[SkinCategory, string, string]>).map(([category, description, color]) => ({
  category,
  description,
  color,
  count: skins.filter((skin) => skin.category === category).length,
  preview: skins.find((skin) => skin.category === category)?.image,
}))
