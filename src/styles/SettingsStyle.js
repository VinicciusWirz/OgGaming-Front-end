import { styled } from "styled-components";

export const PageStyle = styled.main`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  * {
    font-family: "Roboto", sans-serif;
  }
`;

export const Container = styled.div`
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
    > div:first-child {
      display: flex;
      justify-content: center;
      padding-bottom: 20px;
      margin-bottom: 7px;
      border-bottom: 1px solid lightGray;
      font-weight: 700;
    }
  }
`;

export const InfoContainer = styled.div`
  display: flex;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  padding: 2%;
  gap: 15px;
  border-right: 1px solid lightGray;
  button {
    cursor: pointer;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 11px;
    div {
      display: flex;
      justify-content: center;
      gap: 11px;
    }
    button {
      border-radius: 50%;
      border: none;
      &:first-child {
        background: rgb(0, 230, 0);
      }
      &:last-child {
        background: rgba(250, 0, 0, 0.7);
      }
      background: #a4b6c1;
      width: 26px;
      height: 26px;
      position: relative;
      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: none;
      }
    }
  }
  input {
    padding: 3px;
    border-radius: 3px;
    border: 1px solid lightGray;
    background: #f7f6f5;
    width: 100%;
    &:focus {
      outline: none !important;
    }
  }
  div {
    font-size: 12px;
    cursor: pointer;
  }
  section {
    width: 100%;
    padding-bottom: 100%;
    position: relative;
    img {
      position: absolute;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  button {
    border-radius: 5px;
    border: none;
    background: #a4b6c1;
    padding: 5px 10px;
  }
`;

export const UserSettings = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2%;
  padding-bottom: 0%;
  gap: 10%;
  width: 70%;
  max-width: 70%;
  form {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 15px;
  }
`;

export const ItemForm = styled.div`
  display: flex;
  background: red;
  max-width: 100%;

  label {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    > div {
      width: 100%;
      display: flex;
    }
    div span,
    input,
    textarea {
      max-width: 100%;
      font-size: 14px;
      width: 100%;
      overflow-wrap: break-word;
      padding: 5px;
    }
    input,
    textarea {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid lightGray;
      background: #f7f6f5;
      &:focus {
        outline: none !important;
      }
    }
    textarea {
      resize: none;
      height: auto;
      overflow: hidden;
      &::-webkit-scrollbar {
        display: none;
      }
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
  }
`;

export const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5%;
  button {
    /* background: #a4b6c1; */
    padding: 10px 20px;
    border: none;
    border-radius: 7px;
    display: flex;
    gap: 3px;
    cursor: pointer;
    svg {
      background: none;
    }
    &:first-child {
      background: ${(props) => props.background1};
    }
    &:last-child {
      background: ${(props) => props.background2};
    }
  }
`;
