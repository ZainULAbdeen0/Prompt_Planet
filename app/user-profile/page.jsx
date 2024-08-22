"use client";

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const GuestProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const username = searchParams.get("username");
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`, {
        method: "GET",
      });
      const data = await response.json();
      setPosts(data);
    };
    if (userId) fetchPrompts();
  }, [userId]);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s profile`}
      data={posts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  );
};

// Wrap in Suspense in the page file where it's used

export default function GuestProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GuestProfile />
    </Suspense>
  );
}
