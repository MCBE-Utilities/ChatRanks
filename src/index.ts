import { Client, Player } from 'beapi-core'

const client = new Client({
  commandsDisabled: true,
})

let cancelMessages = true
let enabled = true
let chatColor = `§f`
let senderColor = `§7`
client.on('OnChat', (data) => {
  if (data.message.startsWith((client.commands as any)?.prefix ?? '-') || !enabled) return
  if (cancelMessages) data.cancel()
  const ranks = getRanks(data.sender)?.map((x) => `${x}§r`)
  console.log(ranks.length)
  if (ranks.length !== 0) {
    client.world.sendMessage(`${ranks.join(' ')}§r ${senderColor}${data.sender.getName()}:§r ${chatColor}${data.message}`)
  } else {
    client.world.sendMessage(`${senderColor}${data.sender.getName()}:§r ${chatColor}${data.message}`)
  }
})

function getRanks(player: Player): string[] | undefined {
  const tags = player.getTags()
  if (!tags) return undefined
  const filtered = tags.filter((x) => x.startsWith('rank:'))
  if (!filtered) return undefined
  const cleaned = filtered.map((x) => x.replace('rank:', ''))
  if (!cleaned) return console.error('[ChatRanks]: Failed to clean filtered tags.') as undefined

  return cleaned
}

function addRank(player: Player, rank: string): boolean {
  return player.addTag(`rank:${rank}`)
}

function removeRank(player: Player, rank: string): boolean {
  return player.removeTag(`rank:${rank}`)
}

export {
  cancelMessages,
  chatColor,
  senderColor,
  getRanks,
  addRank,
  removeRank,
}
