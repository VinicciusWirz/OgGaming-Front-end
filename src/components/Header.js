import { styled } from "styled-components";
import { BsJoystick } from "react-icons/bs";
import SessionContext from "../contexts/SessionContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import defaultUserImage from "../assets/images/EEUy6MCU0AErfve.png";

export default function Header() {
  const { session } = useContext(SessionContext);
  const navigate = useNavigate();

  return (
    <>
      <HeaderStyle>
        <LogoStyle onClick={() => navigate("/")}>
          <BsJoystick />
          <h1>OgGaming</h1>
        </LogoStyle>
        {session && (
          <NavStyle>
            <div>
              <img
                src={session.image}
                alt="profile"
                onError={(e) => (e.target.src = defaultUserImage)}
              />
            </div>
            <div>
              <p>{session.name}</p>
              <p>@{session.username}</p>
            </div>
          </NavStyle>
        )}
      </HeaderStyle>
    </>
  );
}

const HeaderStyle = styled.header`
  font-family: "Roboto", sans-serif;
  background: #ffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  height: 65px;
  border: 1px solid lightGray;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  * {
    background: #ffff;
  }
`;
const LogoStyle = styled.div`
  display: flex;
  gap: 5px;
  font-size: 22px;
  cursor: pointer;
`;
const NavStyle = styled.section`
  display: flex;
  gap: 10px;
  width: 15%;
  max-width: 15%;
  div:nth-child(1) {
    display: flex;
    img {
      object-fit: cover;
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }
  div:nth-child(2) {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;
    }
    p:nth-child(2) {
      font-size: 12px;
      font-weight: 400;
    }
  }
`;
