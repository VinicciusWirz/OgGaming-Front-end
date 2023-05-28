import dayjs from "dayjs";
import { useContext, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { styled } from "styled-components";
import SessionContext from "../contexts/SessionContext";
import apiPosts from "../services/apiPosts";
import defaultUserImage from "../assets/images/EEUy6MCU0AErfve.png";
import { BsTrash3 } from "react-icons/bs";
import errorLoadingImagePost from "../assets/images/error404.png";

export default function PostItem(props) {
  const { session } = useContext(SessionContext);
  const { post: p, setUserInfoRender, userInfoRender } = props;
  const [likePost, setLikePost] = useState(p.user_liked);
  const [likeCount, setLikeCount] = useState(p.likes);
  const [loading, setLoading] = useState(false);

  async function likePostReq() {
    const newStateLikePost = !likePost;
    const newCount = likePost ? Number(likeCount) - 1 : Number(likeCount) + 1;
    if (!loading && session) {
      try {
        setLikePost(newStateLikePost);
        setLikeCount(newCount);
        setLoading(true);
        const { data } = await apiPosts.likePost(session.token, p.id);
        setLikeCount(Number(data.like_count));
        setLikePost(data.user_liked);
        setLoading(false);
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          alert(`${error.response.status}: Invalid credentials`);
        }
        setLikePost(!newStateLikePost);
        setLikeCount(likeCount);
        setLoading(false);
      }
    }
  }

  async function deletePost() {
    if (!loading) {
      const confirmQuestion = "Você tem certeza que quer deletar este post?";
      if (window.confirm(confirmQuestion)) {
        setLoading(true);
        try {
          await apiPosts.deletePost(session.token, p.id);
          setLoading(false);
          const filterArray = [...userInfoRender.posts].filter(
            (e) => e.id !== p.id
          );
          setUserInfoRender({ ...userInfoRender, posts: filterArray });
        } catch (error) {
          setLoading(false);
          if (error.response.status === 401) {
            alert(`${error.response.status}: Invalid credentials`);
          }
        }
      }
    }
  }

  return (
    <PostItemStyle key={p.id}>
      <PostHeader>
        <div>
          <img
            src={p.poster_profile_pic}
            alt={`post-op`}
            onError={(e) => (e.target.src = defaultUserImage)}
          />
          {p.name} - <span>@{p.username}</span>
        </div>
        {p.username === session.username && <BsTrash3 onClick={deletePost} />}
      </PostHeader>
      <PostContent>
        <img
          src={p.image}
          alt={`post-${p.id}`}
          onDoubleClick={likePostReq}
          onError={(e) => (e.target.src = errorLoadingImagePost)}
        />
      </PostContent>
      <NavWrapper>
        <nav>
          {likePost ? (
            <AiFillHeart
              size={17}
              cursor="pointer"
              color="rgb(250,0,0)"
              onClick={likePostReq}
            />
          ) : (
            <AiOutlineHeart
              size={17}
              cursor="pointer"
              style={{ marginRight: "5px" }}
              onClick={likePostReq}
            />
          )}{" "}
          {likeCount > 0 && likeCount}{" "}
          {likeCount > 1
            ? "Pessoas gostaram deste post!"
            : likeCount === 1
            ? "Pessoa gostou deste post!"
            : "Ninguem gostou deste post ainda"}
        </nav>
        <div>{dayjs(p.created_at).format("DD/MM/YYYY [às] HH[h]mm")}</div>
      </NavWrapper>
      <PostDesc>
        <p>{p.content}</p>
      </PostDesc>
    </PostItemStyle>
  );
}

const PostItemStyle = styled.li`
  background: red;
  width: 100%;
  padding: 25px 15px;
  border: 1px solid lightGray;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  * {
    background: #ffff;
  }
  nav {
    svg > path {
      color: inherit;
    }
  }
  background: #ffff;
  > div {
    display: flex;
    align-items: center;
    gap: 5px;
    span {
      font-weight: 300;
      font-size: 12px;
    }
    img {
      object-fit: cover;
      height: 26px;
      width: 26px;
      border-radius: 50%;
    }
  }
  img {
    border-radius: 5px;
    object-fit: contain;
    width: 100%;
    height: 350px;
    border: 1px solid lightGray;
  }
`;

const PostDesc = styled.div`
  width: 100%;
  display: flex;
  p {
    max-width: 100%;
    word-wrap: break-word;
  }
`;

const NavWrapper = styled.div`
  nav {
    align-items: center;
    display: flex;
  }
  font-size: 14px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const PostContent = styled.article`
  border-radius: 5px;
  object-fit: contain;
  width: 100%;
  height: 500px;
  border: 1px solid lightGray;
  position: relative;
  img {
    border: none;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    background: none;
    transform: translate(-50%, -50%) scale(1);
    transition: scale 500ms;
  }
`;

const PostHeader = styled.div`
  justify-content: space-between;
  > div {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  svg:last-child {
    cursor: pointer;
  }
`;
