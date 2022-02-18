export const ellipsizeMid = (str: string, left: number, right: number) =>
  `${str.slice(0, left)}...${str.slice(-right)}`
