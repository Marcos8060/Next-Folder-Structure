import React from 'react';
import {alpha, Box} from "@mui/material";



const ComplianceListItem = ({ compliance, complianceName, ...rest }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
          cursor: 'pointer',
          padding: 1,
          transition: 'all .2s',
          borderRadius: 4,
          '&:hover, &.active': {
              backgroundColor: theme => alpha(theme.palette.dark.main, 0.04),
              '& .text-hover': {
                  color: theme => theme.palette.text.primary,
              },
          },
          '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme => `0 3px 10px 0 ${alpha(theme.palette.dark.main, 0.2)}`,
          },
      }}
      {...rest}>
      <Box display="flex" alignItems="center">

        <Box color="text.primary" className="text-hover" px={1}>
          {compliance.name}
        </Box>
      </Box>
      <Box px={2} display="flex" alignItems="center">
        <Box mx={3}>{compliance.overallScore}</Box>
        <Box component="span" ml={3} height={10} width={10} bgcolor={compliance.badgeColor} borderRadius="50%" />
      </Box>
    </Box>
  );
};

export default ComplianceListItem;
