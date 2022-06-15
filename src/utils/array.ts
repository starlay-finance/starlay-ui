type Falsy = null | undefined | false | '' | 0 | -0 | 0n | typeof NaN

export const filterFalsy = <T>(arg: T | Falsy): arg is T => !!arg
