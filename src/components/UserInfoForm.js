import { useContext, useState } from "react";
import { AiOutlineCheck, AiOutlineStop } from "react-icons/ai";
import { TailSpin } from "react-loader-spinner";
import SessionContext from "../contexts/SessionContext";
import apiUsers from "../services/apiUsers";
import { BtnWrapper, ItemForm } from "../styles/SettingsStyle";
import { dateDDMMYYYY } from "../utils/convertDate";

export default function UserInfoForm(props) {
  const { session, setSession } = useContext(SessionContext);
  const [loading, setLoading] = useState(false);
  const { form, handleChange, changeEditMode, textareaRef } = props;
  function handleTextareaChange(e) {
    adjustTextareaHeight();
    handleChange(e);
  }
  function adjustTextareaHeight() {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  async function submitUpdateInfo(e) {
    e.preventDefault();
    setLoading(true);
    const body = {
      name: form.name,
      username: form.username,
      bio: form.bio,
      birthday: form.birthday,
      email: form.email,
    };
    try {
      const res = await apiUsers.editUserInfo(session.token, body);
      console.log(res);
      body.birthday = dateDDMMYYYY(form.birthday);
      const updatedSession = {
        image: session.image,
        token: session.token,
        ...body,
      };
      console.log(updatedSession);
      setSession(updatedSession);
      localStorage.setItem("session", JSON.stringify(updatedSession));
      setLoading(false);
      changeEditMode();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={submitUpdateInfo}>
        <ItemForm>
          <label>
            Nome:
            <div>
              <input
                required
                placeholder="Seu nome de exibição"
                value={form.name}
                name="name"
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </label>
        </ItemForm>
        <ItemForm>
          <label>
            Userame:
            <div>
              <input
                required
                placeholder="Seu nome de usuário"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                maxLength={11}
                disabled={loading}
              />
            </div>
          </label>
        </ItemForm>
        <ItemForm>
          <label>
            Aniversário:
            <div>
              <input
                required
                placeholder="Seu aniversário"
                type="date"
                name="birthday"
                value={form.birthday ? form.birthday : ""}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </label>
        </ItemForm>
        <ItemForm>
          <label>
            Email:
            <div>
              <input
                required
                placeholder="Seu email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </label>
        </ItemForm>
        <ItemForm>
          <label>
            Bio:
            <div>
              <textarea
                ref={textareaRef}
                required
                placeholder="Seu nome de exibição"
                value={form.bio}
                type="text"
                name="bio"
                maxLength={200}
                onChange={handleTextareaChange}
                disabled={loading}
              />
            </div>
          </label>
        </ItemForm>
        <BtnWrapper
          background1="rgb(0, 230, 0)"
          background2="rgba(250, 0, 0, 0.7)"
        >
          {loading ? (
            <>
              <TailSpin
                height="28"
                width="28"
                color="#678698"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </>
          ) : (
            <>
              <button type="submit" disabled={loading}>
                Salvar <AiOutlineCheck />
              </button>
              <button type="reset" onClick={changeEditMode} disabled={loading}>
                Cancelar
                <AiOutlineStop />
              </button>
            </>
          )}
        </BtnWrapper>
      </form>
    </>
  );
}
