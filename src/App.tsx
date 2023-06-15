import { Home, About, PageNotFound, Login, Register, ForgetPassword, Profile, VerifyEmail, Bookmarks, Feed, Messages, SelectAndMessage, ChatRoom } from './Pages'
import { AuthLayout, DashboardLayout, DefaultLayout } from './Layouts'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginUser } from './Config/userSlice';
import { addUsers } from './Config/usersSlice';
import {
  onAuthStateChanged,
  auth,
  createUserProfileDocument,
  db,
} from "./Config/firebase";
import { collection, getDoc, getDocs } from 'firebase/firestore';
import devAvatar from "./Images/Profile/avatar-default.png";

function App() {
  const dispatch = useDispatch()

  onAuthStateChanged(auth, async (userAuth) => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth, {});
      if (!userRef) return;

      const snapShot = await getDoc(userRef);

      if (!snapShot.exists()) return;
      const user = { id: snapShot.id, ...snapShot.data() };
      dispatch(loginUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      
      // Fetch all users from Firestore
      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);
      const users: any[] = [];
      usersSnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data(),
          photoURL: doc.data().photoURL || devAvatar,
        });
      });

      dispatch(addUsers(users))
    } else {
      dispatch(loginUser(null));
      localStorage.removeItem("user");
    }
  });
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path="/about"
          element={
            <DefaultLayout>
              <About />
            </DefaultLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />
        <Route
          path="/forget-password"
          element={
            <AuthLayout>
              <ForgetPassword />
            </AuthLayout>
          }
        />
        <Route
          path="/verify-email"
          element={
            <AuthLayout>
              <VerifyEmail />
            </AuthLayout>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <DashboardLayout>
              <Bookmarks />
            </DashboardLayout>
          }
        />

        <Route
          path='/feed'
          element={
            <DashboardLayout>
              <Feed />
            </DashboardLayout>
          }
        />

        {/* SelectAndMessage and ChatRoom are children of messages */}
        {/* <Route
          path="/messages"
          element={
            <DashboardLayout >
              <Messages>
                <SelectAndMessage />
              </Messages>
            </DashboardLayout>
          }
          children={
            <>
              <Route
                path="/"
                element={
                  <DashboardLayout >
                    <Messages>
                      <SelectAndMessage />
                    </Messages>
                  </DashboardLayout>
                } />

              <Route path=":idone-:idtwo" element={
                <DashboardLayout >
                  <Messages>
                    <ChatRoom />
                  </Messages>
                </DashboardLayout>
              } />
            </>
          }
        /> */}


        <Route path="/messages"
          element={
            <DashboardLayout>
              <Messages>
                <SelectAndMessage />
              </Messages>
            </DashboardLayout>
          }
        />

        <Route path="/messages/:chatid"
          element={
            <DashboardLayout>
              <Messages>
                <ChatRoom />
              </Messages>
            </DashboardLayout>
          }
        />






        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
