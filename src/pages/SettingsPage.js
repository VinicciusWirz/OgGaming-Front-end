import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineCheck, AiOutlineStop } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import SessionContext from "../contexts/SessionContext";
import defaultUserImage from "../assets/images/EEUy6MCU0AErfve.png";
import { TailSpin } from "react-loader-spinner";
import apiUsers from "../services/apiUsers";
import { dateYYYYMMDD } from "../utils/convertDate";
import UserInfoStatic from "../components/UserInfoStatic";
import {
  Container,
  ImageContainer,
  InfoContainer,
  PageStyle,
  UserSettings,
} from "../styles/SettingsStyle";
import UserInfoForm from "../components/UserInfoForm";

export default function SettingsPage() {
  const { session, setSession } = useContext(SessionContext);
  const textareaRef = useRef(null);
  const [editImage, setEditImage] = useState(false);
  const [imageReq, setImageReq] = useState(false);
  const [form, setForm] = useState({
    image: "",
    name: session.name,
    username: session.username,
    bio: session.bio,
    birthday: session.birthday ? dateYYYYMMDD(session.birthday) : null,
    email: session.email,
  });

  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [edit]);

  function changeEditMode() {
    if (!edit) {
      setEdit(true);
      adjustTextareaHeight();
    } else {
      setEdit(false);
      setForm({
        image: form.image,
        name: session.name,
        username: session.username,
        bio: session.bio,
        birthday: dateYYYYMMDD(session.birthday),
        email: session.email,
      });
    }
  }

  function changeImageEditMode() {
    if (editImage) {
      setEdit(false);
      setForm({ ...form, image: "" });
    }
    setEditImage(!editImage);
  }

  function handleChange(e) {
    const value = e.target.value;
    setForm({ ...form, [e.target.name]: value });
  }

  function adjustTextareaHeight() {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  async function submitNewImage(e) {
    e.preventDefault();
    if (form.image) {
      setImageReq(true);
      const body = {
        image: form.image,
      };
      try {
        await apiUsers.editUserPfp(session.token, body);
        const updatedSession = { ...session, image: form.image };
        setSession(updatedSession);
        localStorage.setItem("session", JSON.stringify(updatedSession));
        setImageReq(false);
        setEditImage(false);
      } catch (error) {
        setImageReq(false);
        console.log(error);
      }
    }
  }

  return (
    <>
      <PageStyle>
        <Menu />
        <Container>
          <div>
            <div>Painel do usuário</div>
            <InfoContainer>
              <ImageContainer>
                <section>
                  <img
                    src={session.image}
                    alt="user-profile"
                    onError={(e) => (e.target.src = defaultUserImage)}
                  />
                </section>
                {editImage ? (
                  <form onSubmit={submitNewImage}>
                    <input
                      value={form.image}
                      onChange={handleChange}
                      name="image"
                      placeholder="Insira uma url válida"
                      type="url"
                      required
                    />
                    <div>
                      {imageReq ? (
                        <TailSpin
                          height="20"
                          width="20"
                          color="#678698"
                          ariaLabel="tail-spin-loading"
                          radius="1"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                        />
                      ) : (
                        <>
                          <button type="submit" disabled={imageReq}>
                            <AiOutlineCheck size={19} />
                          </button>
                          <button
                            type="reset"
                            disabled={imageReq}
                            onClick={changeImageEditMode}
                          >
                            <AiOutlineStop size={19} />
                          </button>
                        </>
                      )}
                    </div>
                  </form>
                ) : (
                  <button onClick={changeImageEditMode}>Alterar imagem</button>
                )}
              </ImageContainer>
              <UserSettings>
                {!edit ? (
                  <UserInfoStatic
                    changeEditMode={changeEditMode}
                    session={session}
                  />
                ) : (
                  <UserInfoForm
                    form={form}
                    handleChange={handleChange}
                    changeEditMode={changeEditMode}
                    textareaRef={textareaRef}
                  />
                )}
              </UserSettings>
            </InfoContainer>
          </div>
        </Container>
      </PageStyle>
      ;
    </>
  );
}
