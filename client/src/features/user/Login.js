import { useState } from "react";
import { useMutation } from "react-query";
import { loginUser } from "../../api/usersApi";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";

const INITIAL_LOGIN_OBJ = {
  password: "",
  username: "",
};

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const loginUserMutation = useMutation(loginUser, {
    onError: ({ response }) => setErrorMessage(response.data),
    onSuccess: ({ data }) => {
      localStorage.setItem("token", data.token);
      window.location.href = "/app/dashboard";
    },
  });

  function submitForm(evt) {
    evt.preventDefault();
    setErrorMessage("");

    if (loginObj.username.trim() === "")
      return setErrorMessage("Username is required!");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Password is required!");
    else {
      // Call API to check user credentials and save token in localstorage
      loginUserMutation.mutate(loginObj);
    }
  }

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <main className='flex min-h-screen items-center bg-base-200'>
      <section className='card mx-auto w-full max-w-3xl  shadow-xl'>
        <article className='grid  grid-cols-1 rounded-xl bg-base-100 md:grid-cols-2'>
          <div className=''>
            <img
              src='./intro.jpg'
              alt='Dashwind Admin Template'
              className='w-full rounded-l-xl'
              loading='lazy'
            />
          </div>
          <div className='my-auto px-10 py-4'>
            <h1 className='mb-8 text-primary text-center text-4xl font-semibold'>
              TABULATION SYSTEM
            </h1>
            {/* <h2 className='text-center text-2xl font-semibold'>Login</h2> */}
            <form onSubmit={(e) => submitForm(e)}>
              <div className='mb-4'>
                <InputText
                  type='text'
                  defaultValue={loginObj.username}
                  updateType='username'
                  containerStyle='mt-4'
                  labelTitle='Username'
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={loginObj.password}
                  type='password'
                  updateType='password'
                  containerStyle='mt-4'
                  labelTitle='Password'
                  updateFormValue={updateFormValue}
                />
              </div>

              <ErrorText styleClass='mt-4'>{errorMessage}</ErrorText>
              <button
                type='submit'
                className={`btn-primary text-lg text-white tracking-wider btn mt-2 w-full ${
                  loginUserMutation.isLoading ? " loading" : ""
                }`}
              >
                {loginUserMutation.isLoading ? "Submitting" : "Login"}
              </button>
            </form>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Login;
