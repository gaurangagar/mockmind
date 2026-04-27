import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import GenerateInterviewPrompt from "../../../../utils/prompts/GenerateInterviewPrompt";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AddInterview() {
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const prompt = GenerateInterviewPrompt({
      jobRole,
      jobDescription,
      experience,
    });
    // const prompt = GenerateInterviewPrompt({
    //   jobRole: "Frontend Developer",
    //   jobDescription: "React, Next.js, Tailwind CSS, REST APIs",
    //   experience: "2",
    // }); // testing purpose

    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json(); // ✅ THIS IS THE KEY

      // console.log(data);
      // console.log(data.data);

      const apiResponse = await fetch("/api/interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobRole,
          jobDescription,
          experience,
          data: data.data,
        }),
      });
      const data1 = await apiResponse.json();
      //console.log(data1.mockId);
      const mockId=data1.mockId; 
      router.push(`interview/${mockId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setJobRole("");
      setJobDescription("");
      setExperience("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Interview</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Describe Your Interview</DialogTitle>
            <DialogDescription>
              Add job role, description, and experience to get started.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="job-role">Job Role / Position</Label>
              <Input
                id="job-role"
                name="jobRole"
                placeholder="Fullstack Developer"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="job-description">Job Description</Label>
              <Input
                id="job-description"
                name="jobDescription"
                placeholder="React, NodeJS, MongoDB etc."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="2"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Generate your Interview</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
