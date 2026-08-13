import type {
  ExperienceDefinition,
  ExperienceParameterDefinition
} from "../types/experience";

const PLACEHOLDER_PATTERN = /{{\s*([a-zA-Z0-9_-]+)\s*}}/g;

export function getInitialParameterValues(
  parameterDefinitions: ExperienceParameterDefinition[] | undefined
): Record<string, string> {
  if (!parameterDefinitions) {
    return {};
  }

  return parameterDefinitions.reduce<Record<string, string>>((parameterValues, parameter) => {
    parameterValues[parameter.id] = parameter.defaultValue;
    return parameterValues;
  }, {});
}

export function mergeWithParameterDefaults(
  parameterDefinitions: ExperienceParameterDefinition[] | undefined,
  parameterValues: Record<string, string>
): Record<string, string> {
  const mergedValues = getInitialParameterValues(parameterDefinitions);

  return {
    ...mergedValues,
    ...parameterValues
  };
}

function interpolateText(
  value: string,
  parameterValues: Record<string, string>
): { content: string; missingKeys: string[] } {
  const missingKeys = new Set<string>();

  const content = value.replace(PLACEHOLDER_PATTERN, (fullMatch, parameterId: string) => {
    const parameterValue = parameterValues[parameterId];

    if (parameterValue === undefined) {
      missingKeys.add(parameterId);
      return fullMatch;
    }

    return parameterValue;
  });

  return {
    content,
    missingKeys: [...missingKeys]
  };
}

export function getInterpolatedExperience(
  experience: ExperienceDefinition,
  parameterValues: Record<string, string>
): { experience: ExperienceDefinition; missingKeys: string[] } {
  const missingKeys = new Set<string>();

  const interpolateAndTrack = (value: string): string => {
    const result = interpolateText(value, parameterValues);
    result.missingKeys.forEach((missingKey) => missingKeys.add(missingKey));
    return result.content;
  };

  return {
    experience: {
      ...experience,
      prompt: {
        title: interpolateAndTrack(experience.prompt.title),
        paragraphs: experience.prompt.paragraphs.map(interpolateAndTrack),
        checklist: experience.prompt.checklist.map(interpolateAndTrack),
        executeLabel: interpolateAndTrack(experience.prompt.executeLabel)
      },
      events: experience.events.map((event) => {
        if (event.type === "status") {
          return {
            ...event,
            content: interpolateAndTrack(event.content)
          };
        }

        if (event.type === "message") {
          return {
            ...event,
            content: interpolateAndTrack(event.content)
          };
        }

        if (event.type === "table") {
          return {
            ...event,
            content: {
              title: interpolateAndTrack(event.content.title),
              columns: event.content.columns.map(interpolateAndTrack),
              rows: event.content.rows.map((row) => row.map(interpolateAndTrack))
            }
          };
        }

        if (event.type === "link") {
          return {
            ...event,
            content: {
              ...event.content,
              label: interpolateAndTrack(event.content.label),
              description: event.content.description
                ? interpolateAndTrack(event.content.description)
                : undefined
            }
          };
        }

        return event;
      }),
      resources: experience.resources.map((resource) => ({
        ...resource,
        fileName: interpolateAndTrack(resource.fileName),
        description: interpolateAndTrack(resource.description)
      }))
    },
    missingKeys: [...missingKeys]
  };
}
