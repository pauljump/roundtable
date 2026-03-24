/** The three kinds of entities roundtable manages */
export type EntityKind = "persona" | "role" | "agent";

/** Loaded entity ready for the LLM */
export interface RoundtableEntity {
  kind: EntityKind;
  name: string;
  displayName: string;
  profile: string;
  context: string;
}

/** Options for a roundtable chat call */
export interface AskOptions {
  system: string;
  maxTokens?: number;
}
