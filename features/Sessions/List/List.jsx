import * as React from "react";
import useSWR from "swr";

import SessionSkeleton from "../Skeleton/Session";
import ListItem from "./ListItem/ListItem";

const List = () => {
  const { data: sessions, mutate } = useSWR("/api/sessions");

  return (
    <ul className="divide-y divide-gray-200">
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
    </ul>
  );
};

export default List;
