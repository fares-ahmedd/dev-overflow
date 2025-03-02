/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createQuestion, editQuestion } from "@/actions/question.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Badge } from "../ui/badge";
type Type = "create" | "edit";

type Props = {
  mongoUserId: string;
  type: Type;
  questionDetails?: string;
};

function QuestionForm({ mongoUserId, type, questionDetails }: Props) {
  const editorRef = useRef<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  const currentQuestion = JSON.parse(questionDetails || "");
  const defaultTags =
    currentQuestion?.tags?.map((tag: { name: string }) => tag.name) || [];

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: currentQuestion?.title || "",
      explanation: currentQuestion?.content || "",
      tags: defaultTags,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    if (type === "create") {
      try {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: JSON.parse(mongoUserId),
          path: pathname,
        });

        toast.success("Question posted successfully");
        router.push("/");
      } catch (error) {
        toast.error("Failed to post question");
        console.error(error);
      }
    }

    if (type === "edit") {
      try {
        await editQuestion({
          questionId: currentQuestion._id,
          title: values.title,
          content: values.explanation,
          path: pathname,
        });

        toast.success("Question edited successfully");
        router.push(`/question/${currentQuestion._id}`);
        window.scrollTo(0, 0);
      } catch (error) {
        toast.error("Failed to edit question");
        console.error(error);
      }
    }
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { name: string; value: string[] }
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      addTagToField(e.target as HTMLInputElement, field);
    }
  };

  const handleInputBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    field: { name: string; value: string[] }
  ) => {
    if (field.name === "tags") {
      addTagToField(e.target as HTMLInputElement, field);
    }
  };

  const addTagToField = (
    tagInput: HTMLInputElement,
    field: { name: string; value: string[] }
  ) => {
    const tagValue = tagInput.value.trim();

    if (tagValue !== "") {
      if (tagValue.length > 15) {
        return form.setError("tags", {
          type: "required",
          message: "Tag must be less than 15 characters",
        });
      }

      if (!field.value.includes(tagValue as never)) {
        form.setValue("tags", [...field.value, tagValue.toUpperCase()]);
        tagInput.value = "";
        form.clearErrors("tags");
      }
    } else {
      form.trigger();
    }
  };

  const handleRemoveTag = (tag: string, field: { value: string[] }) => {
    if (type === "edit") return;
    const newTags = field.value.filter((t: string) => t !== tag);

    form.setValue("tags", newTags);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700  border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you are asking a question to another
                person
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Explanation <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={currentQuestion?.content || ""}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | codesample | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist",
                    content_style: "body { font-family:Inter; font-size:16px }",
                    skin: "oxide-dark",
                    content_css: "dark",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Include all the information someone would need to answer your.
                Minimum 20 characters
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 border"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    onBlur={(e) => handleInputBlur(e, field)}
                    disabled={type === "edit"}
                  />

                  {field.value.length > 0 && (
                    <div className="flex-start my-4 gap-2.5 flex-wrap">
                      {field.value.map((tag: string) => (
                        <Badge
                          key={tag}
                          aria-label={`Remove tag ${tag}`}
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 uppercase"
                          role="button"
                          onClick={() => handleRemoveTag(tag, field)}
                        >
                          {tag}
                          <Image
                            src={"/assets/icons/close.svg"}
                            alt="close"
                            width={12}
                            height={12}
                            className="cursor-pointer object-contain invert-0 dark:invert"
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900 self-end"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Edit Question" : "Ask a Post"}</>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default QuestionForm;
