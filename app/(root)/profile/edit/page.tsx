import { getUserById } from "@/actions/user.action";
import ProfileForm from "@/components/forms/ProfileForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Edit Profile",
};

async function page() {
  const { userId } = await auth();

  if (!userId) return redirect("/sign-in");

  const user = await getUserById({ userId });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9">
        <ProfileForm clerkId={userId} user={JSON.stringify(user)} />
      </div>
    </>
  );
}

export default page;
