declare namespace Express {
  // overwrite the Request interface, append a new type
  export interface Request {
    user: { id: string };
  }
}
