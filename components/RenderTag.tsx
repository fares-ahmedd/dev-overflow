import { Badge } from "@/components/ui/badge";
import MyLink from "./MyLink";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <MyLink href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase w-full justify-center">
        {name}
      </Badge>
      {showCount ? (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      ) : null}
    </MyLink>
  );
};

export default RenderTag;
