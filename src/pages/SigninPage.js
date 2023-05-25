import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import SessionContext from "../contexts/SessionContext";
import apiAuth from "../services/apiAuth";

export default function SigninPage() {
  const { session, setSession } = useContext(SessionContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navivate = useNavigate();

  useEffect(() => {
    if (session) {
      navivate("/");
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
      setSession(data);
      const localData = JSON.stringify(data);
      localStorage.setItem("session", localData);
      setLoading(false);
      navivate("/");
    } catch (error) {
      setLoading(false);
      if (error.response.status === 404 || error.response.status === 401) {
        alert("Invalid credentials");
      }
      if (error.response.status === 422) {
        alert(error.response.data);
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
            Entrar
          </button>
        </form>
        <div>
          Ainda não possui uma conta?
          <Link>Cadastre-se</Link>
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
      background: #a4b6c1;
      padding: 17px 31px;
      border: none;
      border-radius: 9px;
      cursor: pointer;
      &:disabled {
        background: #98a8b3;
      }
    }
  }
`;
