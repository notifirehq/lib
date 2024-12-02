import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table';
import { Button } from '@/components/primitives/button';
import { RiDeleteBin2Line, RiUserLine, RiMoreFill } from 'react-icons/ri';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/primitives/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/primitives/avatar';
import { Skeleton } from '@/components/primitives/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/primitives/dropdown-menu';
import { RoleType } from './types';
import { PaginationControls } from './pagination-controls';
import { OrganizationMembershipResource } from '@clerk/types';

interface MembersTableProps {
  members: OrganizationMembershipResource[];
  roles: { key: string; label: string }[];
  currentUserId: string;
  onUpdateRole: (memberId: string, role: RoleType) => Promise<void>;
  onRemoveMember: (memberId: string) => Promise<void>;
  pagination: {
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
    isFetching?: boolean;
    fetchPrevious?: () => void;
    fetchNext?: () => void;
  };
}

const LoadingRow = () => (
  <TableRow>
    <TableCell>
      <div className="flex items-center gap-3">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="h-4 w-[140px]" />
      </div>
    </TableCell>
    <TableCell>
      <Skeleton className="h-9 w-[120px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[200px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-[100px]" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-8 w-8" />
    </TableCell>
  </TableRow>
);

export function MembersTable({
  members,
  roles,
  currentUserId,
  onUpdateRole,
  onRemoveMember,
  pagination,
}: MembersTableProps) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[300px]">User</TableHead>
            <TableHead className="w-[140px]">Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody
          isLoading={!members?.length && pagination.isFetching}
          loadingRows={3}
          loadingRowsContent={() => <LoadingRow />}
        >
          {members?.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-9 border">
                    <AvatarImage
                      src={member.publicUserData?.imageUrl}
                      alt={`${member.publicUserData?.firstName} ${member.publicUserData?.lastName}`}
                    />
                    <AvatarFallback className="bg-muted">
                      <RiUserLine className="size-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {member.publicUserData?.firstName} {member.publicUserData?.lastName}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Select
                  value={member.role}
                  onValueChange={(role: RoleType) => onUpdateRole(member.id, role)}
                  disabled={member.publicUserData?.userId === currentUserId}
                >
                  <SelectTrigger className="h-9 w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.key} value={role.key}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <span className="text-muted-foreground">{member.publicUserData?.identifier}</span>
              </TableCell>
              <TableCell>
                <span className="text-muted-foreground">{new Date(member.createdAt).toLocaleDateString()}</span>
              </TableCell>
              <TableCell>
                {member.publicUserData?.userId !== currentUserId && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <RiMoreFill className="text-muted-foreground size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onRemoveMember(member.publicUserData?.userId ?? '')}
                        className="text-destructive focus:text-destructive"
                      >
                        <RiDeleteBin2Line className="mr-2 size-4" />
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {members?.length > 0 && (
        <PaginationControls
          hasPreviousPage={pagination.hasPreviousPage}
          hasNextPage={pagination.hasNextPage}
          isFetching={pagination.isFetching}
          onPrevious={pagination.fetchPrevious}
          onNext={pagination.fetchNext}
        />
      )}
    </>
  );
}
