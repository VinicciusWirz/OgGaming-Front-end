import { useContext } from "react";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { BsGear, BsGearFill } from "react-icons/bs";
import { BiDoorOpen } from "react-icons/bi";
import {
  HiMagnifyingGlass,
  HiMagnifyingGlassPlus,
  HiOutlineUsers,
  HiUsers,
} from "react-icons/hi2";
import { RiUserStarFill, RiUserStarLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import SessionContext from "../contexts/SessionContext";

export default function Menu() {
  const { setSession } = useContext(SessionContext);
  const location = useLocation();
  const navigate = useNavigate();
  const paths = ["/", "/search", "/followers", "/following", "/settings"];
  const childIndex = paths.indexOf(location.pathname) + 1 || 100;

  function logout() {
    const confirmQuestion = "Você tem certeza que quer deslogar?";
    if (window.confirm(confirmQuestion)) {
      localStorage.clear();
      setSession(null);
      navigate("/signin");
      return;
    }
  }

  return (
    <MenuHold>
      <MenuStyle childindex={childIndex}>
        <div>
          <Link to="/">
            {location.pathname === "/" ? (
              <AiFillHome size={22} />
            ) : (
              <AiOutlineHome size={22} />
            )}
            Página inicial
          </Link>
          <Link to="/search">
            {location.pathname === "/search" ? (
              <HiMagnifyingGlassPlus size={22} />
            ) : (
              <HiMagnifyingGlass size={22} />
            )}
            Buscar
          </Link>
          <Link to="/followers">
            {location.pathname === "/followers" ? (
              <HiUsers size={22} />
            ) : (
              <HiOutlineUsers size={22} />
            )}
            Seguidores
          </Link>
          <Link to="/following">
            {location.pathname === "/following" ? (
              <RiUserStarFill size={22} />
            ) : (
              <RiUserStarLine size={22} />
            )}
            Seguindo
          </Link>
          <Link to="/settings">
            {location.pathname === "/settings" ? (
              <BsGearFill size={22} />
            ) : (
              <BsGear size={22} />
            )}
            Configurações
          </Link>
          <div onClick={logout}>
            <BiDoorOpen size={22} />
            Logout
          </div>
        </div>
      </MenuStyle>
    </MenuHold>
  );
}

const MenuHold = styled.div`
  height: calc(98vh - 65px - 30px);
  top: 95px;
  position: sticky;
`;

const MenuStyle = styled.nav`
  display: flex;
  height: 100%;
  padding: 30px;
  border-right: 1px solid lightGray;
  > div:first-child {
    > :nth-child(${(props) => props.childindex}) {
      border: 1px solid #abbec9;
    }
  }
  div:first-child {
    height: 50%;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
  }
  div > div:last-child,
  a {
    padding: 9px;
    border-radius: 8px;
    border: 1px solid transparent;
    text-decoration: none;
    display: flex;
    gap: 3px;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: #c1d1db;
      svg {
        background: #c1d1db;
      }
    }
  }
`;
