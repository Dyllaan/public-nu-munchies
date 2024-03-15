import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { Input } from '@/components/ui/input';
import useFetchData from '@/hooks/user-subsystem/useFetchData';
import LoadingInPage from '../LoadingInPage';
import { PersonIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface SearchTableProps<T> {
    endpoint: string;
    renderRow: (item: T, index: number) => JSX.Element;
    columns: Array<string>;
    searchPlaceholder: string;
    initialSearch?: string;
    initialPage?: number;
    initialVerified?: boolean;
  }
  

export default function SearchTable<T>({ endpoint, renderRow, columns, searchPlaceholder, initialSearch = '', initialPage = 1, initialVerified = false }: SearchTableProps<T>) {
    const [search, setSearch] = useState(initialSearch);
    const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
    const [page, setPage] = useState(initialPage);
    const [verified, setVerified] = useState<boolean | null>(initialVerified);
    const [count, setCount] = useState(0);
const { data, setEndpoint, reloadData, loading } = useFetchData(endpoint);
const [showClearVerified, setShowClearVerified] = useState(initialVerified);

useEffect(() => {
    setCount(data.length);
}, [data]);

useEffect(() => {
    const timer = setTimeout(() => {
        setDebouncedSearch(search);
    }, 800);
    return () => clearTimeout(timer);
}, [search]);

useEffect(() => {
  let newEndpoint = `${endpoint}?page=${page}`;

  // Append the verified parameter based on its state (true, false, or omit if not present)
  if (verified !== null) {
    newEndpoint += `&verified=${verified}`;
  }

  if (debouncedSearch.trim() !== '') {
    newEndpoint += `&search=${debouncedSearch}`;
  }

  setEndpoint(newEndpoint);
  reloadData();
}, [page, debouncedSearch, verified]);

useEffect(() => {
  // Here, 'verified' can be true, false, or null.
  // Adjust logic accordingly if specific handling for 'null' is needed.
  setShowClearVerified(verified !== null);
}, [verified]);

const clearVerified = () => {
  setVerified(null); // Now allows for a third state where verified is not present
};

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };

  const handleVerifiedChange = (newPressedState: boolean) => {
    setVerified(newPressedState);
  };  

  return (
    <div className="m-2 w-fit">
      <div className="flex flex-row items-center gap-2">
          <Input placeholder={searchPlaceholder} value={search} onChange={handleSearchChange} />
        <Toggle 
  defaultPressed={verified || false} // Convert null to false
  onPressedChange={handleVerifiedChange} 
  disabled={loading}
>
  <PersonIcon />
  Verified
</Toggle>
        {showClearVerified && (
        <button onClick={clearVerified} className="p-2 border-2 rounded-md">
          Clear
        </button>
      )}
            </div>
      {loading && <LoadingInPage />}
      <Table className="w-fit">
        <TableCaption>Found {count} items.</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column:any, idx:any) => (
              <TableHead key={idx}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 && data.map(renderRow)}
        </TableBody>
      </Table>
    </div>
  );
}