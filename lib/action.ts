"use server";
import { headers } from "next/headers";
export async function sendtoGoogle(formData: FormData) {
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
  const RegDate = formData.get("RegDate")?.toString() || "";
  const title = formData.get("title")?.toString() || "";
  const firstname = formData.get("firstname")?.toString() || "";
  const lastname = formData.get("lastname")?.toString() || "";
  const name = title + " " + firstname + " " + lastname;
  const email = formData.get("email")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";
  const message =
    formData.get("message")?.toString().replace(/\n|\r/g, " ") || ""; // replaces new line with a space
  let res = await fetch(`${protocal}://${host}/api/google-sheet-submit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      RegDate,
      name,
      email,
      phone,
      message,
    }),
  });
  const content = await res.json();
  console.log(content);
}
