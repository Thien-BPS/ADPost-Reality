// Javascript file only for color formatting and syntax.

const { default: Decimal } = require("break_infinity.js")

const MasteryStudies = [{
    id: "MS11",
    cost: new Decimal("1e500"),
    requirement: [304, PlayerProgress.metaDimensionsUnlocked()],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `The IP Upgrade multiplies by ${formatX(3.5, 2, 2)} instead of ${formatX(2)} if it's cost is beyond ${format(DC.E6E6)}`,
    effect: () => {
      return player.IPMultPurchases >= 3300000 ? 3.5 : 2
    },
    cap: () => undefined,
    formatEffect: () => undefined
  },
  {
    id: "MS21",
    cost: new Decimal("1e550"),
    requirement: ["MS11"],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `Remote Antimatter Galaxy cost scaling start ${formatInt(1)} later per ${formatInt(650)} dimension boosts`,
    effect: () => {
      return Math.floor(DimBoost.totalBoosts / 650)
    },
    cap: () => undefined,
    formatEffect: value => `+${formatInt(value)} galaxies later`
  },
  {
    id: "MS22",
    cost: new Decimal("1e550"),
    requirement: ["MS11"],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `Remote Replicanti Galaxy cost scaling start ${formatInt(1)} later per ${formatInt(32)} antimatter galaxies`,
    effect: () => {
      return Math.floor(player.galaxies / 32)
    },
    cap: () => undefined,
    formatEffect: value => `+${formatInt(value)} RG later`
  },
  {
    id: "MS23",
    cost: new Decimal("1e550"),
    requirement: ["MS11"],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `Distant Antimatter Galaxy cost scaling start ${formatInt(1)} later per ${formatInt(50)} total galaxies`,
    effect: () => {
      return Math.floor((player.galaxies + player.replicanti.galaxies + player.dilation.totalTachyonGalaxies) / 50)
    },
    cap: () => undefined,
    formatEffect: value => `+${formatInt(value)} galaxies later`
  },
  {
    id: "MS31",
    cost: new Decimal("1e610"),
    requirement: ["MS21"],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `Antimatter Galaxies are ${formatPercent(0.3)} stronger but only if you have more then ${format(15000, 3, 0)} galaxies`,
    effect: () => {
      return player.galaxies >= 15000 ? 1.3 : 1
    },
    cap: () => undefined,
    formatEffect: () => undefined
  },
  {
    id: "MS32",
    cost: new Decimal("1e610"),
    requirement: ["MS21"],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `Antimatter Galaxies are ${formatPercent(0.01)} stronger per ${format("1e100")} dilated time`,
    effect: () => {
      return Math.floor(Currency.dilatedTime.value.log10() / 100) / 100
    },
    cap: () => undefined,
    formatEffect: value => `+${formatPercent(value)} stronger`
  },
  {
    id: "MS33",
    cost: new Decimal("1e610"),
    requirement: ["MS22"],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `Tachyon Particle gain is stronger based on replicanti`,
    effect: () => {
      return Math.pow(Replicanti.amount.log10(), 4.5)
    },
    cap: () => undefined,
    formatEffect: value => `${formatX(value, 2, 0)} TP`
  },
  {
    id: "MS34",
    cost: new Decimal("1e610"),
    requirement: ["MS22"],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `Dilated time gain is now TP^1.4×TP^0.1`,
    effect: () => {
      return undefined
    },
    cap: () => undefined,
    formatEffect: () => undefined
  },
  {
    id: "MS35",
    cost: new Decimal("1e610"),
    requirement: ["MS23"],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `You can buy beyond 100% replicate chance with a boost`,
    effect: () => {
      return Math.pow(Math.log10(player.replicanti.chance), 0.2)
    },
    cap: () => undefined,
    formatEffect: value => formatPow(value, 3, 3)
  },
  {
    id: "MS36",
    cost: new Decimal("1e610"),
    requirement: ["MS23"],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `Replicanti slowdown is slower based on RG`,
    effect: () => {
      return Math.log10(player.replicanti.galaxies) / 1.4
    },
    cap: () => undefined,
    formatEffect: value => `/${format(value, 2, 3)}`
  },
  {
    id: "MS41",
    cost: new Decimal("1e850"),
    requirement: ["MS31", "MS32", "MS33", "MS34", "MS35", "MS36"],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `Unlock the quantum layer`,
    effect: () => {
      return undefined
    },
    cap: () => undefined,
    formatEffect: () => undefined
  },
  {
    id: "MS51",
    cost: new Decimal("1e870"),
    requirement: ["MS41", Currency.quarks.value.gte(100)],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `Replicanti further boosts infinity dimensions`,
    effect: () => {
      return Decimal.log2(Replicanti.amount).toDecimal().pow(Math.pow(Replicanti.amount.log10(), 0.8))
    },
    cap: () => undefined,
    formatEffect: value => formatX(value, 2, 0)
  },
  {
    id: "MS52",
    cost: new Decimal("1e890"),
    requirement: ["MS51"],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `Blue quarks are ${formatPercent(0.05)} per ${format("1e50000")} replicanti`,
    effect: () => {
      return (Decimal.log10(Replicanti.amount) / 50000) / 50
    },
    cap: () => undefined,
    formatEffect: value => formatPercent(value, 2, 0)
  },
  {
    id: "MS61",
    cost: new Decimal("1e900"),
    requirement: ["MS51"],
    reqType: TS_REQUIREMENT_TYPE.ALL,
    description: () => `You can buy below 1ms interval with increasing cost scaling`,
    effect: () => {
      return Math.log10(Decimal.log10(Replicanti.amount))
    },
    cap: () => undefined,
    formatEffect: value => `Base cost scaling ${formatPow(value, 3, 3)}`
  },
]