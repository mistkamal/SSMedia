import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input'
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalFooter } from '@nextui-org/modal';
import { useForm } from 'react-hook-form';
import {  bucket, db } from '../../lib/firebase';
import { collection, doc, setDoc, query, getDocs } from "firebase/firestore";
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';


const Account = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { register, handleSubmit } = useForm()
  
  let Name5 
  let Bio5
  let imgurl5
  //const docRef = doc(db, "MyAccountDetails", "user")

  const q = query(collection(db, "MyAccountDetails"));
  
  const GetAllAccount = async () => {
    try {
      const dataArray: any = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dataArray.push(doc.data());
      });
      const ads = dataArray[0]
    Name5 = ads.Name
    Bio5 = ads.Bio
    imgurl5 = ads.ProfilePic
    
      return dataArray;
    } catch (error) {
      console.error("Error fetching documents: ", error);
      throw error; // Re-throw the error to handle it elsewhere if needed
    }
  };

  // Example usage:
  GetAllAccount().then((dataArray) => {
    console.log("All account data:", dataArray);
    const ads = dataArray[0]
    Name5 = ads.Name
    Bio5 = ads.Bio
    imgurl5 = ads.ProfilePic

    console.log(ads, "xxx")
    console.log(Name5, "yyyy")
  }).catch((error) => {
    console.error("Error in GetAllAccount:", error);
  });

  const postRef = ref(bucket, 'posts/status1.png');
  async function onSubmit(values: any) {
    const file = values.image[0]

    await uploadBytes(postRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!' + snapshot);
    });

    let imageurl = ""
    await getDownloadURL(postRef).then((url) => { imageurl = url.toString() })
    console.log(imageurl, "sfsd")

    const docRef = await setDoc(doc(db, "MyAccountDetails", "user"), {
      Name: values.name,
      Bio: values.bio,
      ProfilePic: imageurl,
    });

    console.log(docRef)

  }

  return (
    <div>
      <h1>My Name Is: {Name5}</h1>
      <h1>My Bio : {Bio5}</h1>
      <img src={imgurl5} alt="Picture : " width="500" height="600" />

      <Button className="top-4 left-4" onPress={onOpen} color="primary">Update Profile</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Update Profile</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
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
                isRequired
                type="text"
                label="Name"
                defaultValue=""
                className="max-w-xs"
                {...register("name")}
              />
              <Input
                isRequired
                type="text"
                label="Bio"
                defaultValue=""
                className="max-w-xs"
                {...register("bio")}
              />

              <Button type='submit' color='secondary'>Update</Button>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Account