import * as React from "react";

import { getSessionById } from "../../../utils/fauna";

export default function Edit({ session }) {
  console.log("Edit -> session", session);
  return (
    <div>
      <div>new session</div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const id = context.params.id;
    const session = await getSessionById(id);
    return {
      props: { session },
    };
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/`);
    return { props: {} };
  }
}
