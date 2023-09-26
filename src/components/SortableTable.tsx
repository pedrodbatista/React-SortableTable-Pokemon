import { useCallback, useState, MouseEventHandler } from 'react';
import data from '../Pokemon.json';

type Data = typeof data;
type Sortkeys = keyof Data[0];
type SortOrder = 'asc' | 'desc';

function sortData({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: Data;
  sortKey: Sortkeys;
  reverse: boolean;
}) {
  if (!sortKey) return tableData;

  const sortedData = data.sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }
  return sortedData;
}

// function SortButton({
//   sortOrder,
//   columnKey,
//   sortKey,
//   onClick,
// }: {
function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  lastSortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: Sortkeys;
  sortKey: Sortkeys;
  lastSortKey: Sortkeys | null;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  const isSorted = sortKey === columnKey;
  const isAscending = sortOrder === 'asc';

  return (
    <div className={`sort-button-container ${isSorted ? 'active' : ''}`}>
      <button
        onClick={onClick}
        className={`sort-button ${
          isSorted && isAscending ? 'ascending' : isSorted ? 'descending' : ''
        }`}
      >
        {isSorted && isAscending ? '▲' : isSorted ? '▼' : '→'}
      </button>
    </div>
  );
}

function SortableTable({ data }: { data: Data }) {
  const [sortKey, setSortKey] = useState<Sortkeys>('#');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [lastSortKey, setLastSortKey] = useState<Sortkeys | null>(null);

  const headers: { key: Sortkeys; label: string }[] = [
    { key: '#', label: '#' },
    { key: 'Name', label: 'Name' },
    { key: 'Type 1', label: 'Type 1' },
    { key: 'Type 2', label: 'Type 2' },
    { key: 'Total', label: 'Total' },
    { key: 'HP', label: 'HP' },
    { key: 'Attack', label: 'Attack' },
    { key: 'Defense', label: 'Defense' },
    { key: 'Sp. Atk', label: 'Sp. Atk' },
    { key: 'Sp. Def', label: 'Sp. Def' },
    { key: 'Speed', label: 'Speed' },
    { key: 'Generation', label: 'Generation' },
    { key: 'Legendary', label: 'Legendary' },
  ];

  const sortedData = useCallback(
    () => sortData({ tableData: data, sortKey, reverse: sortOrder === 'desc' }),
    [data, sortKey, sortOrder]
  );

  function changeSort(key: Sortkeys) {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
    setLastSortKey(key);
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((row) => {
            return (
              <td key={row.key}>
                {' '}
                {row.label}{' '}
                <SortButton
                  // columnKey={row.key}
                  // onClick={() => changeSort(row.key)}
                  // sortOrder={sortOrder}
                  // sortKey={sortKey}
                  columnKey={row.key}
                  onClick={() => changeSort(row.key)}
                  sortOrder={sortOrder}
                  sortKey={sortKey}
                  lastSortKey={lastSortKey}
                />
              </td>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {sortedData().map((pokemon) => {
          return (
            <tr key={pokemon['#']}>
              <td> {pokemon['#']}</td>
              <td> {pokemon['Name']}</td>
              <td> {pokemon['Type 1']}</td>
              <td> {pokemon['Type 2']}</td>
              <td> {pokemon['Total']}</td>
              <td> {pokemon['HP']}</td>
              <td> {pokemon['Attack']}</td>
              <td> {pokemon['Defense']}</td>
              <td> {pokemon['Sp. Atk']}</td>
              <td> {pokemon['Sp. Def']}</td>
              <td> {pokemon['Speed']}</td>
              <td> {pokemon['Generation']}</td>
              <td> {pokemon['Legendary']}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default SortableTable;
