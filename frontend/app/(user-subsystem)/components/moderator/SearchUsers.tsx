import useModerator from '@/hooks/user-subsystem/use-moderator';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import useFetchData from '@/hooks/user-subsystem/useFetchData';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LoadingInPage from '../LoadingInPage';
/**
 * 
 * Show all the countries from the affiliation table, allows for searching of countries by name
 * @author Louis Figes
 * @generated GitHub Copilot was used in the creation of this code.
 * 
 */

export default function SearchUsers()  {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const endpoint = `moderator/users`;
  const { data, setEndpoint, reloadData, loading } = useFetchData(endpoint);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    let newEndpoint = `${endpoint}`;
    if (debouncedSearch) {
      setPage(1);
      newEndpoint += `?page=${page}`;
      newEndpoint += `&search=${debouncedSearch}`;
    } else {
      newEndpoint += `?page=${page}`;
    }
    setEndpoint(newEndpoint);
    reloadData();
  }, [endpoint, page, debouncedSearch]);

  const endOfData = (!loading && data.length === 0);

  function nextPage() {
    if(!endOfData) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  function backPage() {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

  const handleSearchChange = (event:any) => {
    setSearch(event.target.value);
  };

  function renderItems(data:any) {
    return data.map((user:any, index:any) => (
        <TableRow key={index}>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.first_name}</TableCell>
        <TableCell>{user.last_name}</TableCell>
        <TableCell className="text-right">{user.verified}</TableCell>
      </TableRow>
    ));
  }
    return (
        <div className="m-2">
            <Input placeholder="Search for a user" onChange={handleSearchChange}></Input>
            <Table className="w-fit">
            <TableCaption>Found users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Email</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead className="text-right">Verified</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && <LoadingInPage />}
        {data && data.length > 0 && renderItems(data)}
      </TableBody>
    </Table>
              </div>
    );
}