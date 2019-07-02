import mongoose, { Schema } from 'mongoose';
import { ironmanTypeEnum } from './highscore';
export type PlayerSettings = {
  isIronman: boolean;
};

export interface PlayerSettingsI extends mongoose.Document {
  isIronman: boolean;
  ironmanType: string;
  herbIgnoreList: Array<string>;
  time: Date;
  user: mongoose.Schema.Types.ObjectId;
}

const schema: Schema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  isIronman: { type: Boolean, default: 'false' },
  ironmanType: {
    type: String,
    default: 'normal',
    enum: ironmanTypeEnum.filter((typeEnum: string) => typeEnum !== 'ironman'),
  },
  herbIgnoreList: { type: [String], default: [] },
});

const PlayerModel = mongoose.model<PlayerSettingsI>('PlayerSettings', schema);

export default PlayerModel;
