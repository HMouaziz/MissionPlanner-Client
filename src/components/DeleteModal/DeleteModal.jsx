import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";

export const DeleteModal = ({ id }) => {
  const handleDelete = () => {
    console.log(id)
  }

  return (
    <Dialog>
      <DialogTrigger onClick={event => event.stopPropagation()}>
        Delete</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            mission and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={handleDelete}>Confirm</Button>
          <Button variant='secondary' type="button"> Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
