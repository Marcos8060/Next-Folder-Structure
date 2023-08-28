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
import { getAllDepartments } from "../../../slices/departments";
import { useAuth } from "../../../hooks/use-auth";
import AddDepartment from "../../../pages/dashboard/organization/departments/addDepartment";
import { removeDepartment } from "../../../slices/departments";
import {toast} from "react-hot-toast";
import EditDepartment from "../../../pages/dashboard/organization/departments/editDepartment";


const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

const DepartmentGrid = (props) => {
  const { departments } = useSelector(({ departments }) => departments);
  const dispatch = useDispatch();
  const authUser = useAuth();


  const fetchDepartments = () =>{
    dispatch(getAllDepartments(authUser))
  }

  useEffect(() =>(
    fetchDepartments()
  ),[])

  const actionsOptions = ({ data }) => {
    const handleOnDelete =  () => {
        try {
         dispatch(removeDepartment(authUser, {id: data.id}))
         fetchDepartments()
         toast.success('Department deleted successfully')
        } catch (error) {
          toast.error(error.message)
        }
    }
    return (
      <MKBox>
          {/* <Link href={"./pensioners/" + data.pensionerCode + "/update"}> */}
            <IconButton size={"small"} color={"info"}>
              <EditDepartment data={data} />
            </IconButton>
          {/* </Link> */}
        <IconButton size={"small"} color={"info"}>
          <Delete onClick={handleOnDelete} />
        </IconButton>
      </MKBox>
    );
  };

  return (
    <>
      <DataGrid
        dataSource={departments}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
      >
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Column dataField="name" caption="Branch Name" />
        <Column dataField="description" caption="Contact" cssClass="bullet" />
        <Column dataField="coordinates" caption="Coordinates" cssClass="bullet" />
        <Column dataField="isActive" caption="Is Active" cssClass="bullet" />
        <Column
          caption="Action"
          cssClass="bullet"
          allowFiltering={false}
          cellRender={actionsOptions}
        />
        <Toolbar>
          <Item location="before">
            <AddDepartment />
          </Item>
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default DepartmentGrid;
