import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BtnWrapper, ItemForm } from "../styles/SettingsStyle";

export default function UserInfoStatic(props) {
  const navigate = useNavigate();
  const { changeEditMode, session } = props;
  return (
    <>
      <form>
        <ItemForm>
          <label>
            Nome:
            <div>
              <span>{session.name}</span>
            </div>
          </label>
        </ItemForm>
        <ItemForm>
          <label>
            Username:
            <div>
              <span>{session.username}</span>
            </div>
          </label>
        </ItemForm>
        <ItemForm>
          <label>
            Aniversário:
            <div>
              <span>
                {session.birthday ? session.birthday : "Não informado"}
              </span>
            </div>
          </label>
        </ItemForm>
        <ItemForm>
          <label>
            Email:
            <div>
              <span>{session.email}</span>
            </div>
          </label>
        </ItemForm>
        <ItemForm>
          <label>
            Bio:
            <div>
              <span>{session.bio}</span>
            </div>
          </label>
        </ItemForm>
        <BtnWrapper background1="#a4b6c1" background2="#a4b6c1">
          <button type="button" onClick={changeEditMode}>
            Editar perfil <AiOutlineEdit size={16} />
          </button>
          <button type="button" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </BtnWrapper>
      </form>
    </>
  );
}
