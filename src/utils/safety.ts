import * as config from "config";

export function saftyCallStack(stackName: string, number: number) {
  if (config.get("server.maxCallStack") === number) {
    throw new Error(
      `[${stackName}]: Max call stack count ${config.get("maxCallStack")} over`
    );
  }
}
