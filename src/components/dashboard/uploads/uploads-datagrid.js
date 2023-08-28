import dynamic from "next/dynamic";
import {Column, HeaderFilter, Pager, Paging, SearchPanel} from "devextreme-react/data-grid";
import React from "react";
import MKTypography from "../../@mui-components/typography";

const DataGrid = dynamic(
    () => import('devextreme-react/data-grid'),
    {
        ssr: false,
    }
);

const UploadsDatagrid = props => {
    const { data, isFailed = false} = props;
    const renderField = ({ displayValue }) => {
        return (
            <>
                <MKTypography variant={'inherit'}>
                    {(displayValue !== null || displayValue !== " ")  ? displayValue : '---'}
                </MKTypography>
            </>
        )
    }

    return (
        <>
            <DataGrid
                dataSource={data ?? []}
                allowColumnReordering={true}
                rowAlternationEnabled={true}
                showBorders={true}
                height={'65vh'}
                showColumnLines={true}
                showRowLines={true}
            >
                <SearchPanel visible={false} />
                <HeaderFilter visible={true} allowSearch={true} />
                <Column dataField="idnumber" caption="ID Number" minWidth={120}  />
                <Column dataField="name" caption="Name" cellRender={renderField} minWidth={200} />
                <Column dataField="dob" caption="DOB" cellRender={renderField} minWidth={120} />
                <Column dataField="gender" caption="Gender" cellRender={renderField} minWidth={120} />
                <Column dataField="phonenumber" caption="Phone No" cellRender={renderField} minWidth={120} />
                <Column dataField="location" caption="Location" cellRender={renderField} minWidth={120} />
                <Column dataField="subLocation" caption="Sub-Location" cellRender={renderField} minWidth={140} />
                <Column dataField="ward" caption="Ward" cellRender={renderField} minWidth={120} />
                <Column dataField="reason" visible={isFailed} caption="Reason" cellRender={renderField} minWidth={200} />

                <Paging defaultPageSize={25} />
                <Pager
                    visible={true}
                    allowedPageSizes={['all', 25, 50, 100]}
                    showPageSizeSelector={true}
                    showNavigationButtons={false}
                />
            </DataGrid>
        </>
    )
}

export default React.memo(UploadsDatagrid);