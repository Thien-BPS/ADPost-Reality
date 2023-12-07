import { DC } from "../../constants";
import wordShift from "../../word-shift";

function devImprovedEffects(riftName) {
  const improved = devVars.celestials.pelle.improveRiftEffect && devVars.celestials.pelle.riftsEffectArray.includes(riftName);
  if (improved !== (false || true)) return false;
  else return improved;
}

function devReducedReqs(riftName) {
  const reduction = devVars.celestials.pelle.reduceRiftMilestoneReqs && devVars.celestials.pelle.reduceRiftMilestoneArray.includes(riftName);
  if (reduction !== (false || true)) return false;
  else return reduction;
}

export const pelleRifts = {
  vacuum: {
    id: 1,
    key: "vacuum",
    name: ["Vacuum", "Hollow", "Void"],
    drainResource: "IP",
    baseEffect: x => `IP gain ${formatX(x, 2, 2)}`,
    additionalEffects: () => [PelleRifts.vacuum.milestones[2]],
    strike: () => PelleStrikes.infinity,
    percentage: totalFill => Math.log10(totalFill.plus(1).log10() * 10 + 1) ** 2.5 / 100,
    percentageToFill: percentage => Decimal.pow(10,
      Decimal.pow(10, (percentage * 100) ** (1 / 2.5)).div(10).minus(0.1)
    ).minus(1),
    effect: totalFill => {
      if (player.challenge.eternity.current !== 0) {
        const chall = EternityChallenge.current;
        const goal = chall.goalAtCompletions(chall.gainedCompletionStatus.totalCompletions);
        return totalFill.plus(1).pow(0.1).min(goal.pow(0.15));
      }
      return totalFill.plus(1).pow(
        devImprovedEffects(this.key) ? 0.55 : 0.33
      );
    },
    currency: () => Currency.infinityPoints,
    galaxyGeneratorThreshold: 1000,
    milestones: [
      {
        resource: "vacuum",
        requirement: () => {
          if (devReducedReqs(this.key)) return 0.01;
          return 0.04;
        },
        description: "You can equip a single basic Glyph with decreased level and rarity"
      },
      {
        resource: "vacuum",
        requirement: () => {
          if (devReducedReqs(this.key)) return 0.03;
          return 0.06;
        },
        description: () => `Uncap Replicanti and make its unlock and upgrades ${formatX(1e130)} cheaper`,
        effect: () => 1e130
      },
      {
        resource: "vacuum",
        requirement: () => {
          if (devReducedReqs(this.key)) return 0.18;
          return 0.4;
        },
        description: () => `${wordShift.wordCycle(PelleRifts.vacuum.name)} also affects EP gain`,
        effect: () => {
          if (devImprovedEffects(this.key)) return Decimal.pow10(PelleRifts.vacuum.totalFill.log10() / 308 + 1)
          else return Decimal.pow(4, PelleRifts.vacuum.totalFill.log10() / 2 / 308 + 3);
        },
        formatEffect: x => `EP gain ${formatX(x, 2, 2)}`
      },
    ],
    galaxyGeneratorText: "There is not enough space left for more, you must fill in the $value"
  },
  decay: {
    id: 2,
    key: "decay",
    name: ["Decay", "Collapse", "Disarray"],
    drainResource: "Replicanti",
    spendable: true,
    baseEffect: x => `Replicanti speed ${formatX(x, 2, 2)}`,
    additionalEffects: () => [PelleRifts.decay.milestones[0], PelleRifts.decay.milestones[2]],
    strike: () => PelleStrikes.powerGalaxies,
    // 0 - 1
    percentage: totalFill => totalFill.plus(1).log10() * 0.05 / 100,
    // 0 - 1
    percentageToFill: percentage => Decimal.pow(10, 20 * percentage * 100).minus(1),
    effect: totalFill => (PelleRifts.chaos.milestones[0].canBeApplied
      ? Decimal.sqrt(2000 + 1) : Decimal.sqrt(totalFill.plus(1).log10() + 1)),
    currency: () => Currency.replicanti,
    galaxyGeneratorThreshold: 1e7,
    milestones: [
      {
        resource: "decay",
        requirement: () => {
          if (devReducedReqs(this.key)) return 0.06;
          return 0.2;
        },
        description: "First rebuyable Pelle upgrade also affects 1st Infinity Dimension",
        effect: () => {
          const x = player.celestials.pelle.rebuyables.antimatterDimensionMult;
          if (devImprovedEffects(this.key)) return Decimal.pow(1e100, x * x)
          else return Decimal.pow(1e50, x - 9);
        },
        formatEffect: x => `1st Infinity Dimension ${formatX(x, 2, 2)}`
      },
      {
        resource: "decay",
        requirement: () => {
          if (devReducedReqs(this.key)) return 0.25;
          return 0.6;
        },
        description: () => `When Replicanti exceeds ${format(devImprovedEffects(this.key) ? Decimal.NUMBER_MAX_VALUE : DC.E1300)},
          all Galaxies are ${formatPercents(evImprovedEffects(this.key) ? 0.333 : 0.1)} more effective`,
        effect: () => {
          if (devImprovedEffects(this.key)) return Replicanti.amount.gt(Decimal.NUMBER_MAX_VALUE) ? 1.333 : 1
          else return Replicanti.amount.gt(DC.E1300) ? 1.1 : 1;
        }
      },
      {
        resource: "decay",
        requirement: () => {
          if (devReducedReqs(this.key)) return 0.7;
          return 1;
        },
        description: "Increase max Replicanti Galaxies based on total Rift milestones",
        effect: () => {
          const x = PelleRifts.totalMilestones();
          if (devImprovedEffects(this.key)) return Math.floor(x * x)
          else return x ** 2 - 2 * x;
        },
        formatEffect: x => `Max RG count +${formatInt(x)}`
      },
    ],
    galaxyGeneratorText: "There's not enough antimatter to form new Galaxies, you need to reverse the $value"
  },
  chaos: {
    id: 3,
    key: "chaos",
    name: ["Chaos", "Disorder", "Impurity"],
    drainResource: ["Decay", "Collapse", "Disarray"],
    baseEffect: x => `Time Dimensions ${formatX(x, 2, 2)}`,
    strike: () => PelleStrikes.eternity,
    percentage: totalFill => totalFill / 10,
    percentageToFill: percentage => 10 * percentage,
    effect: totalFill => {
      const fill = totalFill > 6.5
        ? (totalFill - 6.5) / 7 + 6.5
        : totalFill;
      if (devImprovedEffects(this.key)) return Decimal.pow(27, fill)
      else return Decimal.pow(6, Decimal.pow(6, Decimal.pow(6, fill / 10 + 0.1)).minus(6))
        .div(1e5)
        .plus(Decimal.pow(10, fill / 10 + 0.1));
    },
    currency: () => ({
      get value() {
        return PelleRifts.decay.percentage;
      },
      set value(val) {
        const spent = PelleRifts.decay.percentage - val;
        player.celestials.pelle.rifts.decay.percentageSpent += spent;
      }
    }),
    galaxyGeneratorThreshold: 1e9,
    milestones: [
      {
        resource: "chaos",
        requirement: () => {
          if (devReducedReqs(this.key)) return 0.03;
          return 0.09;
        },
        description: () => `${wordShift.wordCycle(PelleRifts.decay.name)} \
        effect is always maxed and milestones always active`
      },
      {
        resource: "chaos",
        requirement: () => {
          if (devReducedReqs(this.key)) return 0.08;
          return 0.15;
        },
        description: "Glyphs gain a new Pelle-specific effect",
      },
      {
        resource: "chaos",
        requirement: () => {
          if (devReducedReqs(this.key)) return 0.4;
          return 1;
        },
        description: () => `You gain ${formatPercents(0.01)} of your EP gained on Eternity per second`,
      },
    ],
    galaxyGeneratorText: "Your Galaxies are too fragmented, you must stabilize the $value"
  },
  recursion: {
    id: 4,
    key: "recursion",
    name: ["Recursion", "Dispersion", "Destruction"],
    drainResource: "EP",
    baseEffect: x => `EP formula: log(x)/${formatInt(308)} ➜ log(x)/${formatFloat(308 - x.toNumber(), 2)}`,
    additionalEffects: () => [PelleRifts.recursion.milestones[0], PelleRifts.recursion.milestones[1]],
    strike: () => PelleStrikes.ECs,
    percentage: totalFill => totalFill.plus(1).log10() ** 0.4 / 4000 ** 0.4,
    percentageToFill: percentage => Decimal.pow(10, percentage ** 2.5 * 4000).minus(1),
    effect: totalFill => new Decimal(58 * totalFill.plus(1).log10() ** 0.2 / 4000 ** 0.2),
    currency: () => Currency.eternityPoints,
    galaxyGeneratorThreshold: 1e10,
    milestones: [
      {
        resource: "recursion",
        requirement: 0.10,
        description: "Dimensional Boosts are more powerful based on EC completions",
        effect: () => {
          if (devImprovedEffects(this.key)) return Math.max(Math.pow(7, EternityChallenges.completions), 1)
          return Math.max(100 * EternityChallenges.completions ** 2, 1) *
          Math.max(1e4 ** (EternityChallenges.completions - 40), 1)
        },
        formatEffect: x => `Dimension Boost power ${formatX(x, 2, 2)}`
      },
      {
        resource: "recursion",
        requirement: 0.15,
        description: "Infinity Dimensions are stronger based on EC completions",
        effect: () => {
          if (devImprovedEffects(this.key)) return Decimal.pow(Decimal.NUMBER_MAX_VALUE, EternityChallenges.completions)
          return Decimal.pow("1e1500", ((EternityChallenges.completions - 25) / 20) ** 1.7).max(1)
        },
        formatEffect: x => `Infinity Dimensions ${formatX(x)}`
      },
      {
        resource: "recursion",
        requirement: 1,
        description: "Permanently unlock the Galaxy Generator",
      },
    ],
    galaxyGeneratorText: "Creating more Galaxies is unsustainable, you must focus the $value to allow more"
  },
  paradox: {
    id: 5,
    key: "paradox",
    name: ["Paradox", "Contradiction", "Fallacy"],
    drainResource: "Dilated Time",
    baseEffect: x => `All Dimensions ${formatPow(x, 2, 3)}`,
    additionalEffects: () => [PelleRifts.paradox.milestones[2]],
    strike: () => PelleStrikes.dilation,
    percentage: totalFill => totalFill.plus(1).log10() / 100,
    percentageToFill: percentage => Decimal.pow10(percentage * 100).minus(1),
    effect: totalFill => new Decimal(1 + totalFill.plus(1).log10() * 0.004),
    currency: () => Currency.dilatedTime,
    galaxyGeneratorThreshold: 1e5,
    milestones: [
      {
        resource: "paradox",
        requirement: () => {
          if (devReducedReqs(this.key)) return 0.08;
          return 0.15;
        },
        description: "Time Dimensions 5-8 are much cheaper, unlock more Dilation upgrades",
        // FIXME: Not a great solution
        onStateChange: () => {
          updateTimeDimensionCosts();
        }
      },
      {
        resource: "paradox",
        requirement: () => {
          if (devReducedReqs(this.key)) return 0.1;
          return 0.25;
        },
        description: () => `Dilated Time gain becomes Tachyon Particles ${formatPow(devImprovedEffects(this.key) ? 2.25 : 1.4, 1, 1)}`,
        effect: () => devImprovedEffects(this.key) ? 2.25 :1.4
      },
      {
        resource: "paradox",
        requirement: 0.5,
        description: "Dilation rebuyable purchase count improves Infinity Power conversion rate",
        effect: () => {
          if (devImprovedEffects(this.key)) return Math.max(1.25 ** Object.values(player.dilation.rebuyables).sum() + 1,1)
          return Math.min(1.1 ** (Object.values(player.dilation.rebuyables).sum() - 90), 712)
          },
        formatEffect: x => `Infinity Power Conversion ${formatX(x, 2, 2)}`
      },
    ],
    galaxyGeneratorText: "It should be possible to create more, but Pelle has restricted you. Disregard the $value"
  }
};
