import mongoose, { Schema } from 'mongoose';
import { PlayerSettingsI } from './player-settings';
import { HighscoreI } from './highscore';

interface PlayerI extends mongoose.Document {
  username: string;
  settings: PlayerSettingsI;
  highscores: [HighscoreI];
}

const schema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Must define a username for a player',
  },
  highscores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Highscore',
    },
  ],
  settings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlayerSettings',
  },
});

function prepopulate(this: PlayerI, next: Function) {
  this.populate('settings').populate('highscores');

  next();
}

schema.pre('find', prepopulate);
schema.pre('findOne', prepopulate);
schema.pre('findOneAndUpdate', prepopulate);

const PlayerModel = mongoose.model<PlayerI>('Player', schema);

export default PlayerModel;
