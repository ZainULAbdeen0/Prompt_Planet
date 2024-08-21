"use client"
import {useState , useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation'
import Profile from '@components/Profile'
const MyProfile = () => {
    const router = useRouter();
    const {data : session} = useSession();
    const [Posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPrompts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`, {
            method: "GET",
          });
          const data = await response.json();
          setPosts(data);
        };
        if(session?.user.id) fetchPrompts();
      });

    const handleEdit = (Post)=>{
      router.push(`/update-prompt?id=${Post._id}`)
    }
    const handleDelete = async (Post)=>{
        const ConfirmDelete = confirm("Are you sure you want to delete this prompt?");
        if(ConfirmDelete){
          await fetch(`/api/prompt/${Post._id}`,{
            method: 'DELETE',
          })
        }
        const filteredPosts = Posts.filter((p)=> p._id !== Post._id);
        setPosts(filteredPosts);
    }

  return (
    <Profile
    name = "My"
    desc = "Welcome to your personalized profile page"
    data = {Posts}
    handleEdit = {handleEdit}
    handleDelete = {handleDelete}
    />
  )
}

export default MyProfile;