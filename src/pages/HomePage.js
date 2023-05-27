import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import Menu from "../components/Menu";
import SessionContext from "../contexts/SessionContext";
import apiPosts from "../services/apiPosts";
import PostItem from "../components/PostItem";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import defaultUserImage from "../assets/images/EEUy6MCU0AErfve.png";

export default function HomePage() {
  const { session } = useContext(SessionContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ image: "", content: "" });
  const [userInfoRender, setUserInfoRender] = useState(null);

  useEffect(() => {
    if (!session) {
      navigate("/signin");
    } else {
      getPosts();
    }
  }, []);

  async function getPosts() {
    try {
      const { data } = await apiPosts.getSelfPosts(session.token);
      setUserInfoRender({
        bio: data.bio,
        followers: data.followers,
        following: data.following,
        posts: data.posts,
      });
    } catch (error) {
      if (error.response.status === 401) {
        alert(`${error.response.status}: Invalid credentials`);
      }
    }
  }

  async function makePostModal(e) {
    e?.stopPropagation();
    setShowModal(!showModal);
    if (showModal) {
      setForm({ image: "", content: "" });
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await apiPosts.createPost(form, session.token);
      const newPost = {
        id: data.id,
        created_at: data.created_at,
        likes: 0,
        user_liked: false,
        username: session.username,
        name: session.name,
        image: form.image,
        content: data.content,
        poster_profile_pic: session.image,
      };
      const newPostArr = [newPost, ...userInfoRender.posts];
      setUserInfoRender({
        ...userInfoRender,
        posts: newPostArr,
      });
      setLoading(false);
      makePostModal();
    } catch (error) {
      setLoading(false);
      if (error.response.status === 401) {
        alert(`${error.response.status}: Invalid credentials`);
      }
      if (error.response.status === 422) {
        alert(`${error.response.status}: ${error.response.data}`);
      }
    }
  }

  return (
    <PageStyle>
      {showModal && (
        <NewPostModal onMouseDown={makePostModal}>
          <div
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            Novo post
            <form onSubmit={handleSubmit}>
              <label>
                Foto:
                <input
                  placeholder="Imagem do seu post"
                  required
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
              <label>
                Descrição:
                <textarea
                  placeholder="Digite uma breve descrição do seu post"
                  required
                  type="text"
                  name="content"
                  maxLength={200}
                  value={form.content}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
              <button type="submit" disabled={loading}>
                Postar
              </button>
            </form>
            <CloseFormBtn onMouseDown={makePostModal}>X</CloseFormBtn>
          </div>
        </NewPostModal>
      )}
      <Menu />
      <Container>
        {!userInfoRender ? (
          <article>
            <TailSpin
              height="80"
              width="80"
              color="#678698"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </article>
        ) : (
          <>
            <div>
              <UserInfo>
                <img
                  src={session?.image}
                  alt="profile"
                  onError={(e) => (e.target.src = defaultUserImage)}
                />
                <div>
                  <Desc>
                    <p>
                      {session?.name}
                      <span>@{session?.username}</span>
                    </p>
                    <span>{userInfoRender?.bio}</span>
                  </Desc>
                  <ButtonWrapper>
                    <button onClick={() => navigate("/followers")}>
                      Ver seguidores ({userInfoRender.followers})
                    </button>
                    <button onClick={() => navigate("/following")}>
                      Ver quem eu sigo ({userInfoRender.following})
                    </button>
                  </ButtonWrapper>
                </div>
              </UserInfo>
            </div>
            <MakeNewPostBTN onClick={makePostModal}>
              Nova postagem
            </MakeNewPostBTN>
            <Posts>
              {userInfoRender.posts.map((p) => (
                <PostItem
                  key={p.id}
                  post={p}
                  userInfoRender={userInfoRender}
                  setUserInfoRender={setUserInfoRender}
                />
              ))}
            </Posts>
          </>
        )}
      </Container>
    </PageStyle>
  );
}

const PageStyle = styled.main`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  * {
    font-family: "Roboto", sans-serif;
  }
`;
const Container = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  > div {
    width: 70%;
    padding: 25px 15px;
    border: 1px solid lightGray;
    border-radius: 7px;
    * {
      background: #ffff;
    }
    background: #ffff;
  }
  article:nth-child(1) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  width: 80%;
  gap: 10px;
  height: 100px;
  > div {
    display: flex;
    flex-direction: column;
    gap: 7px;
    max-width: 100%;
  }
  img {
    object-fit: cover;
    border-radius: 50%;
    width: 100px;
    height: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  button {
    border: none;
    cursor: pointer;
    background: #a4b6c1;
    padding: 10px;
    border-radius: 9px;
  }
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  p {
    font-weight: 700;
    span {
      margin-left: 5px;
      font-weight: 300;
      font-size: 14px;
    }
  }
  > span {
    font-weight: 300;
    font-size: 14px;
    display: block;
    height: 50px;
    overflow-wrap: break-word;
  }
`;
const MakeNewPostBTN = styled.button`
  position: fixed;
  bottom: 25px;
  right: 45px;
  background: #a4b6c1;
  border: none;
  border-radius: 16px;
  padding: 10px 20px;
  cursor: pointer;
`;
const Posts = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50%;
`;

const NewPostModal = styled.div`
  position: fixed;
  height: 100%;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  top: 0;
  padding-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    background: #ffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    gap: 20px;
    padding: 30px;
    border-radius: 5px;
    position: relative;
  }
  form {
    font-size: 14px;
    width: 100%;
    background: none;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 35px 15px;
    gap: 35px;
    label {
      background: none;
      display: flex;
      flex-direction: column;
      gap: 7px;
      width: 100%;
      input,
      textarea {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid lightGray;
        background: #f7f6f5;
        &:focus {
          outline: none !important;
        }
        &:disabled {
          background: #ebe9e8;
        }
      }
      textarea {
        resize: none;
        height: 10vh;
      }
    }
    button {
      background: #a4b6c1;
      padding: 17px 31px;
      border: none;
      border-radius: 9px;
      cursor: pointer;
      &:disabled {
        background: #98a8b3;
      }
    }
  }
`;

const CloseFormBtn = styled.div`
  position: absolute;
  cursor: pointer;
  top: 20px;
  right: 20px;
  color: rgb(215, 0, 0);
  background: none;
`;
