import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { CBadge } from '@coreui/react';
import HomeIcon from '@mui/icons-material/Home';
import moment from 'moment';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export default function ViewDetails(post) {
    // console.log("viewData ", post.viewData)
  return (
    <Box sx={{ width: '100%' }}>
        {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}> */}
        <Grid container spacing={{ xs: 0, md: 1 }} columns={{ xs: 4, sm: 8, md: 8 }}>
            <Grid item xs={2} sm={4} md={4} >
                <Item style={{color: "#000"}}>
                    <div className="viewDescription">Reference ID </div>
                    {post?.viewData?.reference_id}
                </Item>
            </Grid>
            <Grid item xs={2} sm={4} md={4} >
                <Item style={{color: "#000"}} className="viewDescription"> 
                <div className="viewDescription" > Amount </div> 
                {post?.viewData?.amount}
                </Item>
            </Grid>

            <Grid item xs={2} sm={4} md={4} >
                <Item style={{color: "#000"}} className="viewDescription"><div className="viewDescription">Service Type </div>
                    { post?.viewData?.service === 1 ? "WINGIPAY TO WINGIPAY" : "" }
                    { post?.viewData?.service === 2 ? "WINGIPAY TO MTN" : "" }
                    { post?.viewData?.service === 3 ? "WINGIPAY TO VODAFONE" : "" }
                    { post?.viewData?.service === 4 ? "WINGIPAY TO AIRTELTIGO" : "" }
                    { post?.viewData?.service === 5 ? "MTN TO WINGIPAY" : "" }
                    { post?.viewData?.service === 6 ? "VODAFONE TO WINGIPAY" : "" }
                    { post?.viewData?.service === 7 ? "AIRTELTIGO TO WINGIPAY" : "" }
                    { post?.viewData?.service === 8 ? "WINGIPAY TO AGENT" : "" }
                    { [1, 2, 3, 4, 5, 6, 7, 8].includes(post?.viewData?.service) ? "" : "None" }
                </Item>
            </Grid>
            <Grid item xs={2} sm={4} md={4} >
                <Item style={{color: "#000"}} className="viewDescription"><div className="viewDescription"> Note </div>{post?.viewData?.note}</Item>
            </Grid>

            <Grid item xs={2} sm={4} md={4} >
                <Item style={{color: "#000"}} className="viewDescription"><div className="viewDescription"> Status Message </div> {post?.viewData?.status_message}</Item>
            </Grid>
            <Grid item xs={2} sm={4} md={4} >
                <Item style={{color: "#000"}} className="viewDescription"> <div className="viewDescription"> Status </div> <CBadge color= {post?.viewData?.status_code === "SUCCESSFUL" ? "success" : (post?.viewData?.status_code === "PENDING" ? "primary" : "secondary")}>{post?.viewData?.status_code}</CBadge> </Item>
            </Grid>
            
            <Grid item xs={2} sm={4} md={4} >
                <Item style={{color: "#000"}} className="viewDescription"> <div className="viewDescription">Transaction Date</div> {moment(post.created_at).format('LLLL')}</Item>
            </Grid>
            
        </Grid>

    </Box>
  );
}
