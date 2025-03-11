import { BadgeCounts } from "@/lib/types";
import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";

type Props = {
  totalQuestions: number | undefined;
  totalAnswers: number | undefined;
  badgeCounts: BadgeCounts | undefined;
  reputation: number | undefined;
};

function Stats({
  totalAnswers = 0,
  totalQuestions = 0,
  badgeCounts,
  reputation = 0,
}: Props) {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">Stats</h4>

      <h5 className="body-regular text-light-400 dark:text-light-500 ">
        reputation : {reputation}
      </h5>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="light-border background-light900_dark200 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900 text-center">
              {formatAndDivideNumber(totalQuestions)}
            </p>
            <p className="text-text-dark400_light700 text-center">Questions</p>
          </div>
        </div>{" "}
        <div className="light-border background-light900_dark200 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900 text-center">
              {formatAndDivideNumber(totalAnswers)}
            </p>
            <p className="text-text-dark400_light700 text-center">Answers</p>
          </div>
        </div>
        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={badgeCounts?.GOLD ?? 0}
          title="Gold Badges"
        />{" "}
        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={badgeCounts?.SILVER ?? 0}
          title="Silver Badges"
        />{" "}
        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={badgeCounts?.BRONZE ?? 0}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
}

export default Stats;

function StatsCard({
  imgUrl,
  title,
  value,
}: {
  imgUrl: string;
  value: number;
  title: string;
}) {
  return (
    <div className="light-border background-light900_dark200 flex flex-wrap items-center justify-start lg:justify-center gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt={title} width={40} height={50} />

      <div>
        <p className="paragraph-semibold text-dark200_light900 text-center">
          {value}
        </p>
        <p className="text-text-dark400_light700 text-center">{title}</p>
      </div>
    </div>
  );
}
