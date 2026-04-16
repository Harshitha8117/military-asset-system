// src/components/common/Table.jsx
export default function Table({ columns, data }) {
  return (
    <table className="w-full border mt-4">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} className="border p-2">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={col} className="border p-2">
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}