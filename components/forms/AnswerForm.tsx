"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { AnswerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import Image from "next/image";
import { createAnswer } from "@/actions/answer.action";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type Props = {
  question?: string;
  questionId: string;
  authorId: string;
};

function AnswerForm({ authorId, questionId, question }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const pathname = usePathname();
  const editorRef = useRef<any>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const handleCreateAnswers = async (data: z.infer<typeof AnswerSchema>) => {
    try {
      await createAnswer({
        content: data.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      toast.success("Answer created successfully");

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current;
        editor.setContent("");
      }
    } catch (error) {
      toast.error("Failed to create answer");
      console.error(error);
    }
  };

  const isSubmitting = form.formState.isSubmitting || isGenerating;

  const generateAiAnswer = async () => {
    if (!authorId) return;

    setIsGenerating(true);

    try {
      const res = await fetch(`/api/chatgpt`, {
        method: "POST",
        body: JSON.stringify({
          question,
        }),
      });

      const aiAnswer = await res.json();

      const formattedAiAnswer = aiAnswer.reply.replace(/\n/g, `<br />`);

      if (editorRef.current) {
        const editor = editorRef.current;
        editor.setContent(formattedAiAnswer);
      }

      toast.success("AI Answer generated successfully");
    } catch (error) {
      toast.error("Failed to generate AI answer");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 my-4">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>

        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none "
          onClick={generateAiAnswer}
          disabled={isSubmitting}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin size-6 sm:size-10 text-[#ff7000]" />
              Generating...
            </>
          ) : (
            <>
              <Image
                src={"/assets/icons/stars.svg"}
                alt="stars"
                width={12}
                height={12}
              />
              Generate an AI Answer
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswers)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(_evt, editor) => (editorRef.current = editor)}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
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
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: "oxide-dark",
                      content_css: "dark",
                    }}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end ">
            <Button
              className="primary-gradient w-fit text-light-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AnswerForm;
