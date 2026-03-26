import schema from './myCircleBlips.schema.json'

function withNumbers(items, image) {
  return items.map((item, index) => ({
    ...item,
    number: index + 1,
    image,
    description: item.description ?? item.summary ?? '',
  }))
}

export const circleSchema = schema

export const flames = withNumbers(schema.fire.attributes, 'Flame')
export const stones = withNumbers(schema.stones.items, 'Stone')
export const quadrants = schema.quadrants.map((quadrant) => ({
  ...quadrant,
  blips: withNumbers(
    quadrant.blips,
    quadrant.label.slice(0, -1).replace('Tool', 'Tool').replace('Song', 'Song'),
  ),
}))

export const tools = quadrants.find((quadrant) => quadrant.key === 'tools')?.blips ?? []
export const songs = quadrants.find((quadrant) => quadrant.key === 'songs')?.blips ?? []

export const listGroups = [
  {
    key: 'flames',
    label: schema.fire.label,
    definition: schema.definitions.flames,
    items: flames,
  },
  {
    key: 'songs',
    label: 'Songs',
    definition: schema.definitions.songs,
    items: songs,
  },
  {
    key: 'stones',
    label: 'Stones',
    definition: schema.definitions.stones,
    items: stones,
  },
  {
    key: 'tools',
    label: 'Tools',
    definition: schema.definitions.tools,
    items: tools,
  },
]
