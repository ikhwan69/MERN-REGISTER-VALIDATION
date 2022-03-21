import React, { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  //Mengatur fokus untuk input pengguna
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');

  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    //if button enabled with js hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry")
      return;
    }
    console.log(user, pwd);
    setSuccess(true);
  }


  return (
    <>
      {success ? (
        <section>
          <h2>Success !</h2>
          <p>
            <a href="">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className="px-8 py-10 mt-4 text-left bg-white shadow-lg">
              <h3 className="text-2xl font-bold text-center mb-5">Register Account</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className='block mb-2 text-sm font-medium text-gray-600'>
                    Username
                    <FontAwesomeIcon icon={faCheck} className={validName ? "text-green-700 ml-1" : "hidden"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hidden" : "text-red-700 ml-1"} />

                  </label>
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={user}
                    required
                    onChange={(e) => setUser(e.target.value)}
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    className=' w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out '
                  />
                  <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "hidden "}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.

                  </p>
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-600'>
                    Password
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "text-green-700 ml-1" : "hidden"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hidden" : "text-red-700 ml-1"} />
                  </label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    className='w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out '
                  />
                  <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "hidden"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters,<br /> a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                  </p>
                </div>
                <div className="mb-4">
                  <label htmlFor="confirm_pwd" className='block mb-2 text-sm font-medium text-gray-600'>
                    Confirmation Password
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "text-green-700 ml-1" : "hidden"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hidden" : "text-red-700 ml-1"} />
                  </label>
                  <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    className='w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-8 transition-colors duration-200 ease-in-out '
                  />
                  <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "hidden flex "}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                  </p>
                </div>
                <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-900 dark:text-gray-500">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                  </div>
                </div>
                <button disabled={!validName || !validPwd || !validMatch ? true : false} type="submit" className="text-white w-full bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Register</button>
              </form>
            </div>
          </div>
        </section>
      )}

    </>
  )
}

export default Register