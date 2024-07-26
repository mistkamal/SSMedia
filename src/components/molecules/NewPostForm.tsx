import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, bucket, db } from "../../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function NewPostForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit } = useForm()

  async function onSubmit(values: any) {

    const file = values.image[0]
    const filename = values.image[0].name
    const postRef = ref(bucket, `posts/${filename}`);
    const storageRef = ref(bucket, `posts/${filename}`);

    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!' + snapshot);
    });

    const imageurl: string = await getDownloadURL(postRef)

    if(auth.currentUser)
    {
      await addDoc(collection(db,"posts"),{
        title:values.title,
        description:values.description,
        image:imageurl,
        name:auth.currentUser.email,
      })
    }

  }

  return (
    <>
      <Button className="top-4 left-4" onPress={onOpen} color="primary">Add Post</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Upload Post</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)} className="gap-4">
                  <Input
                    autoFocus
                    type="file"
                    label="Image"
                    placeholder="Upload Image!"
                    variant="bordered"
                    accept="image/*"
                    {...register("image")}
                  />
                  <Input
                    autoFocus
                    type="text"
                    label="Title"
                    placeholder="Enter Title"
                    variant="bordered"
                    {...register("title")}
                  />
                  <Input
                    autoFocus
                    type="text"
                    label="Description"
                    placeholder="Enter Description"
                    variant="bordered"
                    {...register("description")}
                  />
                  <Button type="submit" color="primary" onPress={onClose}>
                    Upload
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
