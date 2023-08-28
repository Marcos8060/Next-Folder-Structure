import React, { useEffect } from "react";
import {
    Column,
    Toolbar,
    Item,
    SearchPanel, Paging, Pager,
} from "devextreme-react/data-grid";
import dynamic from "next/dynamic";
import { IconButton} from "@mui/material";
import MKBox from "../../@mui-components/box";
import {ArrowForward, ArrowRight} from "@mui/icons-material";
import Link from "next/link";
import { useSelector,useDispatch } from "react-redux";
import { getAllDepartments } from "../../../slices/departments";
import { useAuth } from "../../../hooks/use-auth";
import { removeDepartment } from "../../../slices/departments";
import {toast} from "react-hot-toast";
import AddSponsor from "../../../pages/dashboard/sponsor/addSponsor";
import {useRouter} from "next/router";


const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

const SponsorsDataGrid = (props) => {
  const { sponsors } = useSelector(({ sponsors }) => sponsors);
  const dispatch = useDispatch();
  const authUser = useAuth();
  const router = useRouter();


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
    const handleOnClick = () => {
        router.push({
            pathname: `sponsor/${data.id}`,
            query: { name: data.name }
        })
    }

    return (
      <MKBox>
          <IconButton color={"info"} onClick={handleOnClick}>
              <ArrowForward/>
          </IconButton>
      </MKBox>
    );
  };

  return (
    <>
      <DataGrid
        dataSource={sponsors}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        height={'75vh'}
        showColumnLines={true}
        showRowLines={true}
      >
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Column dataField="name" caption="Name" minWidth={250}   allowSearch={true} />
        <Column dataField="description" caption="Description" minWidth={200}     allowSearch={true} />
        <Column dataField="branchName" caption="Branch"  minWidth={120}   allowSearch={true}/>
        {/*<Column dataField="isActive" caption="Is Active" />*/}
         <Column
          caption="Action"
          allowFiltering={false}
          minWidth={100}
          cellRender={actionsOptions}
        />
          <Paging defaultPageSize={25} />
          <Pager
              visible={true}
              allowedPageSizes={['all', 25, 50, 100]}
              showPageSizeSelector={true}
              showNavigationButtons={false}
          />
        <Toolbar>
          <Item location="before">
            <AddSponsor />
          </Item>
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default SponsorsDataGrid;
