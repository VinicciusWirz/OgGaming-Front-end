import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import SessionContext from "../contexts/SessionContext";
import apiAuth from "../services/apiAuth";

export default function SigninPage() {
  const { session, setSession } = useContext(SessionContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, []);
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await apiAuth.signin(form);
      const dataFormated = {
        ...data,
        birthday: data.birthday
          ? dayjs(data.birthday).format("DD/MM/YYYY")
          : null,
      };
      setSession(dataFormated);
      const localData = JSON.stringify(dataFormated);
      localStorage.setItem("session", localData);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.response.status === 404 || error.response.status === 401) {
        alert(`${error.response.status}: Invalid credentials`);
      }
      if (error.response.status === 422) {
        alert(`${error.response.status}: ${error.response.data}`);
      }
    }
  }
  return (
    <PageContainer>
      <div>
        Login
        <form onSubmit={handleSubmit}>
          <label>
            E-mail:
            <input
              placeholder="Digite seu e-mail"
              required
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
          </label>
          <label>
            Senha:
            <input
              placeholder="Digite sua senha"
              required
              type="password"
              name="password"
              autoComplete="password"
              minLength="3"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? (
              <div>
                <TailSpin
                  height="24"
                  width="50"
                  color="#fafafa"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              "Entrar"
            )}
          </button>
        </form>
        <div>
          <p>Ainda não possui uma conta?</p>
          <Link to="/signup">Cadastre-se</Link>
        </div>
      </div>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  display: flex;
  justify-content: center;
  padding-top: 55px;
  font-size: 22px;
  * {
    font-family: "Roboto", sans-serif;
  }
  div {
    * {
      background: #ffff;
    }
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  div:nth-child(1) {
    gap: 20px;
  }
  div:nth-child(2) {
    font-size: 16px;
    background: none;
    display: flex;
    align-items: center;
    flex-direction: column;
    a,
    p {
      text-align: center;
      background: none;
    }
  }
  form {
    font-size: 14px;
    width: 100%;
    border: 1px solid lightGray;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 35px 15px;
    gap: 35px;
    label {
      display: flex;
      flex-direction: column;
      gap: 7px;
      width: 100%;
      input {
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
    }
    button {
      font-size: 16px;
      background: #a4b6c1;
      padding: 17px 31px;
      border: none;
      border-radius: 9px;
      cursor: pointer;
      &:disabled {
        background: #98a8b3;
      }
      div {
        background: none;
        width: 100%;
        display: flex;
        svg {
          background: none;
        }
      }
    }
  }
`;
