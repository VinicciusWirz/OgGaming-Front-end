import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Menu from "../components/Menu";
import UserListItem from "../components/UserListItem";
import SessionContext from "../contexts/SessionContext";
import apiUsers from "../services/apiUsers";

export default function FollowersPage() {
  const { session } = useContext(SessionContext);
  const navigate = useNavigate();
  const [userInfoRender, setUserInfoRender] = useState([]);
  useEffect(() => {
    if (!session) {
      navigate("/signin");
    } else {
      fetchFollowers();
    }
  }, []);

  async function fetchFollowers() {
    try {
      const { data } = await apiUsers.findFollowers(session.token);
      setUserInfoRender(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <PageStyle>
      <Menu />
      <Container>
        {/* <UserList> */}
        {userInfoRender.map((user) => (
          <UserListItem
            key={user.id}
            setUserInfoRender={setUserInfoRender}
            userInfoRender={userInfoRender}
            user={user}
          />
        ))}
        {/* </UserList> */}
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
`;
