import type { Skin } from '../data'
import { SkinCard } from './SkinCard'

type SkinGridProps = {
  skins: Skin[]
  priorityCount?: number
}

export function SkinGrid({ skins, priorityCount = 0 }: SkinGridProps) {
  return (
    <div className="skin-grid-v2">
      {skins.map((skin, index) => <SkinCard key={skin.id} skin={skin} priority={index < priorityCount} />)}
    </div>
  )
}
