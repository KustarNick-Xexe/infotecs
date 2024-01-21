import { useId } from "react";
import './table.scss';

const Table = ({ options, rowData = [], theme = 'light' }) => {
    if(!options) {
        return null;
    }

    return (
        <table className={`table-container theme-${theme}`}>
          <Table.Header options={options} />
          <tbody>
            {rowData.map((row) => (
              <Table.Row key={useId()} row={row} options={options} />
            ))}
          </tbody>
        </table>
    );
  };

Table.Header = ({ options }) => (
  <thead>
    <tr>
      {options.map(option => (
        <th key={useId()}>{option.name}</th>
      ))}
    </tr>
  </thead>
);

Table.Row = ({ row, options }) => (
  <tr>
    {options.map(option => (
      <td key={useId()}>{row[option.field]}</td>
    ))}
  </tr>
);

export default Table;
