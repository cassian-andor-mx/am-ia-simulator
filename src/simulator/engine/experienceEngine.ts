import type { ExperienceEvent } from "../types/experience";

export type EngineExecutionState = "idle" | "running" | "completed";

export type EngineContentItem =
  | {
      id: number;
      type: "message";
      content: string;
    }
  | {
      id: number;
      type: "table";
      content: {
        title: string;
        columns: string[];
        rows: string[][];
      };
    }
  | {
      id: number;
      type: "link";
      content: {
        label: string;
        url: string;
        description?: string;
      };
    };

export type EngineSnapshot = {
  state: EngineExecutionState;
  statusMessage: string;
  contentItems: EngineContentItem[];
};

const INITIAL_SNAPSHOT: EngineSnapshot = {
  state: "idle",
  statusMessage: "",
  contentItems: []
};

const STREAM_STEP_MS = 22;

export class ExperienceEngine {
  private readonly events: ExperienceEvent[];
  private readonly onSnapshot: (snapshot: EngineSnapshot) => void;
  private timerIds: number[] = [];
  private snapshot: EngineSnapshot = INITIAL_SNAPSHOT;
  private runId = 0;
  private nextItemId = 0;

  constructor(events: ExperienceEvent[], onSnapshot: (snapshot: EngineSnapshot) => void) {
    this.events = events;
    this.onSnapshot = onSnapshot;
  }

  start(): void {
    this.runId += 1;
    const currentRunId = this.runId;

    this.clearScheduledEvents();

    this.updateSnapshot({
      state: "running",
      statusMessage: "",
      contentItems: []
    });
    this.nextItemId = 0;

    void this.runEvents(currentRunId);
  }

  reset(): void {
    this.runId += 1;
    this.clearScheduledEvents();
    this.updateSnapshot(INITIAL_SNAPSHOT);
  }

  dispose(): void {
    this.runId += 1;
    this.clearScheduledEvents();
  }

  private async runEvents(runId: number): Promise<void> {
    for (const event of this.events) {
      const canContinue = await this.wait(event.delayMs, runId);

      if (!canContinue) {
        return;
      }

      const eventHandled = await this.applyEvent(event, runId);

      if (!eventHandled) {
        return;
      }
    }
  }

  private async applyEvent(event: ExperienceEvent, runId: number): Promise<boolean> {
    if (event.type === "status") {
      this.updateSnapshot({
        ...this.snapshot,
        statusMessage: event.content
      });
      return true;
    }

    if (event.type === "message") {
      if (event.render === "instant") {
        const messageItem: EngineContentItem = {
          id: this.getNextItemId(),
          type: "message",
          content: event.content
        };

        this.updateSnapshot({
          ...this.snapshot,
          contentItems: [...this.snapshot.contentItems, messageItem]
        });
        return true;
      }

      return this.streamMessage(event.content, runId);
    }

    if (event.type === "table") {
      const tableItem: EngineContentItem = {
        id: this.getNextItemId(),
        type: "table",
        content: event.content
      };

      this.updateSnapshot({
        ...this.snapshot,
        contentItems: [...this.snapshot.contentItems, tableItem]
      });
      return true;
    }

    if (event.type === "link") {
      const linkItem: EngineContentItem = {
        id: this.getNextItemId(),
        type: "link",
        content: event.content
      };

      this.updateSnapshot({
        ...this.snapshot,
        contentItems: [...this.snapshot.contentItems, linkItem]
      });
      return true;
    }

    this.updateSnapshot({
      ...this.snapshot,
      state: "completed"
    });

    return true;
  }

  private async streamMessage(content: string, runId: number): Promise<boolean> {
    const messageId = this.getNextItemId();

    this.updateSnapshot({
      ...this.snapshot,
      contentItems: [
        ...this.snapshot.contentItems,
        {
          id: messageId,
          type: "message",
          content: ""
        }
      ]
    });

    for (let characterCount = 1; characterCount <= content.length; characterCount += 1) {
      const canContinue = await this.wait(STREAM_STEP_MS, runId);

      if (!canContinue) {
        return false;
      }

      const nextItems = this.snapshot.contentItems.map((item) => {
        if (item.type === "message" && item.id === messageId) {
          return {
            ...item,
            content: content.slice(0, characterCount)
          };
        }

        return item;
      });

      this.updateSnapshot({
        ...this.snapshot,
        contentItems: nextItems
      });
    }

    return true;
  }

  private clearScheduledEvents(): void {
    this.timerIds.forEach((timerId) => {
      window.clearTimeout(timerId);
    });
    this.timerIds = [];
  }

  private wait(delayMs: number, runId: number): Promise<boolean> {
    if (delayMs <= 0) {
      return Promise.resolve(runId === this.runId);
    }

    return new Promise<boolean>((resolve) => {
      const timeoutId = window.setTimeout(() => {
        this.timerIds = this.timerIds.filter((id) => id !== timeoutId);
        resolve(runId === this.runId);
      }, delayMs);

      this.timerIds.push(timeoutId);
    });
  }

  private updateSnapshot(nextSnapshot: EngineSnapshot): void {
    this.snapshot = nextSnapshot;
    this.onSnapshot(this.snapshot);
  }

  private getNextItemId(): number {
    const itemId = this.nextItemId;
    this.nextItemId += 1;
    return itemId;
  }
}
