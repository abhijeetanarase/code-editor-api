
export type ResolverFn = (
 parent : any,
 args : any,
 info : any,
 context : any
) => Promise<any>;