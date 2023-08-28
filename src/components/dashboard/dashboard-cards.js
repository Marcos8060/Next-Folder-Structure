import Grid from "@mui/material/Grid";
import FilledInfoCard from "../@dmt-components/cards/info-cards/filled-info-card";
import {useSelector} from "../../store";
import CurrencyFormat  from 'react-currency-format'



const summaries = [
    {
        id: 1,
        color: 'info',
        icon: 'how_to_reg',
        title: 'No. of beneficiaries',
        type: 'applicationCount',
       // description:'200'
    },
    {
        id: 2,
        color: 'success',
        icon: 'people',
        title: 'Sponsors',
        type: 'applicationCompleted',
        //description:'900'
    },
    {
        id: 3,
        color: 'error',
        icon: 'upload',
        title: 'Uploads',
        type: 'applicationInComplete',
       //description:'500'
    },
    {
        id: 4,
        color: 'secondary',
        icon: 'home',
        title: 'Counties',
        type: 'customersCount',
        //description:'1,000'
    },
];
const getCount = (customers, applications, type) => {
    if (type === 'customersCount'){
        return customers.length;
    }
    else{
        const applicationCount = applications.filter((application) => {
            if (type === 'applicationCount'){
                return true;
            }
            if (type === 'applicationCompleted'){
                return application.complete;
            }
            if (type === 'applicationInComplete'){
                return !application.complete;
            }
            return true;
        })
        return applicationCount.length;
    }
}
const  DashboardCards = () => {
    const { data } = useSelector(({ dashboard}) => dashboard);
    console.log(data);
    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <FilledInfoCard
                        variant="gradient"
                        color={summaries[0].color}
                        icon={summaries[0].icon}
                        title={summaries[0].title}
                        description={
                            <CurrencyFormat
                                displayType={'text'}
                                value={data?.beneficiaries}
                                thousandSeparator={true}
                                prefix={''}
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FilledInfoCard
                        variant="gradient"
                        color={summaries[1].color}
                        icon={summaries[1].icon}
                        title={summaries[1].title}
                        description={
                            <CurrencyFormat
                                displayType={'text'}
                                value={data?.sponsors}
                                thousandSeparator={true}
                                prefix={''}
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FilledInfoCard
                        variant="gradient"
                        color={summaries[2].color}
                        icon={summaries[2].icon}
                        title={summaries[2].title}
                        description={
                            <CurrencyFormat
                                displayType={'text'}
                                value={data?.uploads}
                                thousandSeparator={true}
                                prefix={''}
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FilledInfoCard
                        variant="gradient"
                        color={summaries[3].color}
                        icon={summaries[3].icon}
                        title={summaries[3].title}
                        description={
                            <CurrencyFormat
                                displayType={'text'}
                                value={data?.counties}
                                thousandSeparator={true}
                                prefix={''}
                            />
                        }
                    />
                </Grid>

            </Grid>
        </>
    )
}

export default DashboardCards;