import { useContext, useState, useEffect } from "react";
import { UserInfoContext } from "../userInfo/UserInfoProvider";
import { StatusItemPresenter, StatusItemView } from "../../presenters/StatusItemPresenter";
import StatusItem from "../statusItem/StatusItem";
import { PagedItemPresenter, PagedItemView } from "../../presenters/PagedItemPresenter";
import ItemScroller from "./ItemScroller"; // Generic ItemScroller component

interface StatusItemScrollerProps {
  presenterGenerator: (view: PagedItemView<any>) => PagedItemPresenter<any, any>;
}

const StatusItemScroller: React.FC<StatusItemScrollerProps> = ({ presenterGenerator }) => {
  const itemComponenentGenerator = (item: any) => <StatusItem status={item} />;

  return (
    <ItemScroller
      presenterGenerator={presenterGenerator}
      itemComponenentGenerator={itemComponenentGenerator}
    />
  );
};

export default StatusItemScroller;
