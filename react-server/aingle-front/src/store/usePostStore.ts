// usePostStore.ts
import { atom, selector, useRecoilState } from "recoil";
import { IPost } from "../model/post";
import { getPost } from "../api/postAPI";

// 게시글 배열의 초기 상태를 관리
export const postList = atom<IPost[]>({
  key: "postList",
  default: [],
});

export const usePostStore = () => {
  const [posts, setPosts] = useRecoilState(postList);

  const fetchPosts = async (page: number, size: number) => {
    try {
      const fetchedPosts = await getPost(page, size);

      if (page === 0) {
        setPosts(fetchedPosts); // 첫 페이지면 기존 데이터를 초기화
      } else {
        setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]); // 추가로 페이지를 가져올 때만 기존 데이터 유지
      }

      return fetchedPosts;
    } catch (error) {
      console.error("게시글 조회 실패:", error);
      return [];
    }
  };

  return { posts, fetchPosts };
};
