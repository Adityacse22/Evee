
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const usersData = [
  {
    id: "u-123",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "user",
    status: "active",
    registeredDate: "2025-01-15",
    bookings: 24,
  },
  {
    id: "u-124",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    role: "user",
    status: "active",
    registeredDate: "2025-02-03",
    bookings: 18,
  },
  {
    id: "u-125",
    name: "Michael Brown",
    email: "michael.b@example.com",
    role: "station_owner",
    status: "active",
    registeredDate: "2024-11-22",
    bookings: 5,
  },
  {
    id: "u-126",
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    role: "admin",
    status: "active",
    registeredDate: "2024-08-14",
    bookings: 12,
  },
  {
    id: "u-127",
    name: "David Clark",
    email: "david.c@example.com",
    role: "user",
    status: "suspended",
    registeredDate: "2025-03-05",
    bookings: 3,
  },
  {
    id: "u-128",
    name: "Alex Turner",
    email: "alex.t@example.com",
    role: "station_owner",
    status: "active",
    registeredDate: "2024-12-20",
    bookings: 0,
  },
];

export function SuperAdminUsers() {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const toggleUserStatus = (id: string) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          const newStatus = user.status === "active" ? "suspended" : "active";
          return { ...user, status: newStatus };
        }
        return user;
      })
    );
    
    const user = users.find((u) => u.id === id);
    const newStatus = user?.status === "active" ? "suspended" : "active";
    
    toast({
      title: "User status updated",
      description: `${user?.name}'s account has been ${newStatus}.`
    });
  };

  const changeUserRole = (id: string, newRole: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
    
    const user = users.find((u) => u.id === id);
    
    toast({
      title: "User role updated",
      description: `${user?.name}'s role changed to ${newRole}.`
    });
  };

  const deleteUser = (id: string) => {
    const user = users.find((u) => u.id === id);
    setUsers(users.filter((user) => user.id !== id));
    
    toast({
      title: "User deleted",
      description: `${user?.name}'s account has been deleted.`
    });
  };

  const filteredUsers = users.filter(
    user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Admin</Badge>;
      case "station_owner":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Station Owner</Badge>;
      case "user":
        return <Badge variant="outline">User</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <Input 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={user.status === "active"}
                      onCheckedChange={() => toggleUserStatus(user.id)}
                    />
                    <span>
                      {user.status === "active" ? (
                        <span className="text-green-600 dark:text-green-400">Active</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">Suspended</span>
                      )}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{user.registeredDate}</TableCell>
                <TableCell>{user.bookings}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changeUserRole(user.id, user.role === "user" ? "admin" : "user")}
                    >
                      {user.role === "user" ? "Make Admin" : "Make User"}
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
