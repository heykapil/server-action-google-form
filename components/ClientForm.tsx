"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { useRef } from "react";
import { sendtoGoogle } from "@/lib/action";
import { useState } from "react";
import { FormSubmitButton } from "./FormSubmitButton";
import { useRouter } from "next/navigation";
import { FormSchema } from "@/lib/Schema";
import { format } from "date-fns/format";
import { clsx } from "clsx";
type FormInput = z.infer<typeof FormSchema>;

function getDisplayTime() {
  return format(new Date(), "MMM dd yyyy, hh:mm:ss b");
}

export default function ClientForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [currentDate, setCurrentDate] = useState("");
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<FormInput>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(FormSchema),
    // defaultValues: {
    //   name: ".",
    //   email: "",
    // },
  });
  useFormPersist("comment-form", {
    watch,
    setValue,
    // exclude: [""],
  });
  return (
    <>
      <form
        id="comment-form"
        style={{ opacity: 1 }}
        className="w-full h-full container min-h-full max-w-3xl mx-auto mt-10 mb-8 space-y-1"
        ref={formRef}
        action={async (formData: FormData) => {
          await sendtoGoogle(formData);
          router.replace("/thank-you");
        }}
      >
        <div className="mb-4">
          <div className="space-y-6" style={{ zIndex: 1 }}>
            <div className="bg-accent p-2 rounded-lg">
              {/* @ts-ignore */}
              <div className="text-xl font-medium mb-2">
                1. Personal Details
              </div>
              <div className="space-y-2 mb-2">
                <div className="flex flex-row space-x-2 ">
                  <div className="text-sm w-1/4">
                    <select
                      {...register("title")}
                      className={clsx(
                        "bg-background",
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        errors?.title?.message
                          ? "text-red-500 border p-[0.65rem] rounded-lg"
                          : "text-green-500 border p-[0.65rem] rounded-lg"
                      )}
                      required
                    >
                      <option value="" id="title">
                        Title
                      </option>
                      <option value="Mr." id="title-0">
                        Mr.
                      </option>
                      <option value="Mrs." id="title-1">
                        Mrs.
                      </option>
                      <option value="Miss" id="title-2">
                        Miss
                      </option>
                      <option value="Ms." id="title-3">
                        Ms.
                      </option>
                      <option value="Mx." id="title-4">
                        Mx.
                      </option>
                      <option value="Dr." id="title-5">
                        Dr.
                      </option>
                      <option value="Hon." id="title-6">
                        Hon.
                      </option>
                      <option id="title-7" value=" ">
                        None
                      </option>
                    </select>
                  </div>
                  <input
                    className="hidden w-0 h-0"
                    type="text"
                    id="RegDate"
                    name="RegDate"
                    value={currentDate}
                    onChange={(e) => e.target.value}
                    hidden
                  />
                  <input
                    placeholder="First name"
                    aria-label="First name"
                    // disabled={pending}
                    {...register("firstname")}
                    minLength={2}
                    className={clsx(
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      errors?.firstname?.message
                        ? "text-red-500"
                        : "text-green-500"
                    )}
                    aria-invalid={Boolean(errors.firstname)}
                    required
                  />

                  <input
                    placeholder="Last name"
                    // disabled={pending}
                    {...register("lastname")}
                    className={clsx(
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      errors?.lastname?.message
                        ? "text-red-500"
                        : "text-green-500"
                    )}
                    minLength={2}
                    aria-invalid={Boolean(errors.lastname)}
                    required
                  />
                </div>
                <div className="flex flex-row items-center space-x-2">
                  <input
                    placeholder="Enter your email"
                    aria-label="Enter your email"
                    // disabled={pending}
                    type="email"
                    className={clsx(
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      errors?.email?.message
                        ? "text-red-500 w-full md:max-w-[60%] lg-max-w-[55%]"
                        : "text-green-500 w-full md:max-w-[60%] lg:max-w-[55%]"
                    )}
                    aria-invalid={Boolean(errors.email)}
                    required
                    {...register("email")}
                  />
                  {/* @ts-ignore */}
                  <input
                    placeholder="Phone number"
                    minLength={10}
                    {...register("phone")}
                    className={clsx(
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      errors?.phone?.message
                        ? "text-red-500 w-full md:max-w-[37%] lg:max-w-[43.75%]"
                        : "text-green-500 w-full md: max-w-[37%] lg:max-w-[43.75%]"
                    )}
                    aria-invalid={Boolean(errors.phone)}
                  />
                </div>
                <textarea
                  {...register("message")}
                  placeholder="Full message"
                  className={clsx(
                    "flex h-100 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    errors?.message?.message ? "text-red-500" : "text-green-500"
                  )}
                  minLength={4}
                  required
                  aria-invalid={Boolean(errors.message)}
                />
              </div>
              {errors?.firstname?.message && (
                <p className="text-red-500 text-sm">
                  {errors.firstname.message}
                </p>
              )}
              {errors?.lastname?.message && (
                <p className="text-red-500 text-sm">
                  {errors.lastname.message}
                </p>
              )}
              {errors?.email?.message && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              {errors?.phone?.message && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
              {errors?.message?.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                id="terms"
                required
              />
              <label
                htmlFor="terms"
                className="text-sm font-mediumleading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {" "}
                I have filled the data according to best of my knowledge and I
                agree to all the terms and conditions.
              </label>
            </div>
          </div>
        </div>
        <FormSubmitButton
          className="flex h-fit w-fit rounded-md bg-purple-600 text-white disabled:opacity-50 disabled:bg-red-500 px-2 py-1 disabled:btn-error disabled:cursor-not-allowed	 cursor-pointer"
          pendingState={
            <p className="flex items-center gap-1">
              Submitting <span className="loading loading-dots"></span>
            </p>
          }
          disabled={isDirty && !isValid}
          type="submit"
          onClick={() => setCurrentDate(getDisplayTime())}
        >
          <p className="">Submit</p>
        </FormSubmitButton>
      </form>
    </>
  );
}
