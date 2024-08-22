"use client"
import {useState , useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter , useSearchParams } from 'next/navigation'
import Profile from '@components/Profile'
const guestProfile = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get("id");
    const username = searchParams.get("username");
    const {data : session} = useSession();
    const [Posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchPrompts = async () => {
          const response = await fetch(`/api/users/${userId}/posts`, {
            method: "GET",
          });
          const data = await response.json();
          setPosts(data);
        };
        if(userId) fetchPrompts();
      });
    
      const getUser = ()=>{
        
      }
    

  return (
    <Profile
    name = {username}
    desc = {`welcome to ${username} profile`}
    data = {Posts}
    handleEdit = {()=>{}}
    handleDelete = {()=>{}}
    />
  )
}
