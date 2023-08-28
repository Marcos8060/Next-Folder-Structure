import React, {useEffect} from 'react';
import dynamic from "next/dynamic";
import {Column, HeaderFilter, Pager, Paging, SearchPanel,} from "devextreme-react/data-grid";
const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
    ssr: false,
});

const SponsorBeneficiariesDataGrid = (props) => {
    const { data } = props;
    console.log(data);
    return (
        <>
            <DataGrid
                dataSource={data}
                allowColumnReordering={true}
                rowAlternationEnabled={true}
                showBorders={true}
                height={'58vh'}
                showColumnLines={true}
                showRowLines={true}
            >
                <SearchPanel visible={false} highlightCaseSensitive={true} />
                <HeaderFilter visible={true} allowSearch={true} />
                <Column dataField="name" caption="Name" minWidth={250}   allowSearch={true} />
                <Column dataField="idnumber" caption="ID Number" minWidth={200}     allowSearch={true} />
                <Column dataField="phone" caption="Phone"  minWidth={120}   allowSearch={true}/>
                <Column dataField="county" caption="County"  minWidth={120}   allowSearch={true}/>
                <Column dataField="ward" caption="Ward"  minWidth={120}   allowSearch={true}/>
                {/*<Column dataField="isActive" caption="Is Active" />*/}
                <Paging defaultPageSize={25} />
                <Pager
                    visible={true}
                    allowedPageSizes={['all', 25, 50, 100]}
                    showPageSizeSelector={true}
                    showNavigationButtons={false}
                />
                {/*<Toolbar>*/}
                {/*    <Item location="before">*/}
                {/*        <AddSponsor />*/}
                {/*    </Item>*/}
                {/*    <Item location="after" name="searchPanel" />*/}
                {/*</Toolbar>*/}
            </DataGrid>
        </>
    );
};

export default SponsorBeneficiariesDataGrid