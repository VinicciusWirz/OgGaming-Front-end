import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import SessionContext from "../contexts/SessionContext";

export default function Menu() {
  const { session, setSession } = useContext(SessionContext);
  const navivate = useNavigate();
  function logout() {
    const confirmQuestion = "Você tem certeza que quer deslogar?";
    if (window.confirm(confirmQuestion)) {
      localStorage.clear();
      setSession(null);
      navivate("/signin");
      return;
    }
  }
  return (
    <MenuStyle>
      <div>
        <Link to="/">Página inicial</Link>
        <Link to="/search">Buscar</Link>
        <Link to="/followers">Seguidores</Link>
        <Link to="/following">Seguindo</Link>
        <Link to="/settings">Configurações</Link>
        <div onClick={logout}>Logout</div>
      </div>
    </MenuStyle>
  );
}

const MenuStyle = styled.nav`
  display: flex;
  height: 90vh;
  position: sticky;
  padding: 30px;
  border-right: 1px solid lightGray;
  div:first-child {
    height: 50%;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
  }
  a {
    text-decoration: none;
  }
`;
