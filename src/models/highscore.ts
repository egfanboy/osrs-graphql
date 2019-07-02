import mongoose, { Schema, mongo } from 'mongoose';

type skillType = Map<string, number>;

export interface HighscoreI extends mongoose.Document {
  overall: skillType;
  attack: skillType;
  strength: skillType;
  defence: skillType;
  ranged: skillType;
  magic: skillType;
  prayer: skillType;
  runecrafting: skillType;
  construction: skillType;
  hitpoints: skillType;
  agility: skillType;
  herblore: skillType;
  thieving: skillType;
  crafting: skillType;
  fletching: skillType;
  slayer: skillType;
  hunter: skillType;
  mining: skillType;
  smithing: skillType;
  fishing: skillType;
  cooking: skillType;
  firemaking: skillType;
  woodcutting: skillType;
  farming: skillType;
}

const skillSchema = {
  type: Map,
  of: mongoose.Schema.Types.Mixed,
};

export const ironmanTypeEnum = ['normal', 'ironman', 'ultimate', 'hardcore'];

const schema: Schema = new mongoose.Schema({
  type: {
    type: String,
    required: 'You must specify a type',
    enum: ironmanTypeEnum,
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'Must specify a player for a highscore record',
  },
  overall: skillSchema,
  attack: skillSchema,
  strength: skillSchema,
  defence: skillSchema,
  ranged: skillSchema,
  magic: skillSchema,
  prayer: skillSchema,
  runecrafting: skillSchema,
  construction: skillSchema,
  hitpoints: skillSchema,
  agility: skillSchema,
  herblore: skillSchema,
  thieving: skillSchema,
  crafting: skillSchema,
  fletching: skillSchema,
  slayer: skillSchema,
  hunter: skillSchema,
  mining: skillSchema,
  smithing: skillSchema,
  fishing: skillSchema,
  cooking: skillSchema,
  firemaking: skillSchema,
  woodcutting: skillSchema,
  farming: skillSchema,
});

const HighscoreModel = mongoose.model<HighscoreI>('Highscore', schema);

export default HighscoreModel;
