import { styled } from "styled-components";
import { BsJoystick } from "react-icons/bs";

export default function Header() {
  return (
    <HeaderStyle>
      <LogoStyle>
        <BsJoystick />
        <h1>OgGaming</h1>
      </LogoStyle>
      <NavStyle>
        <div>
          <img src="https://cdn.discordapp.com/attachments/1103429536101695651/1111165947093459045/EEUy6MCU0AErfve.png" />
        </div>
        <div>
          <p>Nome</p>
          <p>@username123456789</p>
        </div>
      </NavStyle>
    </HeaderStyle>
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
  width: 100vw;
  * {
    background: #ffff;
  }
`;
const LogoStyle = styled.div`
  display: flex;
  gap: 5px;
  font-size: 22px;
`;
const NavStyle = styled.nav`
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
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p:nth-child(2) {
      font-size: 12px;
      font-weight: 400;
    }
  }
`;
