import { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Menu from "../components/Menu";
import PostItem from "../components/PostItem";
import SessionContext from "../contexts/SessionContext";
import apiPosts from "../services/apiPosts";
import apiUsers from "../services/apiUsers";
import defaultUserImage from "../assets/images/EEUy6MCU0AErfve.png";

export default function UserPage() {
  const { session } = useContext(SessionContext);
  const [userInfoRender, setUserInfoRender] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const username = params.username;
  useEffect(() => {
    if (!session) {
      navigate("/signin");
    } else {
      fetchPostList();
    }
  }, []);

  async function fetchPostList() {
    try {
      const { data } = await apiPosts.getUserPosts(username, session.token);
      setUserInfoRender(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  async function followUser() {
    if (session) {
      setLoading(true);
      try {
        const result = await apiUsers.followUser(session.token, username);
        setUserInfoRender({
          ...userInfoRender,
          is_following: result.data.is_following,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Você precisa estar logado para seguir outros usuários");
    }
  }

  return (
    <PageStyle>
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
                  src={userInfoRender.profile_image}
                  alt="profile"
                  onError={(e) => (e.target.src = defaultUserImage)}
                />
                <div>
                  <Desc>
                    <p>
                      {userInfoRender.name}
                      <span>@{userInfoRender.username}</span>
                    </p>
                    <span>{userInfoRender.bio}</span>
                  </Desc>
                  <ButtonWrapper>
                    {userInfoRender.username !== session.username && (
                      <button
                        onClick={followUser}
                        disabled={!session || loading}
                      >
                        {userInfoRender.is_following
                          ? "Deixar de seguir"
                          : "Seguir"}
                      </button>
                    )}
                    <FollowNotice>
                      {userInfoRender.is_follower && "este usuário segue você"}
                    </FollowNotice>
                  </ButtonWrapper>
                </div>
              </UserInfo>
            </div>
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
const Posts = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50%;
  margin-bottom: 50px;
`;

const FollowNotice = styled.span`
  align-self: center;
  font-size: 12px;
  font-weight: 300;
`;
