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
import LoadingInPage from '../reusable/LoadingInPage';
import { PersonIcon } from '@radix-ui/react-icons'
import BanUser from './BanUser';
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
  const endpoint = `moderator/users`;
  const { data, setEndpoint, reloadData, loading } = useFetchData(endpoint);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [showClearVerified, setShowClearVerified] = useState(false);
  const { sendingRequest } = useModerator();
  const [banned, setBanned] = useState<boolean | null>(null);
  const [showClearBanned, setShowClearBanned] = useState(false);

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
  
    // Append the verified parameter based on its state (true, false, or omit if not present)
    if (verified !== null) {
      newEndpoint += `&verified=${verified}`;
    }

    if (banned !== null) {
      newEndpoint += `&banned=${banned}`;
    }
  
    if (debouncedSearch.trim() !== '') {
      newEndpoint += `&search=${debouncedSearch}`;
    }
  
    setEndpoint(newEndpoint);
    reloadData();
  }, [page, debouncedSearch, verified, banned]);

  useEffect(() => {
    setShowClearVerified(verified !== null);
  }, [verified]);

  useEffect(() => {
    setShowClearBanned(banned !== null);
  }, [banned]);

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

  const clearBanned = () => {
    setBanned(null);
  };
  
  const handleBannedChange = (newPressedState: boolean) => {
    setBanned(newPressedState);
  };  
  

  function renderItems(data:any) {
    return data.map((user:any, index:any) => (
      <TableRow key={index}>
        <TableCell>{user.first_name}</TableCell>
        <TableCell>{user.last_name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.verified ? "Verified" : "Not Verified"}</TableCell>
        <TableCell>
          {new Date(user.created_at).toLocaleDateString()}
        </TableCell>
        <TableCell className="text-right"><BanUser user={user} reloadData={reloadData} isBanned={user.banned} /></TableCell>
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
        <div className="flex flex-row gap-2">
          <Toggle 
            defaultPressed={verified || false}
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
          <div className="flex flex-row gap-2">
              <Toggle 
                defaultPressed={verified || false}
                onPressedChange={handleBannedChange} 
                disabled={loading}
              >
              <PersonIcon />
                Banned
              </Toggle>
              {showClearBanned && (
                <button onClick={clearBanned} className="p-2 border-2 rounded-md">
                  Clear
                </button>
              )}
          </div>
        </div>
        {loading && 
        <div className="items-center text-center">
          <LoadingInPage message="Loading Users..." />
        </div>}
        {sendingRequest &&
        <div className="items-center text-center">
          <LoadingInPage message="Sending..." />
        </div>}
            <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="">First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Verification</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {endOfData && <TableRow><TableCell colSpan={6} className="text-center">No Users Found!</TableCell></TableRow>}
        {data && data.length > 0 && renderItems(data)}
      </TableBody>
    </Table>
              </div>
    );
}