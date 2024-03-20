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
import RemoveBusiness from './RemoveBusiness';
import { Button } from '@/components/ui/button';
import useModerator from '@/hooks/user-subsystem/use-moderator';

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
  const [verified, setVerified] = useState<boolean | null>(false);
  const [showClearVerified, setShowClearVerified] = useState(false);
  const { sendingRequest } = useModerator();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    let newEndpoint = `${endpoint}?page=${page}`;
  
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
    setShowClearVerified(verified !== null);
  }, [verified]);

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
  const clearVerified = () => {
    setVerified(null);
  };
  
  const handleVerifiedChange = (newPressedState: boolean) => {
    setVerified(newPressedState);
  };  
  

  function renderItems(data:any) {
    return data.map((business:any, index:any) => (
      <TableRow key={index}>
        <TableCell>{business.business_name}</TableCell>
        <TableCell>{business.business_description}</TableCell>
        <TableCell>{business.business_email}</TableCell>
        <TableCell>{business.business_phone}</TableCell>
        <TableCell>{business.business_verification ? "Verified" : "Not Verified"}</TableCell>
        <TableCell>
          {new Date(business.created_at).toLocaleDateString()}
        </TableCell>
        <TableCell className="text-right">
          <RemoveBusiness business={business} reloadData={reloadData}  />
        </TableCell>
      </TableRow>
    ));
  }
  
  return (
    <div className="m-2 w-full">
      <div className="flex flex-row gap-2">
        <div className="">
          <p>Page</p>
          <p>{page}</p>
        </div>
        <Button onClick={reloadData} variant="outline"> Refresh</Button>
        <Button variant="outline" onClick={nextPage}>Next</Button>
        <Button variant="outline" onClick={backPage}>Back</Button>
        <Input placeholder="Search for a user" onChange={handleSearchChange}></Input>
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
        {loading && 
        <div className="items-center text-center">
          <LoadingInPage message="Loading Businesses..." />
        </div>}
        {sendingRequest &&
        <div className="items-center text-center">
          <LoadingInPage message="Sending..." />
        </div>}
            <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Verification</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {endOfData && <TableRow><TableCell colSpan={6} className="text-center">No Businesses Found!</TableCell></TableRow>}
        {data && data.length > 0 && renderItems(data)}
      </TableBody>
    </Table>
              </div>
    );
}