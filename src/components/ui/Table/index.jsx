import React, { useState, useMemo, useCallback } from 'react';
import { useId } from "react";
import './table.scss';

const Table = ({ options, rowData = [], onRowClick, theme = 'light' }) => {
    // key - что сортируем, direction - как сортируем
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    // сортировка данных
    const sortedRows = useMemo(() => {
        if (!sortConfig || sortConfig.direction === null) return rowData;

        let sortableItems = [...rowData];
        sortableItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        return sortableItems;
    }, [rowData, sortConfig]);

    // вид сортировки
    const requestSort = useCallback((key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key) {
            direction = sortConfig.direction === 'ascending' ? 'descending' : sortConfig.direction === 'descending' ? null : 'ascending';
        }
        setSortConfig({ key, direction });
    }, [sortConfig]);

    if (!options) {
        return null;
    }

    return (
        <table className={`table-container theme-${theme}`}>
          <Table.Header options={options} onSort={requestSort} sortConfig={sortConfig} />
          <tbody>
            {sortedRows.map((row) => (
              <Table.Row key={useId()} row={row} options={options} onRowClick={onRowClick}/>
            ))}
          </tbody>
        </table>
    );
};

Table.Header = ({ options, onSort, sortConfig }) => (
  <thead>
    <tr>
      {options.map(option => (
        <th key={useId()} onClick={() => option.sortable && onSort(option.field)}>
          {option.name}
          {sortConfig && sortConfig.key === option.field ? (sortConfig.direction === 'ascending' ? ' ASC' : sortConfig.direction === 'descending' ? ' DESC' : '') : ''}
        </th>
      ))}
    </tr>
  </thead>
);

Table.Row = ({ row, options, onRowClick }) => (
  <tr onClick={() => onRowClick(row.id)}>
    {options.map(option => (
      <td key={useId()}>{row[option.field]}</td>
    ))}
  </tr>
);

export default Table;
