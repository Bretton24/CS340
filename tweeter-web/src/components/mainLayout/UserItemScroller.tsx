import { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../userInfo/UserInfoProvider";
import { UserItemPresenter, UserItemView } from "../../presenters/UserItemPresenter";
import UserItem from "../userItem/UserItem";
import { PagedItemPresenter, PagedItemView } from "../../presenters/PagedItemPresenter";
import ItemScroller from "./ItemScroller"; // Generic ItemScroller component

interface UserItemScrollerProps {
  presenterGenerator: (view: PagedItemView<any>) => PagedItemPresenter<any, any>;
}

const UserItemScroller: React.FC<UserItemScrollerProps> = ({ presenterGenerator }) => {
  const itemComponenentGenerator = (item: any) => <UserItem value={item} />;

  return (
    <ItemScroller
      presenterGenerator={presenterGenerator}
      itemComponenentGenerator={itemComponenentGenerator}
    />
  );
};

export default UserItemScroller;
