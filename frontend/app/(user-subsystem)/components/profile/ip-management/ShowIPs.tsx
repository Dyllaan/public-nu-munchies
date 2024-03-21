import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import useFetchData from '@/hooks/user-subsystem/useFetchData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingInPage from '../../reusable/LoadingInPage';
import { Button } from '@/components/ui/button';
import useModerator from '@/hooks/user-subsystem/use-moderator';
import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card";
import RemoveIP from './RemoveIP';
import useUserSubsystem from '@/hooks/user-subsystem/use-user-subsystem';

/**
 * 
 * Show all the countries from the affiliation table, allows for searching of countries by name
 * @author Louis Figes
 * @generated GitHub Copilot was used in the creation of this code.
 * 
 */

export default function ShowIPs()  {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const endpoint = `ip`;
    const { data, reloadData, loading } = useFetchData(endpoint);
    const { sendingRequest } = useModerator();
    const endOfData = (!loading && data.length === 0);
    const [filteredData, setFilteredData] = useState(data);
    const { removeIP, requestLoading } = useUserSubsystem();
    

    const handleRemoval = async(ip:any) => {
        await removeIP(ip);
        reloadData();
    }

    useEffect(() => {
        if (data) {
            const found = data.filter((ip:any) => {
                return ip.ip_address.toLowerCase().includes(search.toLowerCase());
            });
            setFilteredData(found);
        }
    }, [search, data]);

    if(requestLoading) {
        return <LoadingInPage />;
    }

    const handleSearchChange = (event:any) => {
        setSearch(event.target.value);
    };

    function renderItems(data:any) {
        return data.map((ip:any, index:any) => (
        <TableRow key={index}>
            <TableCell className="text-left">{ip.ip_address}</TableCell>
            <TableCell>
            {new Date(ip.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
                <RemoveIP ip={ip.ip_address} handleRemoval={handleRemoval}/>
            </TableCell>
        </TableRow>
        ));
    }
  
    return (
        <Card className="p-4 w-full lg:w-[45vw] mx-auto">
            <CardHeader className="flex flex-row gap-2">
                <div className="">
                    <p>Page</p>
                    <p>{page}</p>
                </div>
                <Button onClick={reloadData} variant="outline"> Refresh</Button>
                <Input placeholder="Search for an IP" onChange={handleSearchChange}></Input>
                </CardHeader>
                <CardContent>
                    {loading && 
                    <div className="items-center text-center">
                    <LoadingInPage message="Loading Your IP..." />
                    </div>}
                    {sendingRequest &&
                    <div className="items-center text-center">
                    <LoadingInPage message="Sending..." />
                    </div>}
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                            <TableHead className="">IP</TableHead>
                            <TableHead className="">Added</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {endOfData && <TableRow><TableCell colSpan={3} className="text-center">No IP Addresses Found!</TableCell></TableRow>}
                            {renderItems(filteredData)}
                        </TableBody>
                    </Table>
            </CardContent>
        </Card>
    );
}