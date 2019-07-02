export default class NoPlayerError extends Error {
  constructor(playerId: string) {
    super(`No player with id ${playerId}`);
    Error.captureStackTrace(this, NoPlayerError);
  }
}
