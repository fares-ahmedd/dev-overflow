import { getUserInfo } from "@/actions/user.action";
import AnswerTab from "@/components/AnswerTab";
import MyLink from "@/components/MyLink";
import ProfileLink from "@/components/ProfileLink";
import QuestionTab from "@/components/QuestionTab";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getJoinedDate } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | undefined };
};
async function ProfilePage({ params, searchParams }: Props) {
  const { userId: clerkId } = await auth();
  const userInfo = await getUserInfo({ userId: params.id });
  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row mb-4">
        <div className="flex flex-col items-start gap-4 lg:flex-row ">
          <Image
            src={userInfo?.user.picture ?? "/assets/images/logo.png"}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover  aspect-square"
          />

          <div className="mt-3 space-y-2">
            <h2 className="h2-bold text-dark100_light900">
              {userInfo?.user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              @{userInfo?.user.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo?.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  title={"Portfolio"}
                  href={userInfo?.user.portfolioWebsite}
                />
              )}{" "}
              {userInfo?.user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={userInfo?.user.location}
                />
              )}
              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(userInfo?.user.joinedAt ?? new Date())}
              />
            </div>

            {userInfo?.user.bio && (
              <p className="paragraph-regular text-dark400_light800">
                {userInfo?.user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo?.user.clerkId && (
              <Button
                asChild
                className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4"
              >
                <MyLink href={`/profile/edit`}>Edit Profile</MyLink>
              </Button>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats
        totalQuestions={userInfo?.totalQuestions}
        totalAnswers={userInfo?.totalAnswers}
      />

      <div className="my-5 ">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList>
            <TabsTrigger value="top-posts">Top Posts</TabsTrigger>
            <TabsTrigger value="answers">Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionTab
              searchParams={searchParams}
              userId={userInfo?.user._id ?? ""}
              clerkId={userInfo?.user.clerkId ?? ""}
            />
          </TabsContent>
          <TabsContent value="answers">
            <AnswerTab
              searchParams={searchParams}
              userId={userInfo?.user._id ?? ""}
              clerkId={userInfo?.user.clerkId ?? ""}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default ProfilePage;
