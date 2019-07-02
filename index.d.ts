declare module 'osrs-wrapper' {
  type skills = {
    Skills: {
      [key: string]: {
        rank: number;
        level: number;
        xp: number;
      };
    };
  };

  //   type hiscore = {
  //     getPlayer: (username: string) => Promise<skills>;
  //   };
  interface osrs {
    hiscores: {
      getPlayer: (username: string) => Promise<skills>;
    };
  }

  const osrs: osrs;

  export = osrs;
}
