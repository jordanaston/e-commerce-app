import { trpc } from "@/utils/trpc";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: users, isLoading, error } = trpc.user.getAllUsers.useQuery();
  return (
    <div className="min-h-screen p-8 pb-20 gap-16">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {users &&
        users.map((user) => (
          <div key={user.id}>
            <h2>
              {user.name.firstname} {user.name.lastname}
            </h2>
            <p>{user.email}</p>
          </div>
        ))}
      <Button>Click me</Button>
    </div>
  );
}
