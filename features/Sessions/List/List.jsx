import * as React from "react";
import useSWR from "swr";
import { motion } from "framer-motion";

import SessionSkeleton from "../Skeleton/Session";
import ListItem from "./ListItem/ListItem";

const List = () => {
  const { data: sessions, mutate } = useSWR("/api/sessions");

  return (
    <motion.ul layout className="divide-y divide-gray-200">
      {!sessions && <SessionSkeleton />}
      {sessions &&
        sessions.length > 0 &&
        sessions.map((session, idx) => {
          const isLastItem = idx === sessions.length - 1;
          return (
            <ListItem
              session={session}
              key={session.id}
              sessionDeleted={mutate}
              isLastItem={isLastItem}
            />
          );
        })}
    </motion.ul>
  );
};

export default List;
