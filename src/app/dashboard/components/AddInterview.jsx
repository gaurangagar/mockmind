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

export default function AddInterview() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
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
              />
            </Field>

            <Field>
              <Label htmlFor="job-description">Job Description</Label>
              <Input
                id="job-description"
                name="jobDescription"
                placeholder="React, NodeJS, MongoDB etc."
              />
            </Field>

            <Field>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="2"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Generate your Interview</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
