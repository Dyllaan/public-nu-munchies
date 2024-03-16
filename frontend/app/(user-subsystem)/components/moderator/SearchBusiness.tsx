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
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import LoadingInPage from '../LoadingInPage';
import { PersonIcon } from '@radix-ui/react-icons'

/**
 * 
 * Show all the countries from the affiliation table, allows for searching of countries by name
 * @author Louis Figes
 * @generated GitHub Copilot was used in the creation of this code.
 * 
 */

export default function SearchBusiness()  {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const endpoint = `moderator/businesses`;
  const { data, setEndpoint, reloadData, loading } = useFetchData(endpoint);
  const [verified, setVerified] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(data.length);
  }, [data]);

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
      if (verified) {
        newEndpoint += `&verified=${verified}`;
      }
    } else {
      newEndpoint += `?page=${page}`;
    }
    setEndpoint(newEndpoint);
    reloadData();
  }, [endpoint, page, debouncedSearch, verified]);

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

  const handleVerifiedChange = (event:any) => {
    setVerified(event.target.checked);
  }

  function renderItems(data:any) {
    return data.map((business:any, index:any) => (
      <TableRow key={index}>
        <TableCell>{business.business_name}</TableCell>
        <TableCell>{business.business_description}</TableCell>
        <TableCell>{business.business_email}</TableCell>
        <TableCell>{business.business_phone}</TableCell>
        <TableCell>{business.business_verification ? "Verified" : "Not Verified"}</TableCell>
        <TableCell className="text-right">{business.created_at}</TableCell>
      </TableRow>
    ));
  }
  
  return (
    <div className="m-2 w-fit">
      <div className="flex flex-row">
        <Input placeholder="Search for a user" onChange={handleSearchChange}></Input>
        <Toggle onChange={handleSearchChange} aria-label="Toggle italic">
          <PersonIcon />
          Verified
        </Toggle>
        </div>
        {loading && 
        <div className="items-center text-center">
          <LoadingInPage />
        </div>}
            <Table className="w-fit">
            <TableCaption>Found {count} businesses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Verification</TableHead>
          <TableHead className="text-right">Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data.length > 0 && renderItems(data)}
      </TableBody>
    </Table>
              </div>
    );
}