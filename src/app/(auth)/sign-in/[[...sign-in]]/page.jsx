import { SignIn } from "@clerk/nextjs";

export default function page() {
  return (
    <main>
      <div className="mt-8 sm:mt-10">
        <SignIn />
      </div>
    </main>
  );
}
