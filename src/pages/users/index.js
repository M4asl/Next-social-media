import { parseCookies } from "nookies";
import React from "react";
import { getUsersList } from "../../store/actions/userActions";
import { wrapper } from "../../store/store";

const index = () => (
  <div>
    <div>hello</div>
  </div>
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const { token } = await parseCookies({ req });
      if (!token) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
      const userData = "";
      await store.dispatch(
        getUsersList(userData, req.headers.cookie, req),
      );
      return {
        props: {},
      };
    },
);

export default index;
