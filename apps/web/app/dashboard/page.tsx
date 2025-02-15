import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutButton from "../components/LogoutButton";
import RandomNumberDisplay from "../components/RandomNumberTable";

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/api/auth/signin");
        return null;
    }

    const id = Number(session.user.id);
    const username = session.user.username;


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Welcome, {username || "User"}!
            </h1>
            <LogoutButton />
        </div>
    );
}
