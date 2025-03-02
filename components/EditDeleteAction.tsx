"use client";
import { deleteAnswer } from "@/actions/answer.action";
import { deleteQuestion } from "@/actions/question.action";
import useConfirm from "@/hooks/useConfirm";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";

type Props = {
  type: "Question" | "Answer";
  itemId: string;
};

function EditDeleteAction({ itemId, type }: Props) {
  const pathname = usePathname();
  const [ConfirmDialog, confirm] = useConfirm(
    type === "Question" ? "Delete Question" : "Delete Answer",
    type === "Question"
      ? "Are you sure you want to delete this question?"
      : "Are you sure you want to delete this answer?"
  );
  const handleEdit = () => {
    console.log("Edit", itemId);
  };
  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      if (type === "Question") {
        try {
          await deleteQuestion({
            questionId: JSON.parse(itemId),
            path: pathname,
          });
          toast.success("Question deleted successfully");
        } catch {
          toast.error("Failed to delete question");
        }
      }
      if (type === "Answer") {
        try {
          await deleteAnswer({
            answerId: JSON.parse(itemId),
            path: pathname,
          });
          toast.success("Answer deleted successfully");
        } catch {
          toast.error("Failed to delete answer");
        }
      }
    }
  };
  return (
    <div className="flex items-center justify-end gap-1 min-w-[80px]">
      <ConfirmDialog />
      {type === "Question" && (
        <Button
          onClick={handleEdit}
          variant={"ghost"}
          size="icon"
          title="Edit"
          aria-label="Edit"
        >
          <Image
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Button>
      )}

      <Button
        onClick={handleDelete}
        variant={"ghost"}
        size="icon"
        title="Delete"
        aria-label="Delete"
      >
        <Image
          src={"/assets/icons/trash.svg"}
          alt="edit"
          width={20}
          height={20}
        />
      </Button>
    </div>
  );
}

export default EditDeleteAction;
