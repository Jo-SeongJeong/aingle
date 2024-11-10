// usePostStore.ts
import { atom, selector, useRecoilState } from "recoil";
import { IPost } from "../model/post";
import { getPost } from "../api/postAPI";

// 게시글 배열의 초기 상태를 관리
export const postList = atom<IPost[]>({
  key: "postList",
  default: [],
});

// // 게시글 비동기 처리를 위한 selector 선언
// export const fetchPostSelector = selector<IPost[]>({
//   key: "fetchPostSelector",

//   get: async ({ get }) => {
//     // postAPI에 선언된 getPost 호출해서 데이터 가져오고
//     try {
//       const posts = await getPost();
//       return posts;
//     } catch (error) {
//       console.error("게시글 전체 조회 실패 : ", error);
//       return [];
//     }
//   },
// });
export const usePostStore = () => {
  const [posts, setPosts] = useRecoilState(postList);

  const fetchPosts = async (page: number, size: number) => {
    try {
      const fetchedPosts = await getPost(page, size);

      setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);

      return fetchedPosts; // 새로 가져온 데이터를 반환
    } catch (error) {
      console.error("게시글 조회 실패:", error);
      return [];
    }
  };

  return { posts, fetchPosts };
};
