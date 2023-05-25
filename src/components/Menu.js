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
      <Link to="/">Home</Link>
      <Link to="/search">Buscar</Link>
      <Link to="/followers">Seguidores</Link>
      <Link to="/following">Seguindo</Link>
      <Link to="/settings">Configurações</Link>
      <div onClick={logout}>Logout</div>
    </MenuStyle>
  );
}

const MenuStyle = styled.nav`
  background: red;
  display: flex;
  flex-direction: column;
`;
