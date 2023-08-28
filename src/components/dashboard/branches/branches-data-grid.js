import React, { useCallback,useEffect } from "react";
import {
  Column,
  Export,
  HeaderFilter,
  Toolbar,
  Item,
  Pager,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
import dynamic from "next/dynamic";
import { IconButton, Tooltip } from "@mui/material";
import { ALLOWED_PAGE_SIZES } from "../../../utils/constants";
import MKBox from "../../@mui-components/box";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import Link from "next/link";
import { useSelector,useDispatch } from "react-redux";
import { getAllBranches } from "../../../slices/branches";
import { useAuth } from "../../../hooks/use-auth";
import AddBranch from "../../../pages/dashboard/organization/branches/addbranch";

const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

const BranchDataGrid = (props) => {
  const { branches } = useSelector(({ branches }) => branches);
  const dispatch = useDispatch();
  const authUser = useAuth();


  const fetchBranches = () =>{
    dispatch(getAllBranches(authUser))
  }

  useEffect(() =>(
    fetchBranches()
  ),[])

  const actionsOptions = ({ data }) => {
    return (
      <MKBox>
        <Tooltip title="Download">
          <Link href={"./pensioners/" + data.pensionerCode + "/update"}>
            <IconButton size={"small"} color={"info"}>
              <Edit />
            </IconButton>
          </Link>
        </Tooltip>
        <IconButton size={"small"} color={"info"}>
          <Delete />
        </IconButton>
      </MKBox>
    );
  };

  return (
    <>
      <DataGrid
        dataSource={branches}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
      >
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Column dataField="county" caption="County" />
        <Column dataField="name" caption="Branch Name" />
        <Column dataField="phoneNumber" caption="Contact" cssClass="bullet" />
        <Column dataField="email" caption="Email" cssClass="bullet" />
        <Toolbar>
          <Item location="before">
            {/* <AddBranch /> */}
          </Item>
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default BranchDataGrid;
