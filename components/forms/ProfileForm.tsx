"use client";

import { UserType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { ProfileSchema } from "@/lib/validations";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/actions/user.action";
type Props = {
  user: string;
  clerkId: string;
};
function ProfileForm({ clerkId = "", user }: Props) {
  const parsedUser: UserType = JSON.parse(user);
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser?.name || "",
      username: parsedUser?.username || "",
      portfolioWebsite: parsedUser?.portfolioWebsite || "",
      location: parsedUser?.location || "",
      bio: parsedUser?.bio || "",
    },
  });

  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    try {
      await updateUser({
        clerkId,
        updateData: values,
        path: pathname,
      });

      toast.success("Profile updated successfully");
      router.back();
      window.scrollTo(0, 0);
    } catch {
      form.reset();
      toast.error("Failed to update profile");
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700  border"
                  placeholder="your name"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700  border"
                  placeholder="your username"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio Website</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  type="url"
                  placeholder="your portfolio link"
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700  border"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>location</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="where are your from ?"
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700  border"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  placeholder="your bio"
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700  border"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="primary-gradient w-fit !text-light-900 self-end"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
