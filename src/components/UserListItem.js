import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import SessionContext from "../contexts/SessionContext";
import apiUsers from "../services/apiUsers";
import defaultUserImage from "../assets/images/EEUy6MCU0AErfve.png";
import { TailSpin } from "react-loader-spinner";

export default function UserListItem(props) {
  const { session } = useContext(SessionContext);
  const { userInfoRender, setUserInfoRender, user } = props;
  const [loading, setLoading] = useState(false);

  async function followUser(e) {
    e.stopPropagation();
    if (session) {
      setLoading(true);
      try {
        const newArray = [...userInfoRender].map((u) => {
          if (u.id === user.id) {
            return { ...u, is_following: !u.is_following };
          } else {
            return { ...u };
          }
        });
        setUserInfoRender(newArray);
        const result = await apiUsers.followUser(session.token, user.username);
        const updatedData = result.data;
        const updated = [...userInfoRender].map((u) => {
          if (u.id === user.id) {
            return { ...u, is_following: updatedData.is_following };
          } else {
            return { ...u };
          }
        });
        setUserInfoRender(updated);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      alert("Você precisa estar logado para seguir outros usuários");
    }
  }

  return (
    <>
      <div>
        <UserInfo>
          <Link to={`/${user.username}`}>
            <img
              src={user.profile_image}
              alt="profile"
              onError={(e) => (e.target.src = defaultUserImage)}
            />
          </Link>
          <div>
            <Desc>
              <Link to={`/${user.username}`}>
                <p>
                  {user.name}
                  <span>@{user.username}</span>
                </p>
                <span>{user.bio}</span>
              </Link>
            </Desc>
            <ButtonWrapper>
              {session.username !== user.username && (
                <>
                  <button onClick={followUser} disabled={!session || loading}>
                    {loading ? (
                      <>
                        <TailSpin
                          height="20"
                          width="40"
                          color="#fafafa"
                          ariaLabel="tail-spin-loading"
                          radius="1"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                        />
                      </>
                    ) : user.is_following ? (
                      "Deixar de seguir"
                    ) : (
                      "Seguir"
                    )}
                  </button>
                  <FollowNotice>
                    {user.is_follower && "este usuário segue você"}
                  </FollowNotice>
                </>
              )}
            </ButtonWrapper>
          </div>
        </UserInfo>
      </div>
    </>
  );
}

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
  img,
  > a {
    cursor: pointer;
    object-fit: cover;
    border-radius: 50%;
    width: 100px;
    height: 100%;
  }
`;

const Desc = styled.div`
  a {
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-decoration: none;
    p {
      cursor: pointer;
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
      height: 40px;
      overflow-wrap: break-word;
    }
  }
`;

const FollowNotice = styled.span`
  align-self: center;
  font-size: 12px;
  font-weight: 300;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  button {
    border: none;
    cursor: pointer;
    background: #a4b6c1 !important;
    padding: 10px;
    border-radius: 9px;
    div {
      width: 100%;
      background: transparent;
      svg {
        background: transparent;
      }
    }
  }
`;
