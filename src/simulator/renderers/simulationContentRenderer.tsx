import type { EngineContentItem } from "../engine/experienceEngine";

type SimulationContentRendererProps = {
  item: EngineContentItem;
};

export function SimulationContentRenderer({ item }: SimulationContentRendererProps) {
  if (item.type === "message") {
    return <p className="simulation-message">{item.content}</p>;
  }

  if (item.type === "table") {
    return (
      <section className="simulation-table-card" aria-label={item.content.title}>
        <h3>{item.content.title}</h3>
        <div className="simulation-table-wrap">
          <table>
            <thead>
              <tr>
                {item.content.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item.content.rows.map((row, rowIndex) => (
                <tr key={`${item.id}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${item.id}-${rowIndex}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <section className="simulation-link-card">
      <a href={item.content.url} target="_blank" rel="noreferrer">
        {item.content.label}
      </a>
      {item.content.description ? <p>{item.content.description}</p> : null}
    </section>
  );
}
