import { useContext, useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { TailSpin } from "react-loader-spinner";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Menu from "../components/Menu";
import UserListItem from "../components/UserListItem";
import SessionContext from "../contexts/SessionContext";
import apiUsers from "../services/apiUsers";

export default function SearchPage() {
  const { session } = useContext(SessionContext);
  const navigate = useNavigate();
  const [userInfoRender, setUserInfoRender] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "" });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nameSearch = searchParams.get("name");
  useEffect(() => {
    if (!session) {
      navigate("/signin");
    }
    if (nameSearch) {
      handleSearch();
    }
  }, [nameSearch]);

  async function handleSubmit() {
    navigate(`/search?name=${form.name}`);
  }

  async function handleSearch() {
    setLoading(true);
    try {
      const res = await apiUsers.findQuery(session.token, nameSearch);
      setUserInfoRender(res.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        alert(`${error.response.status}: Invalid credentials`);
      }
      setLoading(false);
      console.log(error);
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <PageStyle>
      <Menu />
      <Container>
        <ResearchArea>
          <input
            placeholder="Pesquise por um usuário (nome ou username)"
            onKeyUp={handleKeyPress}
            onChange={(e) => setForm({ name: e.target.value })}
            value={form.name}
          />
          <HiMagnifyingGlass size={22} onClick={handleSubmit} />
        </ResearchArea>
        {loading && (
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
        )}
        {userInfoRender.map((user) => (
          <UserListItem
            key={user.id}
            setUserInfoRender={setUserInfoRender}
            userInfoRender={userInfoRender}
            user={user}
          />
        ))}
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

const ResearchArea = styled.article`
  width: 70%;
  position: relative;
  input {
    width: 100%;
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
  svg {
    position: absolute;
    top: 50%;
    right: 0%;
    transform: translate(-50%, -50%);
    background: #f7f6f5;
    cursor: pointer;
  }
`;
