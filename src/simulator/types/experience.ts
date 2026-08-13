export type PromptDefinition = {
  title: string;
  paragraphs: string[];
  checklist: string[];
  executeLabel: string;
};

export type ExperienceResource = {
  id: string;
  fileName: string;
  path: string;
  description: string;
};

export type MessageRenderMode = "instant" | "stream";

export type TableContent = {
  title: string;
  columns: string[];
  rows: string[][];
};

export type LinkContent = {
  label: string;
  url: string;
  description?: string;
};

export type ExperienceEvent =
  | {
      type: "status";
      delayMs: number;
      content: string;
    }
  | {
      type: "message";
      delayMs: number;
      content: string;
      render: MessageRenderMode;
    }
  | {
      type: "table";
      delayMs: number;
      content: TableContent;
    }
  | {
      type: "link";
      delayMs: number;
      content: LinkContent;
    }
  | {
      type: "complete";
      delayMs: number;
    };

export type ExperienceDefinition = {
  id: string;
  prompt: PromptDefinition;
  events: ExperienceEvent[];
  resources: ExperienceResource[];
};
